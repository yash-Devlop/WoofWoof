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

    // 🔎 Validation
    const { title, slug, excerpt, content, coverImage } = body;
    if (!title || !slug || !excerpt || !content || !coverImage) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // 🔎 Check duplicate slug
    const exists = await Blog.findOne({ slug });
    if (exists) {
      return Response.json(
        { success: false, message: "Slug already exists, choose another one" },
        { status: 409 }
      );
    }

    // Create blog
    const blog = await Blog.create(body);

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
