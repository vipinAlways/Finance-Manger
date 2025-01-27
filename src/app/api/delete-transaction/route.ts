import dbConnect, { dbDisconnect } from "@/lib/dbconnects";
import transactionModel from "@/Models/Transaction.model";
import userModel from "@/Models/User.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  await dbConnect();

  const {searchParams} = new URL(req.url);
  const transactionId = searchParams.get("transactionId") || "";
  
    if (!mongoose.Types.ObjectId.isValid(transactionId)) {
      return NextResponse.json(
        { success: false, message: "Invalid amount ID" },
        { status: 400 }
      );
    }
 

  try {
    const transaction = await transactionModel.findOne({_id:transactionId})
    if (!transaction) {
      return NextResponse.json({
        success:false,
        message:"transaciton not found"
      })
    }

     await transactionModel.deleteOne({_id:transactionId});

    

    const user = await userModel.findOne({ _id:transaction?.user });

    if (!user) {
 
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }


    user.transaction.pull(transactionId);
    await user.save();

    await dbDisconnect();
    return NextResponse.json(
      {
        success: true,
        message: "Transaction has been deleted",
        ok: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    await dbDisconnect();
    return NextResponse.json(
      { success: false, message: "Failed to delete the transaction" },
      { status: 500 }
    );
  }
}
