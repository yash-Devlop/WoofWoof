// lib/emailService.js or utils/emailService.js
import nodemailer from "nodemailer";
import Product from "@/model/Product";

/**
 * Send order confirmation emails to both customer and admin
 * @param {Object} orderData - Order information
 * @param {string} orderData.orderId - MongoDB Order ID
 * @param {string} orderData.orderNumber - Human-readable order number
 * @param {string} orderData.customerName - Customer's name
 * @param {string} orderData.customerEmail - Customer's email
 * @param {Array} orderData.items - Array of order items
 * @param {number} orderData.amount - Total amount
 * @param {number} orderData.subtotal - Subtotal
 * @param {number} orderData.shipping - Shipping cost
 * @param {number} orderData.tax - Tax amount
 * @param {number} orderData.discount - Discount amount
 * @param {string} orderData.paymentMethod - Payment method (COD, Razorpay, etc.)
 * @param {string} orderData.paymentId - Payment ID (for online payments)
 * @param {Object} orderData.shippingAddress - Shipping address object
 * @param {string} orderData.status - Order status
 */
export async function sendOrderConfirmationEmail(orderData) {
  try {
    // ✅ Configure Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Fetch product details for items
    const detailedItems = await Promise.all(
      orderData.items.map(async (item) => {
        const product = await Product.findById(item.productId);
        return {
          name: item.name || product?.name || "Unknown Product",
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
        };
      })
    );

    // ✅ Generate items list HTML
    const itemsList = detailedItems
      .map(
        (item) =>
          `<li style="margin-bottom: 8px;">
            <strong>${item.name}</strong> x${item.quantity} - ₹${item.total.toFixed(2)}
          </li>`
      )
      .join("");

    // ✅ Format shipping address
    const {
      name,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      postalCode,
    } = orderData.shippingAddress;

    const formattedAddress = `
      ${addressLine1}${addressLine2 ? ', ' + addressLine2 : ''}<br/>
      ${city}, ${state} ${postalCode}<br/>
      ${country}<br/>
      Phone: ${phone}
    `;

    // ✅ Customer Email Template
    const customerEmailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .summary { border-top: 2px solid #667eea; padding-top: 15px; margin-top: 15px; }
          .total { font-size: 20px; font-weight: bold; color: #667eea; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Order Confirmed!</h1>
            <p>Thank you for your order, ${orderData.customerName}!</p>
          </div>
          <div class="content">
            <div class="order-details">
              <h2>Order Details</h2>
              <p><strong>Order Number:</strong> ${orderData.orderNumber}</p>
              <p><strong>Order Date:</strong> ${new Date().toLocaleDateString('en-IN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
              <p><strong>Payment Method:</strong> ${orderData.paymentMethod}</p>
              ${orderData.paymentId ? `<p><strong>Payment ID:</strong> ${orderData.paymentId}</p>` : ''}
              <p><strong>Status:</strong> <span style="color: ${orderData.status === 'Paid' ? '#10b981' : '#f59e0b'};">${orderData.status}</span></p>
            </div>

            <div class="order-details">
              <h3>Items Ordered</h3>
              <ul style="list-style: none; padding: 0;">
                ${itemsList}
              </ul>

              <div class="summary">
                <p>Subtotal: ₹${orderData.subtotal.toFixed(2)}</p>
                ${orderData.discount > 0 ? `<p style="color: #10b981;">Discount: -₹${orderData.discount.toFixed(2)}</p>` : ''}
                <p>Shipping: ₹${orderData.shipping.toFixed(2)}</p>
                <p>Tax: ₹${orderData.tax.toFixed(2)}</p>
                <p class="total">Total: ₹${orderData.amount.toFixed(2)}</p>
              </div>
            </div>

            <div class="order-details">
              <h3>Shipping Address</h3>
              <p><strong>${name}</strong></p>
              <p>${formattedAddress}</p>
            </div>

            <p style="margin-top: 30px; padding: 15px; background: #e0f2fe; border-left: 4px solid #0284c7; border-radius: 4px;">
              📦 We'll send you tracking information once your order ships.
            </p>
          </div>
          <div class="footer">
            <p>Thank you for shopping with Woof Woof! 🐾</p>
            <p>If you have any questions, please contact us at ${process.env.EMAIL_USER}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // ✅ Admin Email Template
    const adminEmailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 700px; margin: 0 auto; padding: 20px; }
          .header { background: #1f2937; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; }
          .section { margin: 20px 0; padding: 15px; background: #f9fafb; border-radius: 6px; }
          .highlight { color: #059669; font-weight: bold; font-size: 18px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🛒 New Order Received!</h2>
          </div>
          <div class="content">
            <div class="section">
              <h3>Order Information</h3>
              <p><strong>Order Number:</strong> ${orderData.orderNumber}</p>
              <p><strong>Order ID:</strong> ${orderData.orderId}</p>
              <p><strong>Date:</strong> ${new Date().toLocaleString('en-IN')}</p>
              <p><strong>Payment Method:</strong> ${orderData.paymentMethod}</p>
              ${orderData.paymentId ? `<p><strong>Payment ID:</strong> ${orderData.paymentId}</p>` : ''}
              <p><strong>Status:</strong> ${orderData.status}</p>
              <p class="highlight">Total Amount: ₹${orderData.amount.toFixed(2)}</p>
            </div>

            <div class="section">
              <h3>Customer Information</h3>
              <p><strong>Name:</strong> ${orderData.customerName}</p>
              <p><strong>Email:</strong> ${orderData.customerEmail}</p>
              <p><strong>Phone:</strong> ${phone}</p>
            </div>

            <div class="section">
              <h3>Shipping Address</h3>
              <p>${formattedAddress}</p>
            </div>

            <div class="section">
              <h3>Items Ordered</h3>
              <ul>
                ${itemsList}
              </ul>
              <hr style="margin: 15px 0; border: none; border-top: 1px solid #e5e7eb;"/>
              <p>Subtotal: ₹${orderData.subtotal.toFixed(2)}</p>
              ${orderData.discount > 0 ? `<p>Discount: -₹${orderData.discount.toFixed(2)}</p>` : ''}
              <p>Shipping: ₹${orderData.shipping.toFixed(2)}</p>
              <p>Tax: ₹${orderData.tax.toFixed(2)}</p>
              <p><strong>Total: ₹${orderData.amount.toFixed(2)}</strong></p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // ✅ Send email to customer
    const customerEmailResult = await transporter.sendMail({
      from: `"Woof Woof" <${process.env.EMAIL_USER}>`,
      to: orderData.customerEmail,
      subject: `✅ Order Confirmation #${orderData.orderNumber} - Woof Woof`,
      html: customerEmailHTML,
    });

    console.log("✅ Customer email sent:", customerEmailResult.messageId);

    // ✅ Send email to admin
    const adminEmailResult = await transporter.sendMail({
      from: `"Woof Woof Orders" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `🛒 New Order #${orderData.orderNumber} - ₹${orderData.amount.toFixed(2)}`,
      html: adminEmailHTML,
    });

    console.log("✅ Admin email sent:", adminEmailResult.messageId);

    return {
      success: true,
      customerEmailId: customerEmailResult.messageId,
      adminEmailId: adminEmailResult.messageId,
    };
  } catch (error) {
    console.error("❌ Error sending order confirmation email:", error);
    throw error;
  }
}