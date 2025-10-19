// app/api/user/address/[addressId]/route.js
import { NextResponse } from "next/server";
import User from "@/model/User";
import { connectDB } from "@/lib/connect";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

// PUT - Update existing address
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { addressId } = params;
    const body = await req.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Find the address index
    const addressIndex = parseInt(addressId);
    
    if (
      isNaN(addressIndex) ||
      addressIndex < 0 ||
      addressIndex >= user.deliveryAddresses.length
    ) {
      return NextResponse.json(
        { message: "Invalid address ID" },
        { status: 400 }
      );
    }

    // If setting as default, unset all others first
    if (body.isDefault) {
      user.deliveryAddresses.forEach((addr, idx) => {
        if (idx !== addressIndex) {
          addr.isDefault = false;
        }
      });
    }

    // Update the address
    user.deliveryAddresses[addressIndex] = {
      firstName: body.firstName,
      lastName: body.lastName,
      address: body.address,
      city: body.city,
      state: body.state,
      pincode: body.pincode,
      contact: body.contact,
      label: body.label || "Home",
      isDefault: body.isDefault || false,
    };

    await user.save();

    return NextResponse.json({
      success: true,
      message: "Address updated successfully",
      updatedAddress: user.deliveryAddresses[addressIndex],
    });
  } catch (error) {
    console.error("Update address error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Remove address
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { addressId } = params;

    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const addressIndex = parseInt(addressId);
    
    if (
      isNaN(addressIndex) ||
      addressIndex < 0 ||
      addressIndex >= user.deliveryAddresses.length
    ) {
      return NextResponse.json(
        { message: "Invalid address ID" },
        { status: 400 }
      );
    }

    const wasDefault = user.deliveryAddresses[addressIndex].isDefault;

    // Remove the address
    user.deliveryAddresses.splice(addressIndex, 1);

    // If deleted address was default and there are remaining addresses,
    // make the first one default
    if (wasDefault && user.deliveryAddresses.length > 0) {
      user.deliveryAddresses[0].isDefault = true;
    }

    await user.save();

    return NextResponse.json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error("Delete address error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}