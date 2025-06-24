// /app/api/cart/remove/route.js
import { connectDB } from "@/lib/connect";
import Cart from "@/model/Cart";
import { verifyToken } from "@/lib/jwt";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const token = req.cookies.get("auth-token")?.value;
  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { productId } = await req.json();
  const user = verifyToken(token);

  await Cart.findOneAndUpdate(
    { user: user.id },
    { $pull: { items: { product: productId } } }
  );

  return NextResponse.json({ message: "Item removed from cart" });
}
