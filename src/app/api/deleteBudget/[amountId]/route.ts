import dbConnect, { dbDisconnect } from "@/lib/dbconnects";
import amountModel, { Amount } from "@/model/amount.model";
import userModel from "@/model/user.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { amountId: string } }
) {
  await dbConnect();
  const { amountId } = params;

  const { getUser } = getKindeServerSession();
  const loginUser = await getUser();

  if (!loginUser) {
    await dbDisconnect();
    return NextResponse.json(
      {
        success: false,
        message: "User not found",
      },
      { status: 404 }
    );
  }

  try {
    const user = await userModel.updateOne(
      { id: loginUser.id },
      { $pull: { amount: { _id: "amountId" } } }
    );
    await amountModel.deleteOne({ _id: amountId });

    if (user.modifiedCount === 0) {
      await dbDisconnect();
      return NextResponse.json(
        {
          success: false,
          message: "Transaction not found or already deleted",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, ok: true, amountId });
  } catch (error) {
    console.log(error);
    await dbDisconnect();
    return NextResponse.json(
      { success: false, message: "Failed to delete the amount", ok: false },
      { status: 500 }
    );
  }
}
// import dbConnect, { dbDisconnect } from "@/lib/dbconnects";
// import amountModel from "@/model/amount.model";
// import { NextRequest, NextResponse } from "next/server";

// export async function DELETE(req: NextRequest, { params }: { params: { amountId: string } }) {
//   await dbConnect();
//   const { amountId } = params;

//   try {
//     const deletedAmount = await amountModel.findByIdAndDelete(amountId);

//     if (!deletedAmount) {
//       await dbDisconnect();
//       return NextResponse.json(
//         { success: false, message: "Amount not found", ok: false },
//         { status: 404 }
//       );
//     }

//     await dbDisconnect();
//     return NextResponse.json(
//       { success: true, message: "Amount deleted successfully", ok: true },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error(error);
//     await dbDisconnect();
//     return NextResponse.json(
//       { success: false, message: "Failed to delete the amount", ok: false },
//       { status: 500 }
//     );
//   }
// }
