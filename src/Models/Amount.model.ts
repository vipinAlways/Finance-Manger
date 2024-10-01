import mongoose, { Document, Schema, Model } from "mongoose";

// Define the Amount interface
export interface Amount extends Document {
    startDate: Date;
    amount: number;
    endDate: Date;
    user: mongoose.Schema.Types.ObjectId;
}

// Define the schema for the Amount model
const amountSchema: Schema<Amount> = new Schema({
    startDate: {
        type: Date,
        required: true,  // Fixed 'require' to 'required'
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
        ref: "User",  // Reference the correct model name "User"
    },
});

// Check if the model already exists to prevent OverwriteModelError
const amountModel: Model<Amount> = mongoose.models.Amount || mongoose.model<Amount>("Amount", amountSchema);

export default amountModel;
