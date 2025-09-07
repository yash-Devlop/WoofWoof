import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connect";
import Products from "@/model/Product";
import Category from "@/model/Category";

export async function GET(req) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category")?.trim().toLowerCase() || "";
    const minPrice = searchParams.get("minPrice") || 0;
    const maxPrice = searchParams.get("maxPrice") || 10000;
    const tags = searchParams.get("tags") || "";
    const sortType = searchParams.get("sortType") || "price";
    const sortOrder = searchParams.get("sortOrder") || "asc";
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    const query = {
      price: { $gte: Number(minPrice), $lte: Number(maxPrice) },
    };

    if (category) {
      const foundCategory = await Category.findOne({ name: category });
      if (foundCategory) {
        query.Category = foundCategory._id;
      } else {
        return NextResponse.json({
          products: [],
          total: 0,
          currentPage: page,
          totalPages: 0,
        });
      }
    }
    if (tags) query.tags = { $in: tags.split(",") };

    const sortOptions = {};
    if (sortType === "price") sortOptions.price = sortOrder === "asc" ? 1 : -1;
    else if (sortType === "popularity")
      sortOptions.popularity = sortOrder === "asc" ? 1 : -1;
    else if (sortType === "latest")
      sortOptions.createdAt = sortOrder === "asc" ? 1 : -1;

    const products = await Products.find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await Products.countDocuments(query);

    return NextResponse.json({
      products,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Product fetch error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
