// app/api/cart/get/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connect";
import { verifyToken } from "@/lib/jwt";
import Cart from "@/model/Cart";
import Product from "@/model/Products";

export async function GET(req) {
  try {
    await connectDB();

    const token = req.cookies.get("auth-token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    const cart = await Cart.findOne({ user: decoded.id }).populate(
      "items.product"
    );

    return NextResponse.json(cart || { items: [] });
  } catch (err) {
    console.error("Fetch Cart Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
