import nodemailer from "nodemailer";

export async function sendOrderStatusUpdate(order) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const adminEmail = process.env.ADMIN_EMAIL;
    const brand = "Woof Woof";

    const statusColor =
      order.status === "Shipped"
        ? "#2563eb"
        : order.status === "Delivered"
        ? "#16a34a"
        : "#dc2626";

    const customerHTML = `
        <div style="font-family: Arial; padding: 20px;">
          <h2 style="color:${statusColor};">Order Update</h2>
          <p>Hello <strong>${order.customerInfo.name}</strong>,</p>
          <p>Your order <strong>#${order.orderNumber}</strong> is now:</p>
          <h3 style="color:${statusColor};">${order.status}</h3>

          <h3>Order Summary</h3>
          <p>Total Amount: <strong>₹${order.amount}</strong></p>

          <h3>Items</h3>
          <ul>
            ${order.items
              .map(
                (i) =>
                  `<li>${i.name} x ${i.quantity} — ₹${
                    i.price * i.quantity
                  }</li>`
              )
              .join("")}
          </ul>

          <br />
          <p>Thank you for shopping with us!</p>
          <p>— ${brand} Team</p>
        </div>
    `;

    const adminHTML = `
        <div style="font-family: Arial; padding: 20px;">
          <h2>Order Status Updated</h2>

          <p><strong>Order No:</strong> #${order.orderNumber}</p>
          <p><strong>Status:</strong> ${order.status}</p>

          <h3>Customer</h3>
          <p>${order.customerInfo.name}</p>
          <p>${order.customerInfo.email}</p>
          <p>${order.customerInfo.phone}</p>

          <h3>Order Value</h3>
          <p><strong>₹${order.amount}</strong></p>

          <h3>Items</h3>
          <ul>
            ${order.items
              .map(
                (i) =>
                  `<li>${i.name} x ${i.quantity} — ₹${
                    i.price * i.quantity
                  }</li>`
              )
              .join("")}
          </ul>
        </div>
    `;

    // Send to customer
    await transporter.sendMail({
      from: `${brand} <${process.env.EMAIL_USER}>`,
      to: order.customerInfo.email,
      subject: `Order #${order.orderNumber} Updated — ${order.status}`,
      html: customerHTML,
    });

    // Send to admin
    await transporter.sendMail({
      from: `${brand} <${process.env.EMAIL_USER}>`,
      to: adminEmail,
      subject: `Order #${order.orderNumber} → ${order.status}`,
      html: adminHTML,
    });

    return true;
  } catch (error) {
    console.error("Email send failed:", error);
    return false;
  }
}
