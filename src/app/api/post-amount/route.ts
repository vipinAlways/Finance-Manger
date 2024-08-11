import dbConnect, { dbDisconnect } from "@/lib/dbconnects";
import amountModel from "@/model/amount.model";

import userModel from "@/model/user.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  await dbConnect();
  const { getUser } = getKindeServerSession();
  const user1 = await getUser();

  if (!user1) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  const user = await userModel.findOne({ id: user1?.id });

  if (user) {
    try {
      const { Weekly, Monthly } = await req.json();

      let newAmount = new amountModel({
        Weekly,
        Monthly,
        user:user._id
      });

      await newAmount.save();
      // @ts-ignore
      user.amount.push(newAmount._id);
      await user.save();
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
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }
}



