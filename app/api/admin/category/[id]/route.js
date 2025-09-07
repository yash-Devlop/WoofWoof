import { connectDB } from "@/lib/connect";
import Category from "@/model/Category";

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const categoryId = params.id;

    const category = await Category.findById(categoryId);

    if (!category) {
      return Response.json(
        { message: "Category not found", status: 404 },
        { status: 404 }
      );
    }

    await Category.findByIdAndDelete(categoryId);

    return Response.json(
      { message: "Category deleted successfully", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete Category Error:", error);
    return Response.json(
      { message: "Internal Server Error", status: 500 },
      { status: 500 }
    );
  }
}
