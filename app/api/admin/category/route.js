import { connectDB } from "@/lib/connect";
import Category from "@/model/Category";

export async function POST(req) {
  const { name } = await req.json();
  await connectDB();

  try {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return Response.json(
        {
          message: "Category already exists.",
        },
        {
          status: 400,
        }
      );
    }

    const category = await Category.create({ name });
    return Response.json({
      message: "New category created successfully.",
      category,
      status: 200,
    });
  } catch (error) {
    console.error("Error in creating category.", error);
    return Response.json({
      message: "Internal Server Error. Failed to create category.",
      status: 500,
      error: error.message,
    });
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const categories = await Category.find();
    return Response.json({
      categories,
      message: "Successfully fetched all categories.",
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      message: "Internal Server Error. Failed to fetch categories.",
      status: 500,
    });
  }
}
