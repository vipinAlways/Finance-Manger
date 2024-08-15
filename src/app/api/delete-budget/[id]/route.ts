
import dbConnect, { dbDisconnect } from "@/lib/dbconnects";
import amountModel from "@/model/amount.model";
import transactionModel from "@/model/transaction.model";
import userModel from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  const amountId = params.id;
 

  try {
    const amount = await amountModel.findOne({_id:amountId})
    if (!amount) {
      return NextResponse.json({
        success:false,
        message:"amount not found"
      })
    }

     await amountModel.deleteOne({_id:amountId});

    

    const user = await userModel.findOne({ _id:amount.user });

    if (!user) {
      await dbDisconnect();
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }


    user.amount.pull(amountId);
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