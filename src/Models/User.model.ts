import mongoose, { Schema, Model } from "mongoose";




const userSchema: Schema<User> = new mongoose.Schema({
  id: String,
  userName: {
    type: String,
    required: [true, "User name is required"],  
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  transaction: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }], 
  amount: [{ type: mongoose.Schema.Types.ObjectId, ref: "Amount" }],  
  perosonalCategory:[{type:mongoose.Schema.Types.ObjectId , ref:"Category"}]
});


const userModel: Model<User> =
  mongoose.models.User || mongoose.model<User>("User", userSchema);

export default userModel;
