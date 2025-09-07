import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connect";
import Review from "@/model/Review";
import Product from "@/model/Product";
import User from "@/model/User";

export async function GET(req) {
  console.log("GET /api/admin/reviews called", req);
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const productName = searchParams.get("productName") || "";
    const userName = searchParams.get("userName") || "";

    // Build filters
    const productFilter = productName
      ? { name: { $regex: productName, $options: "i" } }
      : {};
    const userFilter = userName
      ? { username: { $regex: userName, $options: "i" } }
      : {};

    // Find products and users that match
    const products = await Product.find(productFilter).select("_id");
    const users = await User.find(userFilter).select("_id");

    const productIds = products.map((p) => p._id);
    const userIds = users.map((u) => u._id);

    // Query reviews
    const reviews = await Review.find({
      product: { $in: productIds.length ? productIds : [] },
      user: { $in: userIds.length ? userIds : [] },
    })
      .populate("product", "name")
      .populate("user", "username email")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      message: "Reviews fetched successfully",
      reviews,
    });
  } catch (error) {
    console.error("Reviews GET Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const reviewId = searchParams.get("id");

    if (!reviewId) {
      return NextResponse.json(
        { error: "Review ID is required" },
        { status: 400 }
      );
    }

    await Review.findByIdAndDelete(reviewId);

    return NextResponse.json({
      message: "Review deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.error("DELETE review error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
