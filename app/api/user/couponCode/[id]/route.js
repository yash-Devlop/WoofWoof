import { connectDB } from "@/lib/connect";
import Coupon from "@/model/Coupon";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  await connectDB();

  try {
    const { id } = context.params; // this will be the coupon code (e.g., "A-150")

    if (!id) {
      return NextResponse.json({ error: "Coupon code is required" }, { status: 400 });
    }

    // Find the coupon by its name (case-insensitive)
    const coupon = await Coupon.findOne({ name: id.trim().toUpperCase() }).lean();

    if (!coupon) {
      return NextResponse.json({ error: "Invalid coupon code" }, { status: 404 });
    }

    // Check if coupon is active
    if (!coupon.isActive) {
      return NextResponse.json({ error: "Coupon is inactive" }, { status: 400 });
    }

    // Check validity period
    const now = new Date();
    if (now < coupon.validFrom || now > coupon.validTill) {
      return NextResponse.json({ error: "Coupon is expired or not yet valid" }, { status: 400 });
    }

    // ✅ Coupon valid
    return NextResponse.json({
      message: "Coupon is valid",
      coupon,
    });

  } catch (error) {
    console.error("Coupon validation error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


export async function POST(req, context) {
  await connectDB();

  try {
    const { id } = context.params; // coupon code
    const { purchaseAmount } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Coupon code is required" }, { status: 400 });
    }

    if (typeof purchaseAmount !== "number" || purchaseAmount <= 0) {
      return NextResponse.json({ error: "Invalid purchase amount" }, { status: 400 });
    }

    // Find the coupon by code (case-insensitive)
    const coupon = await Coupon.findOne({ name: new RegExp(`^${id}$`, "i") });

    if (!coupon) {
      return NextResponse.json({ error: "Invalid coupon code" }, { status: 404 });
    }

    // Check active
    if (!coupon.isActive) {
      return NextResponse.json({ error: "Coupon is inactive" }, { status: 400 });
    }

    // Check date validity
    const now = new Date();
    if (now < coupon.validFrom || now > coupon.validTill) {
      return NextResponse.json({ error: "Coupon expired or not yet valid" }, { status: 400 });
    }

    // Check usage limit
    if (coupon.usageLimit <= 0) {
      return NextResponse.json({ error: "Coupon usage limit reached" }, { status: 400 });
    }

    // Check threshold amount
    if (purchaseAmount < coupon.thresholdAmount) {
      return NextResponse.json(
        { error: `Minimum purchase of ₹${coupon.thresholdAmount} required to apply this coupon` },
        { status: 400 }
      );
    }

    // ✅ All checks passed → decrement usageLimit by 1
    coupon.usageLimit -= 1;
    await coupon.save();

    return NextResponse.json({
      message: "Coupon applied successfully",
      usedCoupon: {
        code: coupon.name,
        discount: coupon.discount,
        thresholdAmount: coupon.thresholdAmount,
        remainingUsage: coupon.usageLimit,
      },
    });
  } catch (error) {
    console.error("Coupon apply error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}