"use server"
import dbConnect from "@/lib/dbconnects";
import categoryModel from "@/Models/Categories.model";
import userModel from "@/Models/User.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
   
    await dbConnect();
  } catch (error) {
    console.error("Database connection failed:", error); 
    return NextResponse.json(
      { success: false, message: "Database connection failed" },
      { status: 500 }
    );
  }

  try {
   
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      console.warn("User not authenticated:", user); 
      return NextResponse.json(
        { success: false, message: "User not authenticated" },
        { status: 401 }
      );
    }

   
    const dbUser = await userModel.findOne({ id: user.id });
    if (!dbUser) {
      console.error("User not found in the database");
      return NextResponse.json(
        { success: false, message: "User not found in the database" },
        { status: 404 }
      );
    }

    // Fetch categories
    const getAllCateGories = await categoryModel.find({ user: dbUser._id });

    return NextResponse.json(
      {
        getAllCateGories,
        ok: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching categories:", error); 
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching categories",
      },
      { status: 500 }
    );
  }
}
