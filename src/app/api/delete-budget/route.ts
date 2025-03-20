"use server";
import dbConnect from "@/lib/dbconnects";
import amountModel from "@/Models/Amount.model";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import BudgetNameModel from "@/Models/BudgetName.model";

export async function DELETE(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const amountId = searchParams.get("amountId") || "";

  if (!mongoose.Types.ObjectId.isValid(amountId)) {
    return NextResponse.json(
      { success: false, message: "Invalid amount ID" },
      { status: 400 }
    );
  }

  try {
    const amount = await amountModel.findByIdAndDelete(amountId);
    if (!amount) {
      return NextResponse.json(
        { success: false, message: "Amount not found" },
        { status: 404 }
      );
    }
 
    if (amount.user) {
      const budgetName = await BudgetNameModel.findOne({
        user: amount.user,
      });
      if (!budgetName) {
        return NextResponse.json(
          { success: false, message: "Related budget not found" },
          { status: 404 }
        );
      }
      budgetName.amount.pull(amountId);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Transaction has been deleted",
        ok: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete the transaction" },
      { status: 500 }
    );
  }
}
