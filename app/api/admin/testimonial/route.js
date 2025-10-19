// /api/admin/testimonial/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connect";
import Testimonial from "@/model/Testimonial";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const { name, role, message, image, stars, isActive = true } = body;

    if (!name || !role || !message || !image || stars == null) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (stars < 1 || stars > 5) {
      return NextResponse.json(
        { error: "Stars must be between 1 and 5" },
        { status: 400 }
      );
    }

    const newTestimonial = new Testimonial({
      name,
      role,
      message,
      image,
      stars,
      isActive,
    });

    await newTestimonial.save();

    return NextResponse.json({
      message: "Testimonial created successfully",
      testimonial: newTestimonial,
    });
  } catch (error) {
    console.error("POST /api/admin/testimonial Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all");

    // If all=true, fetch all testimonials (for admin), otherwise only active ones
    const query = all === "true" ? {} : { isActive: true };
    const testimonials = await Testimonial.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      message: "Testimonials fetched successfully",
      testimonials,
    });
  } catch (error) {
    console.error("GET /api/admin/testimonial Error:", error);
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
        { error: "Testimonial ID is required" },
        { status: 400 }
      );
    }

    if (updates.stars && (updates.stars < 1 || updates.stars > 5)) {
      return NextResponse.json(
        { error: "Stars must be between 1 and 5" },
        { status: 400 }
      );
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTestimonial) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Testimonial updated successfully",
      testimonial: updatedTestimonial,
    });
  } catch (error) {
    console.error("PATCH /api/admin/testimonial Error:", error);
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
        { error: "Testimonial ID is required" },
        { status: 400 }
      );
    }

    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Testimonial deleted successfully",
      testimonial: deletedTestimonial,
    });
  } catch (error) {
    console.error("DELETE /api/admin/testimonial Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}