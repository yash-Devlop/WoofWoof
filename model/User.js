// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },
//     username: {
//       type: String,
//       required: true,
//     },
//     phone: {
//       type: String,
//       required: true,
//     },
//     role: {
//       type: String,
//       enum: ["admin", "user"],
//       default: "user",
//     },
//     otp: {
//       type: String,
//     },
//     otpExpiry: {
//       type: Date,
//     },
//     password: {
//       type: String,
//       required: false,
//     },
//     isVerified: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.User || mongoose.model("User", userSchema);

import mongoose from "mongoose";

// Define a reusable address schema
const addressSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    addressLine: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    pincode: {
      type: String,
      required: true,
      match: [/^\d{6}$/, "Please enter a valid 6-digit pincode"],
    },
    contact: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit contact number"],
    },
    label: {
      type: String,
      default: "Home", // Options: Home, Office, Other
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false } // Prevents separate _id creation for each address
);

// Define the main user schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
    password: {
      type: String,
      required: false, // Only required if using password auth
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    // 🔥 Delivery addresses
    deliveryAddresses: {
      type: [addressSchema],
      default: [],
    },
  },
  { timestamps: true }
);

// Export the model
export default mongoose.models.User || mongoose.model("User", userSchema);
