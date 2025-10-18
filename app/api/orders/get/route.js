// /api/orders/get
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { connectDB } from "@/lib/connect";
import User from "@/model/User";
import Order from "@/model/Order";

export const runtime = "nodejs";

export async function GET(req) {
  try {
    await connectDB();

    // 1️⃣ Get token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized: Missing token" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || !decoded.email) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
    }

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.isVerified) {
      return NextResponse.json({ error: "Access denied: User not verified" }, { status: 403 });
    }

    const orders = await Order.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate("user", "email username phone");

    return NextResponse.json({ success: true, orders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
