import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    discount: { 
      type: Number, 
      required: true, 
      min: [0, "Discount cannot be less than 0%"], 
      max: [100, "Discount cannot exceed 100%"] 
    },
    thresholdAmount: { type: Number, required: true, min: 0 },
    usageLimit: { type: Number, required: true, min: 1 },
    validFrom: { type: Date, required: true },
    validTill: { type: Date, required: true },
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Coupon || mongoose.model("Coupon", CouponSchema);
