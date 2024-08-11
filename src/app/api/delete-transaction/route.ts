import dbConnect, { dbDisconnect } from "@/lib/dbconnects";
import transactionModel from "@/model/transaction.model";
import userModel from "@/model/user.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE({req}: {req:NextRequest }) {
  draftMode().disable()
  
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


  const {transactionId} = await req.json()
  try {
   
    const transactionToDelete = await transactionModel.findByIdAndDelete(transactionId);


    if (!transactionToDelete) {
      return NextResponse.json(
        { success: true, message: "transaction not dound" },
        { status: 404 }
      );
    }

    const user = await userModel.updateOne(
      {
        id: User.id,
      },
      { $pull: { transactions: { _id: transactionId} } }
    );
    if (user.modifiedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "message not found || already deletetd",

        },
        { status: 404 }
      );
    }
    await dbDisconnect()
    return NextResponse.json(
      {
        success: true,
        message: "transaction has been delete",
        ok:true,
        transactionToDelete
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    console.log(error);
    return NextResponse.json(
      { success: false, message: "transaction has not been delete", ok:false },
      { status: 500 }
    );
  }
}
