"use server";

import dbConnect from "@/lib/dbconnects";
import categoryModel from "@/Models/Categories.model";
import userModel from "@/Models/User.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      return new Response(JSON.stringify({
        success: false,
        message: "User not authenticated",
        ok: false,
      }), { status: 401 });
    }

    const dbuser = await userModel.findOne({ id: user.id });
    if (!dbuser) {
      return new Response(JSON.stringify({
        success: false,
        message: "User not registered in the database",
        ok: false,
      }), { status: 404 });
    }

    const { nameOfCategory } = await req.json();
    if (!nameOfCategory || nameOfCategory.trim() === "" ||!nameOfCategory) {
      return new Response(JSON.stringify({
        success: false,
        message: "Invalid category name",
        ok: false,
      }), { status: 400 });
    }

    const createCategory = await categoryModel.create({
      user: dbuser._id,
      nameOfCategorey: nameOfCategory,
    });

    dbuser.perosonalCategory.push(createCategory._id);
    await dbuser.save();

    return new Response(JSON.stringify({
      success: true,
      ok: true,
      message: "Category added successfully",
    }), { status: 200 });
    
  } catch (error) {
    console.error("Error creating category:", error);
    return new Response(JSON.stringify({
      success: false,
      message: "Error creating category",
      ok: false,
    }), { status: 500 });
  }
}
