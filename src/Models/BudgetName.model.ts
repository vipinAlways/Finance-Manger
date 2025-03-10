import { BudgetName } from "@/types";
import mongoose, { Model, Schema } from "mongoose";

export const BudgetNameShcema = new Schema({
  nameOfCategorey: {
    type: String,
    require: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  amount: [{ type: mongoose.Schema.Types.ObjectId, ref: "Amount" }],
});

const BudgetNameModel: Model<BudgetName> =
  mongoose.models.BudgetName ||
  mongoose.model<BudgetName>("BudgetName", BudgetNameShcema);

export default BudgetNameModel;

