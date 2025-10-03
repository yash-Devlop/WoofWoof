export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateToken } from "@/lib/jwt";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate against env admin credentials
    if (
      email !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.json(
        { message: "Invalid admin credentials" },
        { status: 401 }
      );
    }

    // Generate token with role = admin
    const token = generateToken({
      id: "admin",
      email: process.env.ADMIN_USERNAME,
      role: "admin",
    });

    const cookieStore = await cookies();
    cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 86400, // 1 day
      path: "/",
    });

    return NextResponse.json({
      message: "Admin login successful",
      user: {
        id: "admin",
        email: process.env.ADMIN_USERNAME,
        role: "admin",
      },
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Login failed" },
      { status: 400 }
    );
  }
}
