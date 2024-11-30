import mongoose, { Schema, Document, Model } from "mongoose";
import { Amount } from "./Amount.model";  // Make sure Amount model is correct
import { transactionSchema } from "./Transaction.model";  // Import transaction schema correctly

// Define the User interface
export interface User extends Document {
  userName: string;
  email: string;
  id: string
  transaction: any
  amount: any
}

// Define the schema for the User model
const userSchema: Schema<User> = new mongoose.Schema({
  id: String,
  userName: {
    type: String,
    required: [true, "User name is required"],  // Corrected from 'require' to 'required'
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  transaction: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],  // Correct reference to Transaction model
  amount: [{ type: mongoose.Schema.Types.ObjectId, ref: "Amount" }],  // Correct reference to Amount model
});

// Check if the User model already exists to avoid OverwriteModelError
const userModel: Model<User> =
  mongoose.models.User || mongoose.model<User>("User", userSchema);

export default userModel;
