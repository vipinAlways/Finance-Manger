import mongoose, { Schema, Document } from "mongoose";

export interface Transaction extends Document {
  date: Date;
  category: string;
  method: string;
  user: mongoose.Schema.Types.ObjectId;
  amount: number;
  note: string;
  transactionType:string
}

export const transactionSchema: Schema<Transaction> = new Schema({
  date: {
    type: Date,
  },
  category: {
    type: String,
  },
  method: {
    type: String,
  },
  amount: {
    type: Number,
  },
  transactionType: { type: String,  required: true },
  note: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});


const transactionModel =
  mongoose.models.Transaction ||
  mongoose.model<Transaction>("transactions", transactionSchema);

export default transactionModel;
