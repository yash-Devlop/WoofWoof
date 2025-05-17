import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { connectDB } from "@/lib/connect";
import Category from "@/model/Category";
import Products from "@/model/Products";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  console.log("Received POST request");
  await connectDB();

  const formData = await req.formData();
  const name = formData.get("name");
  const price = formData.get("price");
  const categoryName = formData.get("categoryName")?.trim();
  const tags = formData
    .get("tags")
    ?.split(",")
    .map((tag) => tag.trim());
  const files = formData.getAll("images");

  if (!name || !price || !categoryName || files.length === 0) {
    return NextResponse.json(
      { message: "All fields and at least one image are required." },
      { status: 400 }
    );
  }

  try {
    const category = await Category.findOne({
      name: { $regex: new RegExp(`^${categoryName.trim()}$`, "i") },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Invalid category name", status: 400 },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const savedImages = [];

    for (const file of files) {
      if (!file.type.startsWith("image/")) continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uniqueName = `${uuidv4()}-${file.name.replace(/\s+/g, "-")}`;
      const filePath = path.join(uploadDir, uniqueName);
      await writeFile(filePath, buffer);

      savedImages.push({
        url: `uploads/${uniqueName}`,
        altText: name,
      });
    }

    const product = await Products.create({
      name,
      price,
      Category: category._id,
      tags,
      images: savedImages,
    });

    return NextResponse.json({
      message: "Product created successfully",
      product,
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Server error", status: 500 },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();

    const products = await Products.find()
      .populate("Category", "name")
      .sort({ createdAt: -1 });
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

// export async function DELETE(req) {
//   await connectDB();
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");

//   if (!id) {
//     return Response.json({ message: "Product ID is required", status: 400 });
//   }

//   try {
//     const deletedProduct = await Products.findByIdAndDelete(id);
//     if (!deletedProduct) {
//       return Response.json({ message: "Product not found", status: 404 });
//     }

//     return Response.json({
//       message: "Product deleted successfully",
//       status: 200,
//       deletedProduct,
//     });
//   } catch (error) {
//     console.error("Error deleting product:", error);
//     return Response.json({ message: "Internal Server Error", status: 500 });
//   }
// }

export async function DELETE(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({
      message: "Product ID is required",
      status: 400,
    });
  }

  try {
    const product = await Products.findById(id);
    if (!product) {
      return NextResponse.json({ message: "Product not found", status: 404 });
    }

    // Delete all associated image files
    for (const image of product.images) {
      const imagePath = path.resolve("public", image.url);
      try {
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath); // Or: await fs.promises.unlink(imagePath)
        }
      } catch (fileErr) {
        console.error(`Error deleting image at ${imagePath}:`, fileErr);
      }
    }

    await Products.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Product deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        message: "Product ID is required.",
        status: 400,
      });
    }
    const body = await req.json();
    const { name, price, tags, categoryName } = body;

    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return NextResponse.json({
        message: "Category not found.",
        status: 400,
      });
    }

    const updatedProduct = await Products.findByIdAndUpdate(
      id,
      {
        name,
        price,
        tags,
        Category: category._id,
      },
      { new: true }
    ).populate("Category", "name");
    console.log("kjdhckj", id);

    if (!updatedProduct) {
      return NextResponse.json({
        message: "Product not found or failed to update.",
        status: 400,
      });
    }

    return NextResponse.json({
      message: "Product updated successfully.",
      status: 200,
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update Product Error:", error);
    return NextResponse.json({
      message: "Internal Server Error. Failed to update product.",
      status: 500,
    });
  }
}
