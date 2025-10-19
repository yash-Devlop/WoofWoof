// app/api/user/address/route.js
import { NextResponse } from "next/server";
import User from "@/model/User";
import { connectDB } from "@/lib/connect";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

// POST - Add new address
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);

    const user = await User.findOne({ _id: decoded.id });
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const address = {
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

    // If this address is set as default, unset all others
    if (address.isDefault && user.deliveryAddresses?.length > 0) {
      await User.updateOne(
        { _id: user._id },
        {
          $set: { "deliveryAddresses.$[].isDefault": false },
        }
      );
    }

    // If this is the first address, make it default
    if (!user.deliveryAddresses || user.deliveryAddresses.length === 0) {
      address.isDefault = true;
    }

    // Push the new address
    await User.updateOne(
      { _id: user._id },
      {
        $push: { deliveryAddresses: address },
      }
    );

    // Fetch the latest user data to get the newly added address
    const updatedUser = await User.findById(user._id).select(
      "deliveryAddresses"
    );
    const newAddress = updatedUser.deliveryAddresses.at(-1);

    return NextResponse.json({
      success: true,
      message: "Address saved",
      newAddress,
    });
  } catch (error) {
    console.error("Add address error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// GET - Fetch all addresses
export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token");

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token.value);
    const user = await User.findById(decoded.id).select("deliveryAddresses");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { addresses: user.deliveryAddresses || [] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch address error:", error);
    return NextResponse.json(
      { message: "Failed to fetch addresses", error: error.message },
      { status: 500 }
    );
  }
}