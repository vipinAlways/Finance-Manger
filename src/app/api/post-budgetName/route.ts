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
    throw new Error("no session found");
  }
  try {
    const dbuser = await userModel.findOne({
      email: user.email,
    });
    if (!dbuser) {
      throw new Error("User is not register");
    }
    const { nameOfBudget } = await req.json();

    const isNameAllready = await BudgetNameModel.find({
      nameOfBudget,
      user: dbuser._id,
    });

    if (isNameAllready) {
      return NextResponse.json({
        ok: true,
        success: true,
      
        message: "Allready have this Name budget",
      },{
        status:409
      });
    }

    const budgetName = await BudgetNameModel.create({
      nameOfBudget,
      user: dbuser._id,
    });
    await budgetName.save();

    await dbuser.budgetName.push(budgetName._id);

    return NextResponse.json({
      ok: true,
      success: true,
      status: 200,
      message: "successFully Add name",
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      success: false,
      status: 500,
      message: "successFully Add name",
    });
  }
}
