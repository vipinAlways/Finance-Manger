import dbConnect, { dbDisconnect } from "@/lib/dbconnects";
import transactionModel from "@/Models/Transaction.model";
import userModel from "@/Models/User.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  await dbConnect();
  const { getUser } = getKindeServerSession();
  const user1 = await getUser();

  if (!user1) {
    return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
  }

  const user = await userModel.findOne({ id: user1?.id });
 

  if (user) {
    try {
      const { amount, date, note, method, category,transactionType } = await req.json();


      

      let newTransaction =  await  transactionModel.create({
        amount,
        date,
        note,
        method,
        category,
        transactionType,
        user: user._id,
      });

   

     

      await newTransaction.save();
    
      user.transaction.push(newTransaction._id );
      await user.save();
      await dbDisconnect()
      return Response.json({ success: true, ok:true,message: "Transaction added successfully", transaction: newTransaction})
    } catch (error) {
      console.error("Error creating transaction:", error);
      return Response.json({ success: false, message: "Error creating transaction",ok:false }, { status: 500 });
    }
  } else {
    return NextResponse.json({  success: false, message: "User not found" }, { status: 404 });
  }
}


