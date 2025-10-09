import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connect";
import Coupon from "@/model/Coupon"

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      name,
      discount,
      thresholdAmount,
      usageLimit,
      validFrom,
      validTill,
      isActive = true,
    } = body;

    if (!name || discount == null || !thresholdAmount || !usageLimit || !validFrom || !validTill) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (discount < 0 || discount > 100) {
      return NextResponse.json(
        { error: "Discount must be between 0 and 100" },
        { status: 400 }
      );
    }

    const newCoupon = new Coupon({
      name,
      discount,
      thresholdAmount,
      usageLimit,
      validFrom: new Date(validFrom),
      validTill: new Date(validTill),
      isActive,
    });

    await newCoupon.save();

    return NextResponse.json({
      message: "Coupon created successfully",
      coupon: newCoupon,
    });
  } catch (error) {
    console.error("POST /api/admin/coupons Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const coupons = await Coupon.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({
      message: "Coupons fetched successfully",
      coupons,
    });
  } catch (error) {
    console.error("GET /api/admin/coupons Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


export async function PATCH(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Coupon ID is required" },
        { status: 400 }
      );
    }

    if (updates.discount && (updates.discount < 0 || updates.discount > 100)) {
      return NextResponse.json(
        { error: "Discount must be between 0 and 100" },
        { status: 400 }
      );
    }

    if (updates.validFrom) updates.validFrom = new Date(updates.validFrom);
    if (updates.validTill) updates.validTill = new Date(updates.validTill);

    const updatedCoupon = await Coupon.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedCoupon) {
      return NextResponse.json(
        { error: "Coupon not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Coupon updated successfully",
      coupon: updatedCoupon,
    });
  } catch (error) {
    console.error("PATCH /api/admin/coupons Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Coupon ID is required" },
        { status: 400 }
      );
    }

    const deletedCoupon = await Coupon.findByIdAndDelete(id);

    if (!deletedCoupon) {
      return NextResponse.json(
        { error: "Coupon not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Coupon deleted successfully",
      coupon: deletedCoupon,
    });
  } catch (error) {
    console.error("DELETE /api/admin/coupons Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
