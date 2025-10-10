import mongoose from "mongoose";

const ReviewSchema =
  mongoose.models.Review?.schema ||
  new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now },
  });

const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);

export default Review;
