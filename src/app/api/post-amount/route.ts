import dbConnect, { dbDisconnect } from "@/lib/dbconnects";
import amountModel from "@/Models/Amount.model";
import BudgetNameModel from "@/Models/BudgetName.model";

import userModel from "@/Models/User.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import {  NextResponse } from "next/server";

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

  if (user) {
    try {
      const { amount,startDate , endDate,budgetFor } = await req.json();

      

      let newAmount = new amountModel({
        budgetFor,
        amount,
        startDate,
        endDate,
        saving:0,
        user:dbuser?._id
      });

      await newAmount.save();
      
   
      const budgetNameForBudget = await BudgetNameModel.findOne({
        user:dbuser?._id,
        nameOfCategorey:budgetFor
      })

      budgetNameForBudget?.amount.push(newAmount._id)
      await dbDisconnect();
      return Response.json({
        success: true,
        ok: true,
        message: "Amount added successfully",
        amount: newAmount,
      });
    } catch (error) {
      console.error("Error creating amount:", error);
      return Response.json(
        { success: false, message: "Error creating amount", ok: false },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(      { success: false, message: "User not found" },
      { status: 404 }
    );
  }
}



