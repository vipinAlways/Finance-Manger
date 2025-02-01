"use server";

import dbConnect from "@/lib/dbconnects";
import BudgetNameModel from "@/Models/BudgetName.model";
import userModel from "@/Models/User.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not authenticated" },
      { status: 401 }
    );
  }
  try {
    const dbuser = await userModel.findOne({
      email: user.email,
    });
    if (!dbuser) {
      return NextResponse.json(
        { success: false, message: "User not register" },
        { status: 401 }
      );
    }
    const budgetNames = await BudgetNameModel.find({
      user: dbuser._id,
    });

    if (!budgetNames) {
      return NextResponse.json(
        { success: false, message: "user don't have any names", ok: false },
        { status: 401 }
      );
    }
    return NextResponse.json(
      {
        budgetNames,
        ok: true,
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching budgetName",
      },
      { status: 500 }
    );
  }
}
