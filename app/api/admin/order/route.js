import { connectDB } from "@/lib/connect";
import Order from "@/model/Order";
import User from "@/model/User"; // Optional if not already used elsewhere
import Products from "@/model/Products";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find()
      .populate({
        path: "user",
        select: "username email phone", // ✅ adjust according to your User schema
      })
      .populate({
        path: "items.productId",
        select: "name price images",
      })
      .sort({ createdAt: -1 });

    return NextResponse.json({
      message: "Orders fetched successfully",
      allOrders: orders,
      status: 200,
    });
  } catch (error) {
    console.error("Fetch orders error:", error);
    return NextResponse.json(
      { message: "Internal server error", status: 500 },
      { status: 500 }
    );
  }
}
