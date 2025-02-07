import mongoose, { Schema, Model } from "mongoose";
import { Transaction } from "../types";

export const transactionSchema: Schema<Transaction> = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  transactionType: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  from: {
    type: String,
    required:true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const transactionModel: Model<Transaction> =
  mongoose.models.Transaction ||
  mongoose.model<Transaction>("Transaction", transactionSchema);

export default transactionModel;
