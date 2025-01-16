import mongoose, { Document } from "mongoose";

declare interface Transaction extends Document {
  date: Date;
  category: string;
  method: string;
  user: mongoose.Schema.Types.ObjectId;
  amount: number;
  transactionType: string;
  _id: string;
  note?: string; 
}


declare interface Amount extends Document {
    startDate: Date;
    amount: number;
    endDate: Date;
    user: mongoose.Schema.Types.ObjectId;
    _id: string;
}

declare interface User extends Document {
  userName: string;
  email: string;
  id: string
  transaction: any
  amount: any
  perosonalCategory: any
}
declare interface Category extends Document{
    nameOfCategorey:string,
    user: mongoose.Schema.Types.ObjectId;
    _id: string;
}
