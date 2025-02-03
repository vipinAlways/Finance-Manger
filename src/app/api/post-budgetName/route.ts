"use server";

import dbConnect from "@/lib/dbconnects";
import BudgetNameModel from "@/Models/BudgetName.model";
import userModel from "@/Models/User.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await dbConnect();

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return NextResponse.json(
      { ok: false, success: false, message: "No session found" },
      { status: 401 }
    );
  }

  try {
    const dbuser = await userModel.findOne({ id: user.id });

    if (!dbuser) {
      return NextResponse.json(
        { ok: false, success: false, message: "User is not registered" },
        { status: 404 }
      );
    }

    const { nameOfBudget } = await req.json();

    const isNameAlready = await BudgetNameModel.findOne({
      nameOfCategorey: nameOfBudget,
      user: dbuser._id,
    });

    if (isNameAlready) {
      console.log("hain ye pehle");
      return NextResponse.json(
        {
          ok: false,
          success: false,
          message: "Already have this budget name",
        },
        { status: 409 }
      );
    }

    const budgetName = await BudgetNameModel.create({
      nameOfCategorey: nameOfBudget,
      user: dbuser._id,
    });
    budgetName.save();
    dbuser.BudgetName.push(budgetName._id);
    await dbuser.save();

    return NextResponse.json(
      {
        ok: true,
        success: true,
        message: "Successfully added budget name",
        budgetName,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("ye nahi catch");
    return NextResponse.json(
      {
        ok: false,
        success: false,
        message: "Error adding budget name",
      },
      { status: 500 }
    );
  }
}
