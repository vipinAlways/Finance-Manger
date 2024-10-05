import dbConnect from "@/lib/dbconnects";
import amountModel from "@/Models/Amount.model";

import userModel from "@/Models/User.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await dbConnect();
  const { getUser } = getKindeServerSession();
  const User = await getUser();

  if (!User) {
    return NextResponse.json(
      {
        success: false,
        message: "User not found",
      },
      { status: 404 }
    );
  }

  try {
    const user = await userModel.findOne({ id: User.id });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const amount = await amountModel.find({ user: user?._id });

    if (!amount.length) {
      return NextResponse.json(
        { success: false, message: "No amount found" },
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
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching amount",
      },
      { status: 500 }
    );
  }
}
