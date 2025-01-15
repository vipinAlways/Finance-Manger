import mongoose, { Model, Schema } from "mongoose";

export const categorySchema = new Schema({
  nameOfCategorey: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,    
  },
});

const categoryModel: Model<Category> =
  mongoose.models.Transaction ||
  mongoose.model<Category>("Category", categorySchema);

export default categoryModel;
