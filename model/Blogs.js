import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["News", "Blogs"],
      default: "Blogs",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
