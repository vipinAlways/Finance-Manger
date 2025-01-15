declare interface Transaction extends Document {
  date: Date;
  category: string;
  method: string;
  user: mongoose.Schema.Types.ObjectId;
  amount: number;
  note: string;
  transactionType: string
  _id:string
}

declare interface Amount extends Document {
    startDate: Date;
    amount: number;
    endDate: Date;
    user: mongoose.Schema.Types.ObjectId;
}

declare interface User extends Document {
  userName: string;
  email: string;
  id: string
  transaction: any
  amount: any
  category: any
}
declare interface Category extends Document{
    nameOfCategorey:string,
    user: mongoose.Schema.Types.ObjectId;
}
