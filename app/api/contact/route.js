
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { firstName, lastName, email, message } = await req.json();

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password
      },
    });

    // **1️⃣ Send email to Vivek@pixell**
    await transporter.sendMail({
      from: `"${firstName}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: "New Contact Form Submission",
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`,
    });

    // **2️⃣ Send Auto-reply to User**
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thanks for Contacting Us!",
      text: `Hello ${firstName},\n\nThank you for reaching out! We received your message:\n"${message}"\n\nWe will get back to you soon.\n\nBest regards,\nVivek`,
    });

    return new Response(
      JSON.stringify({ message: "Email sent successfully!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ message: "Error sending email", error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
