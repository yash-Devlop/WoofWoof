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
    // author: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
  },
  {
    timestamps: true, // ✅ auto-adds createdAt & updatedAt
  }
);

// Avoid recompiling model during hot reloads in Next.js
export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
