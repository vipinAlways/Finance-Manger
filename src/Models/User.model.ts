
import { User } from "@/types";
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
  image: {
    type: String,
    default: "",
    required: true,
  },
  transaction: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
  perosonalCategory: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  ],
});

const userModel: Model<User> =
  mongoose.models.User || mongoose.model<User>("User", userSchema);

export default userModel;
