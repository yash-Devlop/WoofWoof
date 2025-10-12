// app/api/email/send-order-confirmation/route.js
import { NextResponse } from "next/server";
import { sendOrderConfirmationEmail } from "@/lib/emailService";
import { connectDB } from "@/lib/connect";

export async function POST(req) {
  try {
    await connectDB();

    const orderData = await req.json();

    // ✅ Validation
    if (!orderData.customerEmail) {
      return NextResponse.json(
        { success: false, message: "Customer email is required" },
        { status: 400 }
      );
    }

    if (!orderData.orderId || !orderData.items || orderData.items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Order ID and items are required" },
        { status: 400 }
      );
    }

    // ✅ Send emails
    const result = await sendOrderConfirmationEmail(orderData);

    return NextResponse.json(
      {
        success: true,
        message: "Order confirmation emails sent successfully",
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error in email API:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send order confirmation emails",
        error: error.message,
      },
      { status: 500 }
    );
  }
}