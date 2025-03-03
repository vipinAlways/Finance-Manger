// "use server"
// import dbConnect from "@/lib/dbconnects";
// import amountModel from "@/Models/Amount.model";
// import userModel from "@/Models/User.model";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

// export async function POST(req:Request) {
//     await dbConnect()

//     const {getUser} =  getKindeServerSession()
//     const user = await getUser()
//     if (!user.email) {
//         throw new Error("User is not Authenticated")
//     }
    
//     try {
//         const dbuser = await userModel.findOne({
//             email:user.email
//         })
//         if (!dbuser) {
//             throw new Error("user is not register")
//         }
//         const forWhich =  req.url.search("for")

//         const {saving,amount} = await req.json()

//         const amountUpdate = await amountModel.updateOne({
//             budgetFor://mem
//         })
        

//     } catch (error) {
        
//     }
// }