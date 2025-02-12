"use server";
import dbConnect from "@/lib/dbconnects";
import amountModel from "@/Models/Amount.model";
import userModel from "@/Models/User.model";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

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
    const amount = await amountModel.findById(amountId);
    if (!amount) {
      return NextResponse.json(
        { success: false, message: "Amount not found" },
        { status: 404 }
      );
    }

    await amountModel.deleteOne({ _id: amountId });

    const user = await userModel.findById(amount.user);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Transaction has been deleted",
        ok:true
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
