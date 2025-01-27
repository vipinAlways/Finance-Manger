"use server"
import dbConnect from "@/lib/dbconnects";
import userModel from "@/Models/User.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const existingUser = await userModel.findOne({
      userName: `${user.given_name}${user.family_name}`,
    });

    const existingUserByEmail = await userModel.findOne({ email: user.email });

    if (existingUser || existingUserByEmail) {
      return NextResponse.json(
        { success: true },
        { status: 302 }
      );
    }

    const client = new userModel({
      userName: `${user.given_name}${user.family_name}`,
      email: user.email,
      id: user.id,
      image: user.picture,
    });

    await client.save();

    return NextResponse.json(
      { success: true, ok: true, message: "User registered", client },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in API handler:", error);
    return NextResponse.json(
      { success: false, message: "User registration failed" },
      { status: 500 }
    );
  }
}
