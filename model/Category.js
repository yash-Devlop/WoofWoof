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
    image: {
      type: String,
      required: true, // 👈 make it required if every category must have an image
      trim: true,
    },
  },
  { timestamps: true } // adds 'createdAt' and 'updatedAt'
);

export default mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);
