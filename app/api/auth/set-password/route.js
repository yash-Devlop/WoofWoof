import { connectDB } from "@/db/connect";
import User from "@/model/User";
import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/bcrypt";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password, confirmPassword } = await req.json();

    if (!email || !password || !confirmPassword) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Password and Confirmed-Password should be same." },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user || user.isVerified) {
      return NextResponse.json(
        { message: "User not verified" },
        { status: 400 }
      );
    }

    const hash = await hashPassword(password);

    user.password = hash;
    user.isVerified = true;

    await user.save();

    return NextResponse.json(
      {
        message: "Password set successfully. Registration complete!",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
