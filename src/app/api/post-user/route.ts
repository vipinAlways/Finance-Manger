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
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const existingUser = await userModel.findOne({
      userName: user.given_name! + user?.family_name!,
    });
    const existingUserByEmail = await userModel.findOne({
      email: user?.email,
    });

    if (existingUser && existingUserByEmail) {
      return Response.redirect(`${process.env.KINDE_SITE_URL}/dashboard`);
    }
    const client = new userModel({
      userName: user?.given_name! + user?.family_name,
      email: user?.email,
      id: user?.id,
    });

    await client.save();

    return NextResponse.json(
      { success: true, ok: true, message: "ho gya register",client },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Error while connecting to the database or saving user:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "User registration failed",
      },
      { status: 500 }
    );
  }
}
