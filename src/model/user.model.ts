import mongoose, { Schema } from "mongoose";
import { Transaction, transactionSchema } from "./transaction.model";
import { Amount } from "./amount.model";

export interface User extends Document {
  userName: string;
  email: string;
  id: string;
  transaction: Transaction[];
  amount: Amount[];
}

const userSchema: Schema<User> = new mongoose.Schema({
  id: String,
  userName: {
    type: String,
    require: [true, "User name is required"],
    trim: true,
  },

  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  transaction: { type: [transactionSchema], ref: "transactions" },
  amount: { type: [transactionSchema], ref: "amounts" },
});

const userModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("users", userSchema);

export default userModel;
