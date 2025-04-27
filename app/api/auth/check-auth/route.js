export const runtime = "nodejs";
import { verifyToken } from "@/lib/jwt";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      isAuthenticated: true,
      user: {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      },
    });
  } catch (error) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }
}
