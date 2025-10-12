//  path -> /api/email/getUserEmail
export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function GET(req) {
  try {
    // ✅ Extract cookies
    const cookieStore = req.cookies;
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "No auth-token cookie found" },
        { status: 401 }
      );
    }

    // ✅ Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // ✅ Return decoded email
    return NextResponse.json({ email: decoded.email }, { status: 200 });

  } catch (error) {
    console.error("❌ Error verifying token:", error);
    return NextResponse.json(
      { error: "Failed to verify token" },
      { status: 500 }
    );
  }
}
