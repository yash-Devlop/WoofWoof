import { connectDB } from "@/lib/connect";
import Category from "@/model/Category";
import Product from "@/model/Product";

export async function POST(req) {
  const { name, coverImage } = await req.json();
  console.log("Received category data:", { name, coverImage });
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

    const category = await Category.create({ name, image: coverImage });
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

    const categories = await Category.aggregate([
      {
        $lookup: {
          from: "products", // MongoDB collection name, usually lowercase plural
          localField: "_id",
          foreignField: "Category", // Matches your schema field
          as: "products",
        },
      },
      {
        $addFields: {
          productCount: { $size: "$products" },
        },
      },
      {
        $project: {
          name: 1,
          productCount: 1,
        },
      },
      {
        $sort: { name: 1 },
      },
    ]);

    return Response.json({
      categories,
      message: "Categories with product counts fetched successfully.",
      status: 200,
    });
  } catch (error) {
    console.error("Fetch categories with count error:", error);
    return Response.json(
      {
        message: "Internal Server Error",
        status: 500,
      },
      { status: 500 }
    );
  }
}
