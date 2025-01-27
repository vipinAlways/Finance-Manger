"use server"; 
import dbConnect from "@/lib/dbconnects";
import userModel from "@/Models/User.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


export async function GET(req: Request) {
  await dbConnect();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return {
      status: 401,
      body: {
        message: "Unauthorized",
      },
    };
  }

  try {
    const dbUser = await userModel.findOne({ email: user.email });

    if (!dbUser) {
      return {
        status: 404,
        body: {
          message: "User not found",
        },
      };
    }

    return {
      status: 200,
      dbUser,
      ok: true,
      message:"User found"
    };
  } catch (error) {
    console.log("Error while fetching user data:", error);
    return {
      status: 500,
      body: {
        message: "An error occurred while fetching user data.",
    }
    }
  }
}
