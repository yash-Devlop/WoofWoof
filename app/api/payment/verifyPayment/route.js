import crypto from "crypto";
import mongoose from "mongoose";
import Order from "@/model/Order";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      items,
      amount,
    } = await req.json();

    // ✅ Verify Razorpay Signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 400 }
      );
    }

    // ✅ Save Order
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const newOrder = new Order({
      user: userObjectId,
      items,
      amount,
      paymentId: razorpay_payment_id,
      status: "Paid", // ✅ optional
    });

    await newOrder.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
