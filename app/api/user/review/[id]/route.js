import { connectDB } from "@/lib/connect";
import Review from "@/model/Review";
import User from "@/model/User";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function GET(req, { params }) {
  await connectDB();
  try {
    const { id } = params;

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 4;
    const skip = (page - 1) * limit;

    const totalReviews = await Review.countDocuments({ product: id });
    const reviews = await Review.find({ product: id })
      .populate("user", "username email -_id")
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json(
      {
        message: "Reviews fetched successfully",
        reviews,
        pagination: {
          total: totalReviews,
          page,
          limit,
          pages: Math.ceil(totalReviews / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reviews GET Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
