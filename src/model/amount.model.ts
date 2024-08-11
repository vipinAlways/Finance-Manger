import mongoose, { Document, Schema } from "mongoose";

export interface Amount {
    Weekly:number,
    Monthly:number,
    createdAt:Date,
    user:mongoose.Schema.Types.ObjectId
}

const amountSchema:Schema<Amount> = new Schema ({
    Weekly:{
        type:Number
    },
    Monthly:{
        type:Number
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
      },
    user:{type:mongoose.Schema.Types.ObjectId ,ref:"users"}
})

const amountModel = (mongoose.models.Amount as mongoose.Model<Amount>)|| mongoose.model<Amount>("amounts" , amountSchema)

export default amountModel