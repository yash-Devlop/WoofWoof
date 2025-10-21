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
      required: [true, "Cover image is required"],
      trim: true,
    },

    innerImage: {
      type: String,
      required: [true, "Inner image is required"],
      trim: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["News", "Blogs"],
      default: "Blogs",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
