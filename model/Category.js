import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true }
); // This adds 'createdAt' and 'updatedAt'
export default mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);
