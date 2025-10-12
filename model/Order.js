// model/Order.js
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String, // ✅ Added image URL
    default: null,
  },
  size: {
    type: String,
    default: null,
  },
  color: {
    code: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    orderNumber: {
      type: String,
      unique: true,
    },
    customerInfo: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    items: [orderItemSchema],
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    shipping: {
      type: Number,
      default: 0,
      min: 0,
    },
    tax: {
      type: Number,
      default: 0,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentId: {
      type: String,
      default: null,
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "Razorpay", "Card", "UPI"],
      default: "COD",
    },
    couponCode: {
      type: String,
      default: null,
    },
    shippingAddress: {
      name: String,
      phone: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      country: {
        type: String,
        default: "India",
      },
      postalCode: String,
    },
    isVerifiedUser: {
      type: Boolean,
      default: false,
    },
    isPaymentVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

// Generate order number before saving
orderSchema.pre("save", async function (next) {
  if (!this.orderNumber) {
    const count = await mongoose.model("Order").countDocuments();
    this.orderNumber = `ORD${String(count + 1).padStart(6, "0")}`;
  }
  next();
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;