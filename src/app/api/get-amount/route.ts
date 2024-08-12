import dbConnect, { dbDisconnect } from "@/lib/dbconnects";
import amountModel from "@/model/amount.model";
import transactionModel from "@/model/transaction.model";
import userModel from "@/model/user.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await dbConnect();
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

  const url = new URL(req.url);
 

  try {
    const user = await userModel.findOne({ id: User.id });
    console.log(user);

    if (!user) {
      await dbDisconnect();
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const amount = await amountModel.find({ user:user?._id });

    

    if (!amount.length) {
      await dbDisconnect();
      return NextResponse.json(
        { success: false, message: "No amount found" },
        { status: 404 }
      );
    }

    await dbDisconnect();
    return NextResponse.json({
       amount,
      ok:true
    },{status:200});
  } catch (error) {
    

    await dbDisconnect();
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching amount",
      },
      { status: 500 }
    );
  }
}
