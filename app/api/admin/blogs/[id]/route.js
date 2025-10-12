import { connectDB } from "@/lib/connect";
import Blog from "@/model/Blogs";
import { NextResponse } from "next/server";

// ✅ DELETE /api/blogs/:id
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = params;

    if (!id) {
      return Response.json(
        { success: false, message: "Blog ID is required" },
        { status: 400 }
      );
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return Response.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Blog deleted successfully",
        data: deletedBlog,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to delete blog",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  await connectDB();

  try {
    const { id } = params; // blog id from URL
    const body = await req.json();

    // 🔎 Destructure fields
    const { title, slug, excerpt, content, coverImage, type } = body;

    // 🔎 Validate required fields
    if (!title || !slug || !excerpt || !content || !coverImage || !type) {
      return NextResponse.json(
        { success: false, message: "All fields including type are required" },
        { status: 400 }
      );
    }

    // 🔎 Validate type
    const allowedTypes = ["News", "Blogs"];
    if (!allowedTypes.includes(type)) {
      return NextResponse.json(
        { success: false, message: "Invalid type. Allowed types: News or Blogs" },
        { status: 400 }
      );
    }

    // 🔎 Check for duplicate slug (if slug changed)
    const existingBlog = await Blog.findOne({ slug, _id: { $ne: id } });
    if (existingBlog) {
      return NextResponse.json(
        { success: false, message: "Slug already exists, choose another one" },
        { status: 409 }
      );
    }

    // ✅ Update blog
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, slug, excerpt, content, coverImage, type },
      {
        new: true, // return updated document
        runValidators: true,
      }
    );

    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    console.error("Edit Blog Error:", error);
    return NextResponse.json(
      { success: false, message: "Error updating blog", error: error.message },
      { status: 500 }
    );
  }
}


// ✅ GET /api/admin/blogs/:slug
export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const slug = id; // Assuming 'id' is actually the slug

    if (!slug) {
      return NextResponse.json(
        { success: false, message: "Blog slug is required" },
        { status: 400 }
      );
    }

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: blog }, { status: 200 });
  } catch (error) {
    console.error("Fetch Blog by Slug Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch blog", error: error.message },
      { status: 500 }
    );
  }
}
