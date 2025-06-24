// app/api/payment/createOrder/route.js
import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import User from "@/model/User"; // ✅ adjust path if needed
import { connectDB } from "@/lib/connect"; // ✅ your DB connect utility
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export async function POST(req) {
  try {
    await connectDB(); // ✅ Ensure database is connected
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);

    const { amount } = await req.json();
    const email = decoded.email;

    if (!email || !amount) {
      return NextResponse.json(
        { success: false, message: "Email and amount are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const options = {
      amount: amount * 100, // in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      order,
      userId: user._id,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
