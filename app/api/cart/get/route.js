// app/api/cart/get/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connect";
import { verifyToken } from "@/lib/jwt";
import Cart from "@/model/Cart";
import Product from "@/model/Product";

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

export async function POST(req) {
  try {
    await connectDB();

    const { ids } = await req.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { message: "Product IDs are required" },
        { status: 400 }
      );
    }

    const products = await Product.find({ _id: { $in: ids } });
    console.log(products);
    return NextResponse.json(products);
  } catch (err) {
    console.error("Get Many Products Error:", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}