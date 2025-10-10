import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/connect";
import { verifyToken } from "@/lib/jwt";
import Products from "@/model/Product";
import Cart from "@/model/Cart";

export async function POST(req) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token); // should return { id, email }

    const { productId, quantity, size, color } = await req.json();

    const product = await Products.findById(productId);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    let cart = await Cart.findOne({ user: decoded.id });

    if (cart) {
      // ✅ Find by productId + size + color match (all optional)
      const existingItemIndex = cart.items.findIndex((item) => {
        const sameProduct = item.product.toString() === productId;
        const sameSize = item.size === size || (!item.size && !size);
        const sameColor =
          (item.color?.code || null) === (color?.code || null) &&
          (item.color?.name || null) === (color?.name || null);

        return sameProduct && sameSize && sameColor;
      });

      if (existingItemIndex !== -1) {
        // ✅ If same variant exists, increase quantity
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        // ✅ Otherwise add new variant entry
        cart.items.push({
          product: productId,
          quantity,
          size: size || null,
          color: color || null,
          addedAt: new Date(),
        });
      }

      await cart.save();
    } else {
      // ✅ New cart
      await Cart.create({
        user: decoded.id,
        items: [
          {
            product: productId,
            quantity,
            size: size || null,
            color: color || null,
            addedAt: new Date(),
          },
        ],
      });
    }

    return NextResponse.json({ message: "Added to cart successfully" });
  } catch (err) {
    console.error("Cart Add Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
