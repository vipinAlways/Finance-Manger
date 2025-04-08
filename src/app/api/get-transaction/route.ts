"use server";

import dbConnect from "@/lib/dbconnects";
import transactionModel from "@/Models/Transaction.model";
import userModel from "@/Models/User.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from") || "";

  const startDate = searchParams.get("start") || "";
  const endDate = searchParams.get("end") || "";
  try {
    await dbConnect();

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    console.log(getUser, "check user");
    console.log(getKindeServerSession, "check session");

    if (!user || !user.id) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found or not authenticated",
        },
        { status: 404 }
      );
    }

    const url = new URL(req.url);
    const page = Math.max(parseInt(url.searchParams.get("page") || "1", 10), 1);
    const perpage = Math.max(
      parseInt(url.searchParams.get("perpage") || "6", 10),
      1
    );

    const dbUser = await userModel.findOne({ id: user.id });

    if (!dbUser) {
      return NextResponse.json(
        { success: false, message: "User not found in database" },
        { status: 404 }
      );
    }

    const filters: any = { user: dbUser._id };

    if (from !== "") {
      filters.category = from; // or filters.type = from — depending on your schema
    }

    if (startDate && endDate) {
      filters.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }
    const transactions = await transactionModel
      .find(filters)
      .skip((page - 1) * perpage)
      .limit(perpage)
      .sort({ date: -1 });

    const totalTransactions = await transactionModel.countDocuments({
      user: dbUser._id,
    });

    return NextResponse.json({
      success: true,
      transactions,
      page,
      perpage,
      total: totalTransactions,
    });
  } catch (error) {
    console.error("Error in GET /api/transactions:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching transactions",
      },
      { status: 500 }
    );
  }
}
