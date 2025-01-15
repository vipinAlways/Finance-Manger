import mongoose, { Document, Schema, Model } from "mongoose";

const amountSchema: Schema<Amount> = new Schema({
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
