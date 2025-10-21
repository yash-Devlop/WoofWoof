import { connectDB } from "@/lib/connect";
import Blog from "@/model/Blogs";

// ✅ GET /api/blogs → fetch all blogs
export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find().sort({ createdAt: -1 });

    return Response.json(
      { success: true, count: blogs.length, data: blogs },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to fetch blogs",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// ✅ POST /api/blogs → create new blog
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // 🔎 Extract fields
    const { title, slug, excerpt, content, coverImage, innerImage, type } = body;

    // 🔎 Validate required fields
    if (!title || !slug || !excerpt || !content || !coverImage || !innerImage || !type) {
      return Response.json(
        { success: false, message: "All fields including both images and type are required" },
        { status: 400 }
      );
    }

    const allowedTypes = ["News", "Blogs"];
    if (!allowedTypes.includes(type)) {
      return Response.json(
        { success: false, message: "Invalid type. Allowed types: News or Blogs" },
        { status: 400 }
      );
    }

    const exists = await Blog.findOne({ slug });
    if (exists) {
      return Response.json(
        { success: false, message: "Slug already exists, choose another one" },
        { status: 409 }
      );
    }

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      coverImage,
      innerImage,
      type,
    });

    return Response.json(
      { success: true, message: "Blog created successfully", data: blog },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to create blog",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
