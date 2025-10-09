import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connect";
import Product from "@/model/Product";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json({ message: "Product ID required" }, { status: 400 });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    const similarProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    })
      .sort({ createdAt: -1 })
      .limit(8);

    return NextResponse.json(similarProducts, { status: 200 });
  } catch (error) {
    console.error("Error fetching similar products:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
