// /api/orders/create
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connect";
import Order from "@/model/Order";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    console.error("❌ JWT verification failed:", error.message);
    return null;
  }
};

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    let {
      userId,
      customerInfo,
      items,
      subtotal,
      shipping,
      tax,
      discount,
      amount,
      paymentId,
      paymentMethod,
      couponCode,
      shippingAddress,
      isPaymentVerified,
      status,
    } = body;

    // ✅ Read token from cookies
    const cookieHeader = req.headers.get("cookie") || "";
    const match = cookieHeader.match(/auth-token=([^;]+)/);
    const token = match ? match[1] : null;

    let user = userId || null;
    let isVerifiedUser = false;

    // ✅ If token exists, verify and enhance user info
    if (token) {
      const payload = verifyToken(token);
      if (payload) {
        user = payload.id || user;
        isVerifiedUser = true;
        
        // ✅ Enhance customerInfo with token data for authenticated users
        if (!customerInfo || !customerInfo.email) {
          customerInfo = {
            name: payload.name || payload.username || customerInfo?.name || "",
            email: payload.email || customerInfo?.email || "",
            phone: customerInfo?.phone || "",
          };
        }
      }
    }

    // ✅ Validation: Customer Info
    if (!customerInfo || !customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      console.error("❌ Validation failed: Missing customer info", customerInfo);
      return NextResponse.json(
        { 
          message: "Customer info (name, email, phone) is required", 
          status: 400,
          received: customerInfo 
        },
        { status: 400 }
      );
    }

    // ✅ Validation: Items
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error("❌ Validation failed: No items in order");
      return NextResponse.json(
        { message: "At least one item is required in order", status: 400 },
        { status: 400 }
      );
    }

    // ✅ Validation: Amount
    if (!amount || amount <= 0) {
      console.error("❌ Validation failed: Invalid amount", amount);
      return NextResponse.json(
        { message: "Valid total amount is required", status: 400 },
        { status: 400 }
      );
    }

    // ✅ Validation: Shipping Address (relaxed - only check for object existence)
    if (!shippingAddress || typeof shippingAddress !== 'object') {
      console.error("❌ Validation failed: Missing shipping address");
      return NextResponse.json(
        { message: "Shipping address is required", status: 400 },
        { status: 400 }
      );
    }

    // ✅ Validate items structure
    const validatedItems = items.map(item => {
      if (!item.productId || !item.quantity || !item.price) {
        throw new Error("Invalid item structure: productId, quantity, and price are required");
      }
      return {
        productId: item.productId,
        name: item.name || "",
        image: item.image || null,
        size: item.size || null,
        color: item.color || { code: null, name: null },
        quantity: item.quantity,
        price: item.price,
      };
    });

    // ✅ Prepare order data matching the schema
    const orderData = {
      user: user || null,
      customerInfo: {
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone,
      },
      items: validatedItems,
      subtotal: parseFloat(subtotal) || parseFloat(amount),
      shipping: parseFloat(shipping) || 0,
      tax: parseFloat(tax) || 0,
      discount: parseFloat(discount) || 0,
      amount: parseFloat(amount),
      paymentId: paymentId || null,
      paymentMethod: paymentMethod || "COD",
      couponCode: couponCode || null,
      shippingAddress: {
        name: shippingAddress.name || customerInfo.name,
        phone: shippingAddress.phone || customerInfo.phone,
        addressLine1: shippingAddress.addressLine1 || "",
        addressLine2: shippingAddress.addressLine2 || "",
        city: shippingAddress.city || "",
        state: shippingAddress.state || "",
        country: shippingAddress.country || "India",
        postalCode: shippingAddress.postalCode || "",
      },
      isVerifiedUser,
      isPaymentVerified: !!isPaymentVerified,
      status: status || "Pending",
    };

    console.log("📦 Creating order with validated data:", {
      user: orderData.user,
      isVerifiedUser: orderData.isVerifiedUser,
      customerName: orderData.customerInfo.name,
      customerEmail: orderData.customerInfo.email,
      customerPhone: orderData.customerInfo.phone,
      itemCount: orderData.items.length,
      amount: orderData.amount,
      paymentMethod: orderData.paymentMethod,
      shippingCity: orderData.shippingAddress.city,
    });

    // ✅ Create order
    const newOrder = await Order.create(orderData);

    console.log("✅ Order created successfully:", {
      orderId: newOrder._id,
      orderNumber: newOrder.orderNumber,
      amount: newOrder.amount,
    });

    return NextResponse.json(
      {
        message: "Order placed successfully",
        status: 201,
        order: newOrder,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error creating order:", error);
    return NextResponse.json(
      { 
        message: "Failed to place order", 
        status: 500, 
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}