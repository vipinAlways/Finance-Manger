import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for the Transaction document
export interface Transaction extends Document {
  date: Date;
  category: string;
  method: string;
  user: mongoose.Schema.Types.ObjectId;
  amount: number;
  note: string;
  transactionType: string
}

// Define the schema for the Transaction model
export const transactionSchema: Schema<Transaction> = new Schema({
  date: {
    type: Date,
    default: Date.now,  // Default current date
  },
  category: {
    type: String,
    required: true,     // Assuming category is required
  },
  method: {
    type: String,
    required: true,     // Assuming method is required
  },
  amount: {
    type: Number,
    required: true,     // Assuming amount is required
  },
  transactionType: {
    type: String,
    required: true,     // Assuming transactionType is required
  },
  note: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,     // Assuming user is required
  },
});

// Check if the model already exists to avoid OverwriteModelError
const transactionModel: Model<Transaction> =
  mongoose.models.Transaction || mongoose.model<Transaction>("Transaction", transactionSchema);

export default transactionModel;
