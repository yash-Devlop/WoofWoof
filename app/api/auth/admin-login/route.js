export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateToken } from "@/lib/jwt";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      console.log("failed")
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    console.log(process.env.ADMIN_USERNAME, process.env.ADMIN_PASS)

    // Validate against env admin credentials
    if (
      email !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASS
    ) {
      console.log("not authorized")
      return NextResponse.json(
        { message: "Invalid admin credentials" },
        { status: 401 }
      );
    }
    console.log("passed")
    // Generate token with role = admin
    const token = generateToken({
      _id: "admin",
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
    console.log("again passed")

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
