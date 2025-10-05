import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connect";
import User from "@/model/User";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    await connectDB();

    const { email, username, phoneNumber } = await req.json();

    if (!email || !username || !phoneNumber) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // Check if the email already exists (verified or unverified)
    const existingEmailUser = await User.findOne({ email });
    if (existingEmailUser) {
      if (existingEmailUser.isVerified) {
        return NextResponse.json(
          { message: "This email is already verified and in use." },
          { status: 400 }
        );
      }

      // Prevent resending OTP if OTP is still valid
      if (existingEmailUser.otpExpiry > new Date()) {
        return NextResponse.json(
          { message: "OTP already sent. Please wait for it to expire." },
          { status: 429 }
        );
      }
    }

    // Check if username is taken (by anyone, verified or unverified)
    const existingUsernameUser = await User.findOne({ username });
    if (existingUsernameUser && existingUsernameUser.email !== email) {
      return NextResponse.json(
        { message: "This username is already taken." },
        { status: 400 }
      );
    }

    // Generate a new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    if (existingEmailUser) {
      // Update existing unverified user
      existingEmailUser.username = username;
      existingEmailUser.phone = phoneNumber;
      existingEmailUser.otp = otp;
      existingEmailUser.otpExpiry = expiresAt;
      await existingEmailUser.save();
    } else {
      // Create a new record
      await User.create({
        email,
        username,
        phone: phoneNumber,
        otp,
        otpExpiry: expiresAt,
        password: null,
        isVerified: false,
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
      { message: "OTP sent successfully." },
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
