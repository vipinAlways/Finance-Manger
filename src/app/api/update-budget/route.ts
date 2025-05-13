"use server";
import dbConnect, { dbDisconnect } from "@/lib/dbconnects";
import amountModel from "@/Models/Amount.model";
import userModel from "@/Models/User.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: Request) {
  await dbConnect();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || "";

  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  const dbuser = await userModel.findOne({ id: user.id });

  if (!dbuser) {
    return NextResponse.json(
      { success: false, message: "User not found in database" },
      { status: 404 }
    );
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, message: "Invalid or missing ID" },
      { status: 400 }
    );
  }

  try {
    const { amount, startDate, endDate, budgetFor } = await req.json();

    const updatedAmount = await amountModel.findByIdAndUpdate(id, {
      amount,
      startDate,
      endDate,
      budgetFor,
    });

    if (!updatedAmount) {
      return NextResponse.json(
        { success: false, message: "Amount not found or update failed" },
        { status: 404 }
      );
    }

    await dbDisconnect();
    return NextResponse.json(
      {
        success: true,
        message: "Amount updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating amount:", error);
    return NextResponse.json(
      { success: false, message: "Error updating amount" },
      { status: 500 }
    );
  }
}
