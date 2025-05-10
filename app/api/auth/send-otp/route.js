const { NextResponse } = require("next/server");
import { connectDB } from "@/lib/connect";
import User from "@/model/User";
import { Password } from "@mui/icons-material";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    await connectDB();

    const { email, username, phoneNumber } = await req.json();
    if (!email || !username || !phoneNumber) {
      return NextResponse.json(
        { message: "All fields is required." },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.isVerified) {
      return NextResponse.json(
        { message: "Email already in use. Please provide a different email." },
        { status: 400 }
      );
    }

    // Generate a new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Set expiry time (5 minutes)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    if (existingUser) {
      existingUser.username = username;
      existingUser.phone = phoneNumber;
      existingUser.otp = otp;
      existingUser.otpExpiry = expiresAt;
      await existingUser.save();
    } else {
      await User.create({
        email,
        username,
        phone: phoneNumber,
        otp: otp,
        otpExpiry: expiresAt,
        password: null,
      });
    }

    // Setup Nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      html: `<p>Your OTP code is <b>${otp}</b>. It will expire in 5 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "OTP sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Send OTP Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
