
"use client";
import Button from "@mui/material/Button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Shield, Check, Truck, CreditCard, Tag, X } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { motion } from "framer-motion";
import useRazorpayLoader from "@/hooks/useRazorpayLoader";

const PaymentPage = ({ onBack, onOrderComplete, guestAddress }) => {
  const isRazorpayLoaded = useRazorpayLoader();
  const [selectedPayment, setSelectedPayment] = useState("razorpay");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const items = useSelector((state) => state.userCart?.cart?.items || []);
  const user = useSelector((state) => state.user?.user);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const shippingAddress = useSelector((state) => state.checkout?.shippingAddress);

  const formattedItems = items.map((item) => ({
    productId: item.product._id,
    name: item.product.name,
    image: item.product?.images?.[0].url || null,
    quantity: item.quantity,
    price: item.product.price,
    size: item.size || null,
    color: item.color || { code: null, name: null },
  }));

  useEffect(() => {
    console.log("shipping address", shippingAddress);

  }, [shippingAddress])

  const subtotal = items.reduce(
    (sum, item) => sum + (item?.product?.price || 0) * item.quantity,
    0
  );
  const shipping = selectedPayment === "cod" ? 49 : 0;
  const tax = 0;
  const discount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
  const total = subtotal + shipping + tax - discount;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }
    setIsApplyingCoupon(true);
    setCouponError("");

    try {
      const { data } = await axios.get(`/api/user/couponCode/${couponCode.trim().toUpperCase()}`);
      if (data.coupon) {
        if (subtotal < data.coupon.thresholdAmount) {
          setCouponError(`Minimum purchase of ₹${data.coupon.thresholdAmount} required`);
        } else {
          const discountAmount = (subtotal * data.coupon.discount) / 100;
          setAppliedCoupon({
            code: data.coupon.name,
            discount: data.coupon.discount,
            discountAmount,
            thresholdAmount: data.coupon.thresholdAmount,
            couponId: data.coupon._id,
          });
          setCouponCode("");
        }
      }
    } catch (err) {
      setCouponError(err.response?.data?.error || "Invalid or expired coupon");
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  const sendConfirmationEmail = async (order) => {
    if (!order.customerInfo?.email) {
      console.warn("⚠️ No email address, skipping confirmation email");
      return;
    }

    try {
      await axios.post("/api/email/send-order-confirmation", {
        orderId: order._id,
        orderNumber: order.orderNumber || `ORD-${order._id.slice(-8).toUpperCase()}`,
        customerName: order.customerInfo.name,
        customerEmail: order.customerInfo.email,
        items: order.items,
        amount: order.amount,
        subtotal: order.subtotal,
        shipping: order.shipping,
        tax: order.tax,
        discount: order.discount,
        paymentMethod: order.paymentMethod,
        paymentId: order.paymentId,
        shippingAddress: order.shippingAddress,
        status: order.status,
      });
      console.log("✅ Confirmation emails sent successfully");
    } catch (err) {
      console.error("⚠️ Failed to send confirmation emails:", err);
    }
  };

  const createOrderInDB = async (paymentMethod, paymentId, isPaymentVerified) => {
    // ✅ Use guestAddress as primary source (set for both auth and guest users)
    const addressSource = guestAddress || shippingAddress;
    if (!addressSource) {
      alert("⚠️ No shipping address found. Please go back and enter your delivery address.");
      throw new Error("No shipping address provided.");
    }

    // ✅ Extract customer info
    const customerName = `${addressSource.firstName || ''} ${addressSource.lastName || ''}`.trim() ||
      addressSource.name ||
      user?.username ||
      user?.name ||
      '';

    let customerEmail = null
    if (!isAuthenticated) {
      customerEmail = addressSource.email || user?.email || '';
    } else {
      const resEmail = await axios.get("/api/email/getUserEmail", {
        withCredentials: true,
      });

      const { email } = resEmail.data;
      customerEmail = email;
    }

    const customerPhone = addressSource.contact || addressSource.phone || user?.phone || user?.mobile || '';

    // ✅ Validate email is present
    if (!customerEmail || !customerEmail.trim()) {
      alert("⚠️ Email address is required for order confirmation. Please go back and enter your email.");
      throw new Error("Email is required for order confirmation.");
    }

    // ✅ Format shipping address
    const formattedShippingAddress = {
      name: customerName,
      phone: customerPhone,
      addressLine1: addressSource.address || addressSource.addressLine1 || '',
      addressLine2: addressSource.addressLine2 || '',
      city: addressSource.city || '',
      state: addressSource.state || '',
      country: addressSource.country || 'India',
      postalCode: addressSource.postalCode || addressSource.pincode || '',
    };

    const orderPayload = {
      userId: user?._id || null,
      items: formattedItems,
      amount: parseFloat(total.toFixed(2)),
      subtotal: parseFloat(subtotal.toFixed(2)),
      shipping: parseFloat(shipping.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      discount: parseFloat(discount.toFixed(2)),
      paymentMethod,
      paymentId,
      couponCode: appliedCoupon?.code || null,
      shippingAddress: formattedShippingAddress,
      customerInfo: {
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
      },
      isPaymentVerified,
    };

    // ✅ Final validation
    if (!orderPayload.customerInfo.name?.trim()) {
      alert("⚠️ Customer name is required. Please go back and enter your name.");
      throw new Error("Customer name is required.");
    }
    if (!orderPayload.customerInfo.phone?.trim()) {
      alert("⚠️ Phone number is required. Please go back and enter your phone number.");
      throw new Error("Phone number is required.");
    }

    // ✅ Create order
    const res = await axios.post("/api/orders/create", orderPayload);
    const createdOrder = res.data.order;

    console.log("✅ Order created successfully:", createdOrder);

    // ✅ Update coupon usage (optional, don't fail if error)
    if (appliedCoupon) {
      try {
        await axios.post(`/api/user/couponCode/${appliedCoupon.code}`, {
          purchaseAmount: subtotal,
        });
      } catch (err) {
        console.error("⚠️ Failed to update coupon usage:", err);
      }
    }

    // ✅ Send confirmation email (optional, don't fail if error)
    try {
      await sendConfirmationEmail(createdOrder);
    } catch (err) {
      console.error("⚠️ Failed to send confirmation email:", err);
    }

    // ✅ Complete order
    onOrderComplete({
      orderNumber: createdOrder.orderNumber || `ORD-${createdOrder._id.slice(-8).toUpperCase()}`,
      orderId: createdOrder._id,
      date: createdOrder.createdAt || new Date().toISOString(),
      items: formattedItems,
      subtotal,
      discount,
      shipping,
      tax,
      total,
      paymentMethod,
      couponCode: appliedCoupon?.code,
      shippingAddress: formattedShippingAddress,
      email: createdOrder.customerInfo.email,
    });
  };

  const handlePaymentSuccess = async (response) => {
    try {
      const verifyRes = await axios.post("/api/payment/verify", {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      });

      if (!verifyRes.data.success) {
        alert("Payment verification failed");
        return;
      }

      await createOrderInDB("Razorpay", response.razorpay_payment_id, true);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message || "Payment processing error");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRazorpayPayment = async () => {
    if (!isRazorpayLoaded) return;
    setIsProcessing(true);

    try {
      // ✅ Get customer email (same logic as COD order)
      const addressSource = guestAddress || shippingAddress;

      let customerEmail = null;
      if (!isAuthenticated) {
        customerEmail = addressSource?.email || user?.email || '';
      } else {
        try {
          const resEmail = await axios.get("/api/email/getUserEmail", {
            withCredentials: true,
          });
          customerEmail = resEmail.data.email;
        } catch (emailErr) {
          console.error("Failed to fetch email:", emailErr);
          customerEmail = addressSource?.email || user?.email || '';
        }
      }

      if (!customerEmail || !customerEmail.trim()) {
        alert("⚠️ Email address is required for payment. Please go back and enter your email.");
        setIsProcessing(false);
        return;
      }

      const { data } = await axios.post("/api/payment/createOrder", {
        amount: parseFloat(total.toFixed(2)),
        email: customerEmail,
      }, {
        withCredentials: true,
      });

      if (!data.success) {
        throw new Error(data.message || "Failed to create payment order");
      }

      const customerName = `${addressSource?.firstName || ''} ${addressSource?.lastName || ''}`.trim() ||
        addressSource?.name ||
        user?.username ||
        user?.name ||
        '';

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Woof Woof",
        description: "Payment for your order",
        order_id: data.order.id,
        handler: handlePaymentSuccess,
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: addressSource?.contact || addressSource?.phone || user?.phone || '',
        },
        theme: { color: "#121212" },
        modal: {
          ondismiss: () => {
            console.log("Payment cancelled by user");
            setIsProcessing(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment initialization error:", err);
      alert(err.response?.data?.message || err.message || "Failed to initialize payment. Please try again.");
      setIsProcessing(false);
    }
  };

  const handleCODOrder = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      await createOrderInDB("COD", null, false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message || "Failed to place COD order");
      setIsProcessing(false);
    }
  };

  const handleCompletePayment = () => {
    if (selectedPayment === "razorpay") {
      handleRazorpayPayment();
    } else {
      handleCODOrder();
    }
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Methods */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setSelectedPayment("razorpay")}
                  disabled={isProcessing}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${selectedPayment === "razorpay"
                    ? "border-pink-500 ring-2 shadow-lg ring-pink-200"
                    : "border-gray-200 hover:border-gray-300"
                    } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                      <span className="font-medium text-gray-900">Razorpay</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-8 h-5 bg-blue-600 rounded-sm"></div>
                      <div className="w-8 h-5 bg-red-500 rounded-sm"></div>
                      <div className="w-8 h-5 bg-yellow-400 rounded-sm"></div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedPayment("cod")}
                  disabled={isProcessing}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${selectedPayment === "cod"
                    ? "border-pink-500 ring-2 shadow-lg ring-pink-200"
                    : "border-gray-200 hover:border-gray-300"
                    } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="flex items-center space-x-3">
                    <Truck className="w-6 h-6 text-green-600" />
                    <span className="font-medium text-gray-900">Cash on Delivery</span>
                  </div>
                </button>
              </div>

              {selectedPayment === "razorpay" && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">
                        Secure Payment with Razorpay
                      </p>
                      <p className="text-xs text-blue-700 mt-1">
                        Pay securely using UPI, Cards, Net Banking, or Wallets
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedPayment === "cod" && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-start space-x-3">
                    <Truck className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-900">
                        Cash on Delivery
                      </p>
                      <p className="text-xs text-green-700 mt-1">
                        Pay with cash when your order is delivered
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Coupon Code Section */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Apply Coupon Code
              </h2>

              {!appliedCoupon ? (
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <Tag className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value.toUpperCase());
                          setCouponError("");
                        }}
                        placeholder="Enter coupon code"
                        disabled={isProcessing}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !isProcessing) {
                            handleApplyCoupon();
                          }
                        }}
                      />
                    </div>
                    <button
                      onClick={handleApplyCoupon}
                      disabled={isApplyingCoupon || !couponCode.trim() || isProcessing}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {isApplyingCoupon ? "Applying..." : "Apply"}
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <X className="w-4 h-4" />
                      {couponError}
                    </p>
                  )}
                </div>
              ) : (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-green-900">
                          Coupon Applied: {appliedCoupon.code}
                        </p>
                        <p className="text-xs text-green-700">
                          {appliedCoupon.discount}% off - You saved ₹{appliedCoupon.discountAmount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      disabled={isProcessing}
                      className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item?.product?.images[0]?.url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item?.product?.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ₹{(item?.product?.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span>₹{shipping.toFixed(2)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-sm text-green-600 font-medium">
                    <span>Discount ({appliedCoupon.discount}%)</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t pt-2 flex justify-between text-base font-semibold text-gray-900">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>

                {appliedCoupon && (
                  <div className="text-xs text-green-600 text-center pt-1">
                    You're saving ₹{discount.toFixed(2)} with this coupon!
                  </div>
                )}
              </div>


              <button
                onClick={handleCompletePayment}
                disabled={(selectedPayment === "razorpay" && !isRazorpayLoaded) || isProcessing}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl mt-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isProcessing
                  ? "Processing..."
                  : selectedPayment === "razorpay"
                    ? isRazorpayLoaded
                      ? "Pay with Razorpay"
                      : "Loading..."
                    : "Place Order (COD)"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-end items-center lg:px-8 px-4 pb-8">
        {/* <Button onClick={onBack} disabled={isProcessing}>Back to Checkout</Button> */}
        <button
          className="bg-[#F91F54] flex items-center px-4 py-2 md:mr-72 mr-0 gap-2 text-white font-medium rounded-full uppercase hover:scale-105 transition-all duration-300"
          onClick={onBack}
          disabled={isProcessing}
        >
          Back to Checkout
          <Image src="/images/logo2.png" width={33} height={33} alt="logo" />
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;