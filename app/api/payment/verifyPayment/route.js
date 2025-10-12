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
      userId,             // optional for guest
      items,
      amount,
      customerInfo,       // required for guests
      shippingAddress,    // required
      tax = 0,
      shipping = 0,
      discount = 0,
      couponCode = null,
      paymentMethod = "COD",
    } = await req.json();

    // ✅ Verify Razorpay Signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 400 }
      );
    }

    let user = null;
    let userObjectId = null;

    // ✅ If userId exists, fetch user
    if (userId) {
      userObjectId = new mongoose.Types.ObjectId(userId);
      user = await User.findById(userObjectId);
      if (!user) {
        return NextResponse.json(
          { success: false, message: "User not found" },
          { status: 404 }
        );
      }
    } else {
      // ✅ Guest must provide customerInfo
      if (!customerInfo || !customerInfo.name || !customerInfo.email || !customerInfo.phone) {
        return NextResponse.json(
          { success: false, message: "Customer info required for guest orders" },
          { status: 400 }
        );
      }
    }

    // ✅ shippingAddress validation (required)
    if (
      !shippingAddress ||
      !shippingAddress.name ||
      !shippingAddress.phone ||
      !shippingAddress.addressLine1 ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.country ||
      !shippingAddress.postalCode
    ) {
      return NextResponse.json(
        { success: false, message: "Complete shipping address is required" },
        { status: 400 }
      );
    }

    // ✅ Save Order
    const newOrder = new Order({
      user: userObjectId || undefined,
      customerInfo: user
        ? { name: user.username, email: user.email, phone: user.phone }
        : customerInfo,
      items,
      amount,
      subtotal: amount - shipping - tax + discount,
      shipping,
      tax,
      discount,
      couponCode,
      paymentId: razorpay_payment_id,
      paymentMethod,
      shippingAddress,
      status: "Paid",
      isVerifiedUser: !!user,
      isPaymentVerified: true,
    });

    await newOrder.save();

    // ✅ Configure Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
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

    const itemsList = detailedItems
      .map(
        (item) =>
          `<li>${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}</li>`
      )
      .join("");

    // ✅ Admin Notification Email
    await transporter.sendMail({
      from: `"Woof-Woof Orders" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `🛒 New Order Received - ₹${amount}`,
      html: `
        <h2>New Order Notification</h2>
        <p><b>Customer:</b> ${user?.username || customerInfo?.name} (${user?.email || customerInfo?.email})</p>
        <p><b>Payment ID:</b> ${razorpay_payment_id}</p>
        <p><b>Total Amount:</b> ₹${amount}</p>
        <p><b>Shipping Address:</b> ${shippingAddress.addressLine1}, ${shippingAddress.addressLine2 || ''}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.country} - ${shippingAddress.postalCode}</p>
        <h3>Items:</h3>
        <ul>${itemsList}</ul>
        <p><b>Status:</b> Paid ✅</p>
      `,
    });

    // ✅ Customer Confirmation Email (if email exists)
    const customerEmail = user?.email || customerInfo?.email;
    if (customerEmail) {
      await transporter.sendMail({
        from: `"Woof-Woof Orders" <${process.env.EMAIL_USER}>`,
        to: customerEmail,
        subject: `✅ Order Confirmation - ₹${amount}`,
        html: `
          <h2>Thank you for your order, ${user?.username || customerInfo?.name}! 🎉</h2>
          <p>Your payment has been received successfully.</p>
          <p><b>Payment ID:</b> ${razorpay_payment_id}</p>
          <p><b>Total Amount:</b> ₹${amount}</p>
          <p><b>Shipping Address:</b> ${shippingAddress.addressLine1}, ${shippingAddress.addressLine2 || ''}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.country} - ${shippingAddress.postalCode}</p>
          <h3>Items Ordered:</h3>
          <ul>${itemsList}</ul>
          <p>We'll notify you once your order is processed. 💌</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Payment handler error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
