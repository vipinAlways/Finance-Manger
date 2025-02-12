"use server";
import dbConnect from "@/lib/dbconnects";
import amountModel from "@/Models/Amount.model";
import BudgetNameModel from "@/Models/BudgetName.model";
import userModel from "@/Models/User.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await dbConnect();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from") || "";

  if (!user || !user.email) {
    return NextResponse.json(
      { success: false, message: "User not found or not authenticated" },
      { status: 404 }
    );
  }

  try {
    const dbuser = await userModel.findOne({ email: user.email });

    if (!dbuser) {
      return NextResponse.json(
        { success: false, message: "User not found in database" },
        { status: 404 }
      );
    }

    const currentdate = new Date();
    const amount =
      from !== ""
        ? await amountModel.find({
            user: dbuser._id,
            budgetFor: from,
            endDate: { $gte: currentdate },
          })
        : await amountModel.find({
            user: dbuser._id,
            endDate: { $gte: currentdate },
          });


    const budgetNameForBudget = await BudgetNameModel.find({
      user:dbuser
    })

    return NextResponse.json({ amount, budgetNameForBudget,ok: true }, { status: 200 });
  } catch (error) {
    console.error("Error fetching amounts:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while fetching amounts" },
      { status: 500 }
    );
  }
}
