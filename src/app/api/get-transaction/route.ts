"use server";

import dbConnect from "@/lib/dbconnects";
import transactionModel from "@/Models/Transaction.model";
import userModel from "@/Models/User.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      return NextResponse.json(
        { success: false, message: "User not found or not authenticated" },
        { status: 404 }
      );
    }

    const dbUser = await userModel.findOne({ id: user.id });

    if (!dbUser) {
      return NextResponse.json(
        { success: false, message: "User not found in database" },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(req.url);
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
    const perpage = Math.max(
      parseInt(searchParams.get("perpage") || "6", 10),
      1
    );
    const from = searchParams.get("from") || "";
    const startDate = searchParams.get("start") || null;
    const endDate = searchParams.get("end") || null;

    const filter: any = { user: dbUser._id };
    if (from) filter.from = from;
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        filter.date = { $gte: start, $lte: end };
      } else {
        console.error("Invalid date format:", startDate, endDate);
      }
    }

    const transactions = await transactionModel
      .find(filter)
      .skip((page - 1) * perpage)
      .limit(perpage)
      .sort({ date: -1 });

    const totalTransactions = await transactionModel.countDocuments(filter); // Ensure the count respects filters

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
