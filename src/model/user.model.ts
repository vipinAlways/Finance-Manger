import mongoose, { Schema } from "mongoose";
import { Transaction, transactionSchema } from "./transaction.model";





export interface User extends Document {
  userName: string;
  email: string;
  id:string
  transactions:Transaction[],
}

const userSchema:Schema<User> = new mongoose.Schema({
  id: String,
  userName: {
    type: String,
    require: [true, "User name is required"],
    trim: true,
    
  },

  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  
  },
  transactions:{type:[transactionSchema],ref:"transactions" }
});

const userModel = (mongoose.models.User as mongoose.Model<User>)||mongoose.model<User>("user" , userSchema)


export default userModel;


