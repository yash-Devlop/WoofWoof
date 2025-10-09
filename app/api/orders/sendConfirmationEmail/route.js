import { connectDB } from "@/lib/connect";
import Order from "@/model/Order";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  await connectDB();

  try {
    const { orderId, email } = await req.json();

    if (!orderId || !email) {
      return NextResponse.json(
        { error: "Order ID and email are required" },
        { status: 400 }
      );
    }

    // Fetch order details from database
    const order = await Order.findById(orderId).populate('items.productId');

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // Create email transporter (configure with your email service)
    const transporter = nodemailer.createTransporter({
      service: 'gmail', // or your email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .order-id { background: #4CAF50; color: white; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center; font-size: 20px; font-weight: bold; }
          .item { border-bottom: 1px solid #ddd; padding: 15px 0; }
          .total { background: #fff; padding: 20px; margin-top: 20px; border-radius: 5px; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmation</h1>
            <p>Thank you for your purchase!</p>
          </div>
          <div class="content">
            <div class="order-id">
              Order ID: ${order.orderNumber || order._id}
            </div>
            
            <h2>Order Details</h2>
            ${order.items.map(item => `
              <div class="item">
                <strong>${item.productId?.name || 'Product'}</strong><br>
                Quantity: ${item.quantity} × ₹${item.price.toFixed(2)} = ₹${(item.quantity * item.price).toFixed(2)}
              </div>
            `).join('')}
            
            <div class="total">
              <p><strong>Subtotal:</strong> ₹${order.subtotal?.toFixed(2) || '0.00'}</p>
              ${order.discount > 0 ? `<p style="color: #4CAF50;"><strong>Discount:</strong> -₹${order.discount.toFixed(2)}</p>` : ''}
              ${order.couponCode ? `<p><strong>Coupon Applied:</strong> ${order.couponCode}</p>` : ''}
              <p style="font-size: 20px; margin-top: 10px;"><strong>Total:</strong> ₹${order.amount.toFixed(2)}</p>
              <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
            </div>
            
            ${order.shippingAddress ? `
              <h3 style="margin-top: 30px;">Shipping Address</h3>
              <p>
                ${order.shippingAddress.firstName} ${order.shippingAddress.lastName}<br>
                ${order.shippingAddress.address}<br>
                ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}
              </p>
            ` : ''}
            
            <p style="margin-top: 30px;">We'll send you a shipping confirmation email as soon as your order ships.</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Wed My Pet. All rights reserved.</p>
            <p>If you have any questions, please contact us at support@wedmypet.com</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email
    await transporter.sendMail({
      from: `"Wed My Pet" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Order Confirmation - ${order.orderNumber || order._id}`,
      html: emailHtml,
    });

    return NextResponse.json(
      { message: "Order confirmation email sent successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email", details: error.message },
      { status: 500 }
    );
  }
}