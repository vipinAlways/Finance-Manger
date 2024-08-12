import mongoose, { Document, Schema } from "mongoose";

export interface Amount {
    [x: string]: any;
    startDate:Date,
    amount:number,
    endDate:Date,
    user:mongoose.Schema.Types.ObjectId
}

const amountSchema:Schema<Amount> = new Schema ({
    startDate:{
        type:Date,
        require:true
    },
    endDate:{
        type:Date
    },
    amount: {
        type: Number,
        required: true,

      },
    user:{type:mongoose.Schema.Types.ObjectId ,ref:"users"}
})

const amountModel = (mongoose.models.Amount as mongoose.Model<Amount>)|| mongoose.model<Amount>("amounts" , amountSchema)

export default amountModel