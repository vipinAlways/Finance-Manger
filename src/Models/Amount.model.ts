import mongoose, {  Schema, Model } from "mongoose";
import { Amount } from "..";

const amountSchema: Schema<Amount> = new Schema({
  budgetFor:{
    type:String,
    require:true
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  amount: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const amountModel: Model<Amount> =
  mongoose.models.Amount || mongoose.model<Amount>("Amount", amountSchema);

export default amountModel;
