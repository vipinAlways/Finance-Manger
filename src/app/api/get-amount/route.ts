"use server"
import dbConnect from "@/lib/dbconnects";
import amountModel from "@/Models/Amount.model";

import userModel from "@/Models/User.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await dbConnect();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.email) {
    return NextResponse.json(
      {
        success: false,
        message: "User not found or not authenticated",
      },
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

    const amount = await amountModel.find({ user: dbuser._id});

    if (!amount) {
      return NextResponse.json(
        { success: false, message: "No amounts found for user" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        amount,
        ok: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching amounts:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching amounts",
      },
      { status: 500 }
    );
  }
}
