import mongoose, { Document } from "mongoose";

declare interface Transaction extends Document {
  date: Date;
  category: string;
  method: string;
  user: any;
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
  saving: number;
  endDate: Date;
  user?: any;
  _id: string;
}

declare interface User extends Document {
  userName: string;
  email: string;
  id: string;
  transaction: any;
  perosonalCategory: any;
  image:string;
  BudgetName:any
}
declare interface Category extends Document {
  nameOfCategorey: string;
  user: any;
  _id: string;
}
declare interface BudgetName extends Document {
  nameOfCategorey: string;
  user: any;
  _id: string;
  amount:any,
  icon:string
}
