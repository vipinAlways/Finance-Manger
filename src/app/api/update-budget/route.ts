"use server";
import dbConnect from "@/lib/dbconnects";
import amountModel from "@/Models/Amount.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await dbConnect();

  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user.email) {
    throw new Error("User is not Authenticated");
  }

  try {
    const { amount, endDate } = await req.json();
    const { searchParams } = new URL(req.url);
    const amountId = searchParams.get("amountId") || "";

    if (!mongoose.Types.ObjectId.isValid(amountId)) {
      return NextResponse.json(
        { success: false, message: "Invalid amount ID" },
        { status: 400 }
      );
    }

    let budgetChange = await amountModel.findByIdAndUpdate(
      amountId,
      {
        amount: amount,
        endDate: endDate,
      },
      { new: true }
    );

    return NextResponse.json(
      { success: true, data: budgetChange },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update error:");
    return Response.json(
      { success: false, message: "Failed to update" },
      { status: 500 }
    );
  }
}
