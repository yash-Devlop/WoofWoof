// /app/api/cart/update/route.js
import { connectDB } from "@/lib/connect";
import Cart from "@/model/Cart";
import { verifyToken } from "@/lib/jwt";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const token = req.cookies.get("auth-token")?.value;
  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { productId, quantity } = await req.json();
  const user = verifyToken(token);

  await Cart.findOneAndUpdate(
    { user: user.id, "items.product": productId },
    { $set: { "items.$.quantity": quantity } }
  );

  return NextResponse.json({ message: "Quantity updated" });
}
