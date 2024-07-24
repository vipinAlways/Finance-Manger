import mongoose, { Schema } from "mongoose";


export interface User extends Document {
  userName: string;
  email: string;
  id:string
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
});

const userModel = (mongoose.models.User as mongoose.Model<User>)||mongoose.model<User>("User" , userSchema)


export default userModel;
