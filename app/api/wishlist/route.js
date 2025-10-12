// /api/wishlist/route.js

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connect";
import User from "@/model/User";
import jwt from "jsonwebtoken";

// GET - Fetch user's wishlist
export async function GET(req) {
  await connectDB();

  try {
    // Get auth-token from cookies
    const token = req.cookies.get("auth-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized, token missing" }, { status: 401 });
    }

    // Verify token and get email
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userEmail = decoded.email;
    if (!userEmail) {
      return NextResponse.json({ error: "Invalid token payload" }, { status: 401 });
    }

    // Fetch user by email
    const user = await User.findOne({ email: userEmail }).select("wishlist");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      wishlist: user.wishlist || [],
    });
  } catch (error) {
    console.error("Wishlist fetch error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST - Toggle product in wishlist
export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json({ error: "ProductId is required" }, { status: 400 });
    }

    // Get auth-token from cookies
    const token = req.cookies.get("auth-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized, token missing" }, { status: 401 });
    }

    // Verify token and get email
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userEmail = decoded.email;
    if (!userEmail) {
      return NextResponse.json({ error: "Invalid token payload" }, { status: 401 });
    }

    // Fetch user by email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Initialize wishlist if missing
    if (!user.wishlist) user.wishlist = [];

    // Toggle product in wishlist
    const index = user.wishlist.findIndex((id) => id.toString() === productId);
    if (index === -1) {
      user.wishlist.push(productId);
    } else {
      user.wishlist.splice(index, 1);
    }

    await user.save();

    return NextResponse.json({
      message: index === -1 ? "Product added to wishlist" : "Product removed from wishlist",
      wishlist: user.wishlist,
      inWishlist: index === -1,
    });
  } catch (error) {
    console.error("Wishlist error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}