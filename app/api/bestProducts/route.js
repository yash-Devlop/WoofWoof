import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connect";
import Products from "@/model/Product";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const products = await Products.find({ isBestSelling: true })
    
    return NextResponse.json({
      message: "Best-selling products fetched successfully",
      count: products.length,
      products,
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching best-selling products:", error);
    return NextResponse.json(
      { message: "Failed to fetch best-selling products", status: 500 },
      { status: 500 }
    );
  }
}

