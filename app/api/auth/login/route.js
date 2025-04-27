export const runtime = "nodejs";
import User from "@/model/User";
import { connectDB } from "@/db/connect";
import { comparePassword } from "@/lib/bcrypt";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateToken } from "@/lib/jwt";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch)
      return NextResponse.json(
        { message: "Wrong credentials" },
        { status: 401 }
      );

    const token = generateToken(user);
    const cookieStore = await cookies();
    cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 86400, // 1 day
      path: "/",
    });

    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Login failed" },
      { status: 400 }
    );
  }
}
