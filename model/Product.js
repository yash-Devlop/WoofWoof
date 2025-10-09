import mongoose from "mongoose";

const colorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
});

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    Category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    markedPrice: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    images: [
      {
        url: { type: String, required: true },
        altText: { type: String },
      },
    ],
    description: {
      coreInstruction: { type: String },
      detailedInfo: { type: String },
      additionalDetails: { type: String },
    },
    tags: [String],
    popularity: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    colors: [colorSchema],
    sizes: [String],
    inStock: {
      type: Boolean,
      default: true,
    },
    isBestSelling: {
      type: Boolean,
      default: false,
      validate: {
        validator: async function (value) {
          if (value === true) {
            const count = await mongoose.models.Product.countDocuments({
              isBestSelling: true,
            });
            return count < 8;
          }
          return true;
        },
        message: "Only 8 products can be marked as Best Selling.",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
