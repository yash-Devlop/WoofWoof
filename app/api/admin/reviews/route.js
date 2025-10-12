import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connect";
import Review from "@/model/Review";
import Product from "@/model/Product";
import User from "@/model/User";
import jwt from "jsonwebtoken";

export async function GET(req) {
  console.log("GET /api/admin/reviews called", req);
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const productName = searchParams.get("productName") || "";
    const userName = searchParams.get("userName") || "";

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

export async function POST(req) {
  await connectDB();
  try {
    const token = req.cookies.get("auth-token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized, please login" },
        { status: 401 }
      );
    }

    // Verify token and get email
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.log(err)
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const userEmail = decoded.email;
    if (!userEmail) {
      return NextResponse.json(
        { error: "Invalid token payload" },
        { status: 401 }
      );
    }

    // Get data from request body
    const { productId, rating, comment } = await req.json();

    // Validate fields
    if (!productId || !rating) {
      return NextResponse.json(
        { error: "Missing required fields (productId, rating)" },
        { status: 400 }
      );
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Find user by email from token
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      user: user._id,
      product: productId,
    });

    if (existingReview) {
      return NextResponse.json(
        { error: "You have already reviewed this product" },
        { status: 400 }
      );
    }

    // Create new review
    const newReview = await Review.create({
      user: user._id,
      product: productId,
      rating,
      comment: comment || "",
    });

    // Push review into product
    await Product.findByIdAndUpdate(productId, {
      $push: { reviews: newReview._id },
    });

    // Populate user info in response
    const populatedReview = await Review.findById(newReview._id)
      .populate("user", "username email")
      .populate("product", "name");

    return NextResponse.json({
      message: "Review added successfully",
      review: populatedReview,
    });
  } catch (error) {
    console.error("POST review error:", error);
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
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
