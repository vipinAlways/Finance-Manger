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
  from: string;
}

declare interface Amount extends Document {
  budgetFor: string;
  startDate: Date;
  amount: number;
  endDate: Date;
  user?: mongoose.Schema.Types.ObjectId;
  _id: string;
}

declare interface User extends Document {
  userName: string;
  email: string;
  id: string;
  transaction: any;
  amount: any;
  perosonalCategory: any;
  image:string;
}
declare interface Category extends Document {
  nameOfCategorey: string;
  user: mongoose.Schema.Types.ObjectId;
  _id: string;
}
