import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connect";
import User from "@/model/User";

export async function GET() {
  await connectDB();
  try {
    const users = await User.find({ role: "user" }).select(
      "username email phone"
    );
    return NextResponse.json({
      status: 200,
      message: "Successfully fetched all users.",
      users,
    });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      status: 200,
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error("DELETE Error:", err);
    return NextResponse.json(
      { message: "Failed to delete user" },
      { status: 500 }
    );
  }
}
