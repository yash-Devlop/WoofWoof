import { connectDB } from "@/lib/connect";
import Category from "@/model/Category";
import Products from "@/model/Products";

export async function POST(req) {
  await connectDB();
  const { name, price, categoryName, tags } = await req.json();

  try {
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return Response.json({
        message: "Invalid category.",
        status: 400,
        error: "Invalid category.",
      });
    }

    const product = await Products.create({
      name,
      price,
      Category: category._id,
      tags,
    });

    return Response.json({
      message: "Successfully created product",
      product,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      message: "Internal Server Error. Failed to create product.",
      status: 500,
    });
  }
}

export async function GET(req) {
  try {
    connectDB();

    const products = await Products.find();
    if (!products) {
      return Response.json({
        message: "No products found",
        status: 400,
      });
    }

    return Response.json({
      message: "Successfully fetched all the products.",
      status: 200,
      products,
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      message: "Internal Server Error. Failed to fetch products.",
      status: 500,
    });
  }
}
