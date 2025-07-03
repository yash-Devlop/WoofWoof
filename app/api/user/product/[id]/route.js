import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connect";
import Products from "@/model/Products";

export async function GET(req, { params }) {
  await connectDB();

  try {
    const { id } = params;

    const product = await Products.findById(id).populate("Category").lean();

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Product Fetch successfully!",
      status: 200,
      product,
    });
  } catch (error) {
    console.error("Product fetch error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
