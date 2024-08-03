import dbConnect, { dbDisconnect } from "@/lib/dbconnects";
import transactionModel from "@/model/transaction.model";
import userModel from "@/model/user.model";
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
    let user = await userModel
      .findOne({ id: User?.id })
      
      
          if (!user) {
            return NextResponse.json(
              { success: false, message: "User not found s" },
              { status: 404 }
            );
          }
    let transactions = await transactionModel.find({user:user?._id});

    if (!transactions) {
      return NextResponse.json(
        { success: false, message: "No transactions found" },
        { status: 404 }
      );
    }

      console.log("testing");
    await dbDisconnect();
    return NextResponse.json(transactions);
  } catch (error) {
    console.log(error);

    await dbDisconnect()
    return NextResponse.json(
      {
        success: false,
        ok: false,
        message: "Transaction not found successfully",
      },
      { status: 500 }
    );
  }
}
