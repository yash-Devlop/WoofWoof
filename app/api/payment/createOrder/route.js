// app/api/payment/createOrder/route.js
import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import User from "@/model/User";
import { connectDB } from "@/lib/connect";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,    
});

export async function POST(req) {
  try {
    await connectDB();
    
    const { amount, email } = await req.json();

    // ✅ Validate required fields
    if (!email || !amount) {
      return NextResponse.json(
        { success: false, message: "Email and amount are required" },
        { status: 400 }
      );
    }

    // ✅ Check if user is authenticated (optional)
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    
    let userId = null;
    let isAuthenticated = false;

    if (token) {
      try {
        const decoded = verifyToken(token);
        const user = await User.findOne({ email: decoded.email });
        
        if (user) {
          userId = user._id;
          isAuthenticated = true;
        }
      } catch (error) {
        console.warn("Token verification failed, treating as guest:", error.message);
        // Continue as guest user
      }
    }

    // ✅ Create Razorpay order (works for both authenticated and guest users)
    const options = {
      amount: amount * 100, // in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        email: email,
        isGuest: !isAuthenticated,
        ...(userId && { userId: userId.toString() })
      }
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      order,
      userId: userId || null,
      isGuest: !isAuthenticated,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}