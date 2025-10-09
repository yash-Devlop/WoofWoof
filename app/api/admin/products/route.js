import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { connectDB } from "@/lib/connect";
import Category from "@/model/Category";
import Products from "@/model/Product";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  await connectDB();

  const formData = await req.formData();

  const name = formData.get("name");
  const price = Number(formData.get("price"));
  const markedPrice = Number(formData.get("markedPrice"));
  const rating = Number(formData.get("rating"));
  const categoryName = formData.get("categoryName")?.trim();
  const tags = formData
    .get("tags")
    ?.split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  const description = {
    coreInstruction: formData.get("description.coreInstruction") || "",
    detailedInfo: formData.get("description.detailedInfo") || "",
    additionalDetails: formData.get("description.additionalDetails") || "",
  };

  const files = formData.getAll("images");

  // Parse colors
  const colors = [];
  for (let key of formData.keys()) {
    if (key.startsWith("colors")) {
      const match = key.match(/colors\[(\d+)\]\[(name|code)\]/);
      if (match) {
        const index = parseInt(match[1]);
        const field = match[2];
        if (!colors[index]) colors[index] = {};
        colors[index][field] = formData.get(key);
      }
    }
  }
  const finalColors = colors.filter((c) => c.name && c.code);

  // ✅ Properly parse sizes
  // Support both comma-separated string or multiple `sizes[]` fields
  const sizes = [];
  for (const key of formData.keys()) {
    if (key === "sizes" || key === "sizes[]") {
      const val = formData.getAll(key);
      val.forEach((s) => {
        try {
          // If the value is a stringified array like '["S"]', parse it
          const parsed = JSON.parse(s);
          if (Array.isArray(parsed)) parsed.forEach((x) => sizes.push(x));
          else sizes.push(s);
        } catch {
          sizes.push(s);
        }
      });
    }
  }
  const finalSizes = [...new Set(sizes.map((s) => s.trim()).filter(Boolean))]; // remove duplicates & empty

  // Validate required fields
  if (!name || !price || !markedPrice || isNaN(rating) || !categoryName || files.length === 0) {
    return NextResponse.json(
      { message: "All fields and at least one image are required." },
      { status: 400 }
    );
  }

  if (rating < 0 || rating > 5) {
    return NextResponse.json(
      { message: "Rating must be between 0 and 5." },
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

    // Handle image uploads
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const savedImages = [];
    for (const file of files) {
      if (!file.type.startsWith("image/")) continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uniqueName = `${uuidv4()}-${file.name.replace(/\s+/g, "-")}`;
      const filePath = path.join(uploadDir, uniqueName);
      await writeFile(filePath, buffer);

      savedImages.push({
        url: `/uploads/${uniqueName}`,
        altText: name,
      });
    }

    const product = await Products.create({
      name,
      price,
      markedPrice,
      rating,
      Category: category._id,
      tags,
      images: savedImages,
      description,
      colors: finalColors.length > 0 ? finalColors : undefined,
      sizes: finalSizes.length > 0 ? finalSizes : undefined,
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
      return NextResponse.json({ message: "Product ID is required.", status: 400 });
    }

    const contentType = req.headers.get("content-type");
    let updateData = {};
    let files = [];

    if (contentType?.includes("application/json")) {
      const body = await req.json();
      updateData = { ...body };

      if (body.sizes) {
        updateData.sizes = Array.isArray(body.sizes) ? body.sizes : JSON.parse(body.sizes || "[]");
      }

      if (body.inStock !== undefined) {
        updateData.inStock = body.inStock === true || body.inStock === "true";
      }

      // Ensure isBestSelling logic
      if (body.isBestSelling === true) {
        const bestSellingCount = await Products.countDocuments({ isBestSelling: true });
        const currentProduct = await Products.findById(id);
        const alreadyBestSelling = currentProduct?.isBestSelling;

        if (!alreadyBestSelling && bestSellingCount >= 8) {
          return NextResponse.json({
            message: "Cannot mark as Best Selling. Maximum of 8 products allowed.",
            status: 400,
          });
        }
      }
    } else if (contentType?.includes("multipart/form-data")) {
      const formData = await req.formData();

      updateData.name = formData.get("name");
      updateData.price = Number(formData.get("price"));
      updateData.markedPrice = Number(formData.get("markedPrice"));
      updateData.rating = Number(formData.get("rating"));
      updateData.inStock = formData.get("inStock") === "true";
      updateData.tags = formData.get("tags")?.split(",").map((t) => t.trim()).filter(Boolean) || [];
      updateData.description = {
        coreInstruction: formData.get("description.coreInstruction") || "",
        detailedInfo: formData.get("description.detailedInfo") || "",
        additionalDetails: formData.get("description.additionalDetails") || "",
      };

      const categoryName = formData.get("categoryName");
      if (categoryName) {
        const category = await Category.findOne({ name: { $regex: new RegExp(`^${categoryName.trim()}$`, "i") } });
        if (!category) {
          return NextResponse.json({ message: "Category not found.", status: 400 });
        }
        updateData.Category = category._id;
      }

      // Sizes
      const sizes = [];
      for (const key of formData.keys()) {
        if (key === "sizes" || key === "sizes[]") {
          formData.getAll(key).forEach((s) => {
            try {
              const parsed = JSON.parse(s);
              if (Array.isArray(parsed)) parsed.forEach((x) => sizes.push(x));
              else sizes.push(s);
            } catch {
              sizes.push(s);
            }
          });
        }
      }
      updateData.sizes = [...new Set(sizes.map((s) => s.trim()).filter(Boolean))];

      // Images
      files = formData.getAll("images");
      if (files.length > 0) {
        const imageUrls = [];
        const uploadDir = path.join(process.cwd(), "public/uploads");
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

        for (const file of files) {
          if (!file.type.startsWith("image/")) continue;
          const buffer = Buffer.from(await file.arrayBuffer());
          const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "-")}`;
          const filePath = path.join(uploadDir, fileName);
          await writeFile(filePath, buffer);
          imageUrls.push({ url: `/uploads/${fileName}`, altText: file.name || "Product Image" });
        }
        updateData.images = imageUrls;
      }

      // Colors
      const colors = [];
      for (let key of formData.keys()) {
        const match = key.match(/colors\[(\d+)\]\[(name|code)\]/);
        if (match) {
          const index = parseInt(match[1]);
          const field = match[2];
          if (!colors[index]) colors[index] = {};
          colors[index][field] = formData.get(key);
        }
      }
      const finalColors = colors.filter((c) => c.name && c.code);
      if (finalColors.length > 0) updateData.colors = finalColors;

      // Check isBestSelling toggle
      const isBestSelling = formData.get("isBestSelling") === "true";
      if (isBestSelling) {
        const bestSellingCount = await Products.countDocuments({ isBestSelling: true });
        const currentProduct = await Products.findById(id);
        const alreadyBestSelling = currentProduct?.isBestSelling;

        if (!alreadyBestSelling && bestSellingCount >= 8) {
          return NextResponse.json({
            message: "Cannot mark as Best Selling. Maximum of 8 products allowed.",
            status: 400,
          });
        }
      }
      updateData.isBestSelling = isBestSelling;
    }

    const updatedProduct = await Products.findByIdAndUpdate(id, updateData, { new: true }).populate("Category", "name");

    if (!updatedProduct) {
      return NextResponse.json({ message: "Product not found.", status: 404 });
    }

    return NextResponse.json({
      message: "Product updated successfully",
      product: updatedProduct,
      status: 200,
    });
  } catch (error) {
    console.error("Update Product Error:", error);
    return NextResponse.json({
      message: "Internal Server Error. Failed to update product.",
      status: 500,
    });
  }
}
