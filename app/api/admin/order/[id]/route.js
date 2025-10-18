// src/app/api/admin/order/[id]/route.js
import { connectDB } from "@/lib/connect";
import Order from "@/model/Order";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params; // Changed from orderId to id
    const body = await request.json();
    const { status } = body;

    // Validate id
    if (!id) {
      return NextResponse.json(
        { message: "Order ID is required", status: 400 },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
    if (!status) {
      return NextResponse.json(
        { message: "Status is required", status: 400 },
        { status: 400 }
      );
    }

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`, status: 400 },
        { status: 400 }
      );
    }

    // Find and update the order
    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )
      .populate({
        path: "user",
        select: "username email phone",
      })
      .populate({
        path: "items.productId",
        select: "name price images",
      });

    // Check if order exists
    if (!order) {
      return NextResponse.json(
        { message: "Order not found", status: 404 },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Order status updated successfully",
      order,
      status: 200,
    });
  } catch (error) {
    console.error("Update order status error:", error);
    
    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { message: error.message, status: 400 },
        { status: 400 }
      );
    }

    // Handle invalid ObjectId
    if (error.name === "CastError") {
      return NextResponse.json(
        { message: "Invalid order ID format", status: 400 },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error", status: 500 },
      { status: 500 }
    );
  }
}