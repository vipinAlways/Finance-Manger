import dbConnect from "@/lib/dbconnects";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST() {
    await dbConnect()

    const {getUser} = await getKindeServerSession()
    
}