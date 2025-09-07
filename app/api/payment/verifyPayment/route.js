import crypto from "crypto";
import mongoose from "mongoose";
import Order from "@/model/Order";
import { NextResponse } from "next/server";
import User from "@/model/User";
import nodemailer from "nodemailer";
import Product from "@/model/Product";

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

    // ✅ Fetch user details from DB
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const user = await User.findById(userObjectId);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // ✅ Save Order
    const newOrder = new Order({
      user: userObjectId,
      items,
      amount,
      paymentId: razorpay_payment_id,
      status: "Paid",
    });
    await newOrder.save();

    // ✅ Configure Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // smtp.gmail.com
      port: process.env.EMAIL_PORT, // 465
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const detailedItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.productId);
        return {
          name: product?.name || "Unknown Product",
          quantity: item.quantity,
          price: item.price,
        };
      })
    );

    // ✅ Build Items List HTML
    const itemsList = detailedItems
      .map(
        (item) =>
          `<li>${item?.name} (x${item?.quantity}) - ₹${
            item?.price * item?.quantity
          }</li>`
      )
      .join("");

    // ✅ Admin Notification Email
    await transporter.sendMail({
      from: `"Woof-Woof Orders" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `🛒 New Order Received - ₹${amount}`,
      html: `
        <h2>New Order Notification</h2>
        <p><b>Customer:</b> ${user?.username || "N/A"} (${user?.email})</p>
        <p><b>Payment ID:</b> ${razorpay_payment_id}</p>
        <p><b>Total Amount:</b> ₹${amount}</p>
        <h3>Items:</h3>
        <ul>${itemsList}</ul>
        <p><b>Status:</b> Paid ✅</p>
      `,
    });

    // ✅ (Optional) Customer Confirmation Email
    await transporter.sendMail({
      from: `"Woof-Woof Orders" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: `✅ Order Confirmation - ₹${amount}`,
      html: `
        <h2>Thank you for your order, ${user?.username || "Customer"}! 🎉</h2>
        <p>Your payment has been received successfully.</p>
        <p><b>Payment ID:</b> ${razorpay_payment_id}</p>
        <p><b>Total Amount:</b> ₹${amount}</p>
        <h3>Items Ordered:</h3>
        <ul>${itemsList}</ul>
        <p>We'll notify you once your order is processed. 💌</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Payment handler error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
