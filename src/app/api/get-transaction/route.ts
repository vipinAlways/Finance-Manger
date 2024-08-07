import dbConnect, { dbDisconnect } from "@/lib/dbconnects";
import transactionModel from "@/model/transaction.model";
import userModel from "@/model/user.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await dbConnect();
  const {getUser} =  getKindeServerSession();
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
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const perpage = parseInt(url.searchParams.get('perpage') || '6', 10);

  try {
    const user = await userModel.findOne({ id: User.id });

    if (!user) {
      await dbDisconnect();
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }


    const transactions = await transactionModel
      .find({ user: user?._id })
      .skip((page - 1) * perpage)
      .limit(perpage);

    const totalTransactions = await transactionModel.countDocuments({ user: user?._id });

    if (!transactions.length) {
      await dbDisconnect();
      return NextResponse.json(
        { success: false, message: "No transactions found" },
        { status: 404 }
      );
    }

    await dbDisconnect();
    return NextResponse.json({
      transactions,
      page,
      perpage,
      total: totalTransactions
    });
  } catch (error) {
    console.error(error);

    await dbDisconnect();
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching transactions",
      },
      { status: 500 }
    );
  }
}
