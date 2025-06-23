import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { connectDB } from "@/lib/connect";
import Cart from "@/model/Cart";
import Products from "@/model/Products";

export async function POST(req) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token); // should return { id, email }

    const { productId, quantity } = await req.json();

    const product = await Products.findById(productId);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    let cart = await Cart.findOne({ user: decoded.id });

    if (cart) {
      const existingItemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (existingItemIndex !== -1) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }

      await cart.save();
    } else {
      await Cart.create({
        user: decoded.id,
        items: [{ product: productId, quantity }],
      });
    }

    return NextResponse.json({ message: "Added to cart successfully" });
  } catch (err) {
    console.error("Cart Add Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
