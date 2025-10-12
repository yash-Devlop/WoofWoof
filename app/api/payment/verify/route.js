// app/api/payment/verify/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();

    // ✅ Validation
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Missing required payment verification parameters" 
        },
        { status: 400 }
      );
    }

    if (!process.env.RAZORPAY_SECRET) {
      console.error("❌ RAZORPAY_SECRET not configured in environment variables");
      return NextResponse.json(
        { 
          success: false, 
          message: "Payment gateway configuration error" 
        },
        { status: 500 }
      );
    }

    // ✅ Verify Razorpay Signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      console.error("❌ Payment signature verification failed", {
        razorpay_order_id,
        razorpay_payment_id,
        received_signature: razorpay_signature.substring(0, 10) + "...",
        expected_signature: expectedSignature.substring(0, 10) + "...",
      });

      return NextResponse.json(
        { 
          success: false, 
          message: "Payment verification failed. Invalid signature." 
        },
        { status: 400 }
      );
    }

    console.log("✅ Payment signature verified successfully", {
      razorpay_order_id,
      razorpay_payment_id,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Payment verified successfully",
        data: {
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Payment verification error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Payment verification failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}