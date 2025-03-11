import dbConnect, { dbDisconnect } from "@/lib/dbconnects";
import amountModel from "@/Models/Amount.model";
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
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  const dbuser = await userModel.findOne({ id: user?.id });

  if (!dbuser) {
    return NextResponse.json(
      { success: false, message: "User not found in database" },
      { status: 404 }
    );
  }

  try {
    const { amount, startDate, endDate, budgetFor } = await req.json();
    const budgetNameForBudget = await BudgetNameModel.findOne({
      user: dbuser?._id,
      nameOfCategorey: budgetFor,
    });
    
    let newAmount = new amountModel({
      budgetFor,
      amount,
      startDate,
      endDate,
      saving: 0,
      user: dbuser?._id,
    });

    await newAmount.save();

    if (budgetNameForBudget) {
      budgetNameForBudget.amount.push(newAmount._id);
      await budgetNameForBudget.save();
    }

    await dbDisconnect();
    return NextResponse.json(
  
      {

        success: true,
        ok: true,
        message: "Amount added successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating amount:", error);
    return NextResponse.json(
      { success: false, message: "Error creating amount", ok: false },
      { status: 500 }
    );
  }
}
