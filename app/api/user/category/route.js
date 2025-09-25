import { connectDB } from "@/lib/connect";
import { NextResponse } from "next/server";
import Category from "@/model/Category";

export async function GET() {
  await connectDB();
  try {
    const categories = await Category.find({});
    return NextResponse.json(
      { categories, message: "Categories fetched successfully", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in fetching categories.", error);
    return NextResponse.json(
      {
        message: "Internal Server Error. Failed to fetch categories.",
        status: 500,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
