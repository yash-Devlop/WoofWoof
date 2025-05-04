import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connect";
import User from "@/model/User";

export async function POST(req) {
  try {
    await connectDB();

    const { email, otp } = await req.json();
    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and OTP are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    if (existingUser.otpExpiry < new Date()) {
      return NextResponse.json({ message: " OTP expired " }, { status: 400 });
    }

    if (existingUser.otp !== otp) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    existingUser.otp = undefined;
    existingUser.otpExpiry = undefined;
    await existingUser.save();

    return NextResponse.json(
      { message: "OTP verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
