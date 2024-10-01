
import dbConnect, { dbDisconnect } from "@/lib/dbconnects";
import amountModel from "@/Models/Amount.model";
import userModel from "@/Models/User.model";
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
  
    return NextResponse.json(
      { success: false, message: "Failed to delete the transaction" },
      { status: 500 }
    );
  }
}