// /app/api/user/address/route.js
import { NextResponse } from "next/server";
import User from "@/model/User";
import { connectDB } from "@/lib/connect";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

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
      label: "Home",
      isDefault: true,
    };

    // Unset previous default if any addresses exist
    if (user.deliveryAddresses?.length > 0) {
      await User.updateOne(
        { _id: user._id, "deliveryAddresses.isDefault": true },
        {
          $set: { "deliveryAddresses.$.isDefault": false },
        }
      );
    }

    // Push the new address
    await User.updateOne(
      { _id: user._id },
      {
        $push: { deliveryAddresses: address },
      }
    );

    return NextResponse.json({ success: true, message: "Address saved" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
