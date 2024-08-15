import dbConnect, { dbDisconnect } from "@/lib/dbconnects";
import transactionModel from "@/model/transaction.model";
import userModel from "@/model/user.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { transactionID: string } }) {
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
     await transactionModel.deleteOne({_id:transactionId});

    

    const user = await userModel.findOne({ _id: User.id });

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
