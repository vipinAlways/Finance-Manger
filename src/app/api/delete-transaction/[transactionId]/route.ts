import dbConnect, { dbDisconnect } from "@/lib/dbconnects";
import transactionModel from "@/model/transaction.model";
import userModel from "@/model/user.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE({ req, params }: { req: NextRequest; params: { transactionID: string } }) {


  await dbConnect();
  const transactionId = params.transactionID;
  const { getUser } = getKindeServerSession();
  const User = await getUser();

  if (!User) {
    await dbDisconnect();
    return NextResponse.json(
      {
        success: false,
        message: "User not found",
      },
      { status: 404 }
    );
  }

  try {
    
    const transactionToDelete = await transactionModel.findByIdAndDelete({transactionId});

    if (!transactionToDelete) {
      await dbDisconnect();
      return NextResponse.json(
        { success: false, message: "Transaction not found",ok:true },
        { status: 404 }
      );
    }
  
    const user = await userModel.updateOne(
      {
        id: User.id,
      },
      { $pull: { transactions: { _id: transactionId } } }
    );

    if (user.modifiedCount === 0) {
      await dbDisconnect();
      return NextResponse.json(
        {
          success: false,
          message: "Transaction not found or already deleted",
        },
        { status: 404 }
      );
    }

    await dbDisconnect();
    return NextResponse.json(
      {
        success: true,
        message: "Transaction has been deleted",
        ok: true,
        transactionToDelete,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    await dbDisconnect();
    return NextResponse.json(
      { success: false, message: "Failed to delete the transaction", ok: false },
      { status: 500 }
    );
  }
}
