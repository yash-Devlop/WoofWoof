// import Button from "@mui/material/Button";
// import { useState } from "react";
// import {
//   CreditCard,
//   Shield,
//   Lock,
//   Check,
//   ChevronRight,
//   Apple,
//   ArrowLeft,
// } from "lucide-react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import useRazorpayLoader from "@/hooks/useRazorpayLoader";

// const PaymentPage = ({ onBack }) => {
//   const isRazorpayLoaded = useRazorpayLoader();
//   const [selectedPayment, setSelectedPayment] = useState("card");
//   const items = useSelector((state) => state.userCart?.items);
//   const formattedItems = items.map((item) => ({
//     productId: item.product._id, // get only the product ID
//     quantity: item.quantity,
//     price: item.product.price,
//   }));
//   console.log("items", items);

//   const orderItems = [
//     {
//       id: 1,
//       name: "Premium Wireless Headphones",
//       price: 299.99,
//       quantity: 1,
//       image:
//         "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
//     },
//     {
//       id: 2,
//       name: "Bluetooth Speaker",
//       price: 89.99,
//       quantity: 2,
//       image:
//         "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400",
//     },
//   ];

//   const subtotal = items.reduce(
//     (sum, item) => sum + item?.product?.price * item.quantity,
//     0
//   );
//   const shipping = 20;
//   const tax = subtotal * 0.08;
//   const total = subtotal + shipping + tax;

//   // razorpay payments
//   const handleRazorpayPayment = async () => {
//     if (!isRazorpayLoaded || typeof window.Razorpay === "undefined") {
//       alert("Razorpay SDK is still loading. Please try again in a second.");
//       return;
//     }

//     const amount = total.toFixed(0);
//     const { data } = await axios.post("/api/payment/createOrder", { amount });

//     const options = {
//       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//       amount: data.order.amount,
//       currency: "INR",
//       name: "Wed My Pet",
//       description: "Pet Purchase",
//       image: "/logo.png",
//       order_id: data.order.id,
//       handler: async function (response) {
//         await axios.post("/api/payment/verifyPayment", {
//           razorpay_order_id: response.razorpay_order_id,
//           razorpay_payment_id: response.razorpay_payment_id,
//           razorpay_signature: response.razorpay_signature,
//           items: formattedItems,
//           amount,
//           userId: data.userId, // ✅ Add this
//         });
//       },
//       prefill: {
//         name: "Customer",
//         email: "test@example.com",
//         contact: "9999999999",
//       },
//       theme: {
//         color: "#F37254",
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   return (
//     <div className="">
//       {/* Header */}
//       {/* <div className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center space-x-4">
//               <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
//                 <ArrowLeft className="w-5 h-5 text-gray-600" />
//               </button>
//               <h1 className="text-xl font-semibold text-gray-900">Checkout</h1>
//             </div>
//             <div className="flex items-center space-x-2 text-sm text-gray-500">
//               <Shield className="w-4 h-4" />
//               <span>Secure Checkout</span>
//             </div>
//           </div>
//         </div>
//       </div> */}

//       {/* Progress Steps */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* <div className="flex items-center justify-center mb-8">
//           {steps.map((step, index) => (
//             <div key={step.id} className="flex items-center">
//               <div
//                 className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
//                   step.completed
//                     ? "bg-emerald-500 border-emerald-500 text-white"
//                     : step.id === currentStep
//                     ? "bg-blue-600 border-blue-600 text-white"
//                     : "bg-white border-gray-300 text-gray-400"
//                 }`}
//               >
//                 {step.completed ? <Check className="w-5 h-5" /> : step.id}
//               </div>
//               <span
//                 className={`ml-2 text-sm font-medium ${
//                   step.completed || step.id === currentStep
//                     ? "text-gray-900"
//                     : "text-gray-400"
//                 }`}
//               >
//                 {step.name}
//               </span>
//               {index < steps.length - 1 && (
//                 <ChevronRight className="w-5 h-5 text-gray-300 mx-4" />
//               )}
//             </div>
//           ))}
//         </div> */}

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Payment Form */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Payment Methods */}
//             <div className="bg-white rounded-2xl shadow-sm border p-6 h-full">
//               <h2 className="text-lg font-semibold text-gray-900 mb-6">
//                 Payment Method
//               </h2>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//                 <button
//                   onClick={() => setSelectedPayment("card")}
//                   className={`p-4  rounded-xl border-2 transition-all duration-200 ${
//                     selectedPayment === "card"
//                       ? "border-pink-500 ring-2 shadow-lg ring-pink-200"
//                       : "border-gray-200 hover:border-gray-300"
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                       <CreditCard className="w-6 h-6 text-gray-600" />
//                       <span className="font-medium text-gray-900">
//                         Credit Card
//                       </span>
//                     </div>
//                     <div className="flex space-x-1">
//                       <div className="w-8 h-5 bg-blue-600 rounded-sm"></div>
//                       <div className="w-8 h-5 bg-red-500 rounded-sm"></div>
//                       <div className="w-8 h-5 bg-yellow-400 rounded-sm"></div>
//                     </div>
//                   </div>
//                 </button>

//                 <button
//                   onClick={() => setSelectedPayment("paypal")}
//                   className={`p-4 rounded-xl border-2 transition-all duration-200 ${
//                     selectedPayment === "paypal"
//                       ? "border-pink-500 ring-2 shadow-lg ring-pink-200"
//                       : "border-gray-200 hover:border-gray-300"
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
//                         <span className="text-white text-xs font-bold">P</span>
//                       </div>
//                       <span className="font-medium text-gray-900">PayPal</span>
//                     </div>
//                   </div>
//                 </button>

//                 <button
//                   onClick={() => setSelectedPayment("apple")}
//                   className={`p-4 rounded-xl border-2 transition-all duration-200 ${
//                     selectedPayment === "apple"
//                       ? "border-pink-500 ring-2 shadow-lg ring-pink-200"
//                       : "border-gray-200 hover:border-gray-300"
//                   }`}
//                 >
//                   <div className="flex items-center space-x-3">
//                     <Apple className="w-6 h-6 text-gray-600" />
//                     <span className="font-medium text-gray-900">Apple Pay</span>
//                   </div>
//                 </button>

//                 <button
//                   onClick={() => setSelectedPayment("google")}
//                   className={`p-4 rounded-xl border-2 transition-all duration-200 ${
//                     selectedPayment === "google"
//                       ? "border-pink-500 ring-2 shadow-lg ring-pink-200"
//                       : "border-gray-200 hover:border-gray-300"
//                   }`}
//                 >
//                   <div className="flex items-center space-x-3">
//                     <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
//                       <span className="text-white text-xs font-bold">G</span>
//                     </div>
//                     <span className="font-medium text-gray-900">
//                       Google Pay
//                     </span>
//                   </div>
//                 </button>
//               </div>

//               {/* Card Details Form */}
//               {selectedPayment === "card" && (
//                 <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Card Number
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         placeholder="1234 5678 9012 3456"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                       />
//                       <div className="absolute right-3 top-3 flex space-x-1">
//                         <div className="w-6 h-4 bg-blue-600 rounded-sm"></div>
//                         <div className="w-6 h-4 bg-red-500 rounded-sm"></div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Expiry Date
//                       </label>
//                       <input
//                         type="text"
//                         placeholder="MM/YY"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         CVV
//                       </label>
//                       <input
//                         type="text"
//                         placeholder="123"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Cardholder Name
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="John Doe"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Billing Address */}
//             {/* <div className="bg-white rounded-2xl shadow-sm border p-6">
//               <h2 className="text-lg font-semibold text-gray-900 mb-6">
//                 Billing Address
//               </h2>

//               <div className="space-y-4">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       First Name
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="John"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Last Name
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Doe"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="123 Main Street"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       City
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="New York"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       State
//                     </label>
//                     <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
//                       <option>NY</option>
//                       <option>CA</option>
//                       <option>TX</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       ZIP Code
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="10001"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div> */}
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl shadow-sm border p-6 sticky top-6">
//               <h2 className="text-lg font-semibold text-gray-900 mb-6">
//                 Order Summary
//               </h2>

//               <div className="space-y-4 mb-6">
//                 {items.map((item, index) => (
//                   <div key={index} className="flex items-center space-x-4">
//                     <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
//                       <img
//                         src={item?.product?.images[0]?.url}
//                         alt={item.name}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <h3 className="text-sm font-medium text-gray-900 truncate">
//                         {item?.product?.name}
//                       </h3>
//                       <p className="text-sm text-gray-500">
//                         Qty: {item.quantity}
//                       </p>
//                     </div>
//                     <p className="text-sm font-medium text-gray-900">
//                       {`₹ ${(item?.product?.price * item.quantity).toFixed(2)}`}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               <div className="border-t pt-4 space-y-2">
//                 <div className="flex justify-between text-sm text-gray-600">
//                   <span>Subtotal</span>
//                   <span>₹{subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-sm text-gray-600">
//                   <span>Shipping</span>
//                   <span>₹{shipping.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-sm text-gray-600">
//                   <span>Tax</span>
//                   <span>₹{tax.toFixed(2)}</span>
//                 </div>
//                 <div className="border-t pt-2 flex justify-between text-base font-semibold text-gray-900">
//                   <span>Total</span>
//                   <span>₹{total.toFixed(2)}</span>
//                 </div>
//               </div>

//               <button
//                 onClick={handleRazorpayPayment}
//                 disabled={!isRazorpayLoaded}
//                 className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl mt-6"
//               >
//                 {isRazorpayLoaded ? "Complete Payment" : "Loading..."}
//               </button>

//               {/* Security Badges */}
//               {/* <div className="mt-6 pt-6 border-t">
//                 <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
//                   <div className="flex items-center space-x-1">
//                     <Lock className="w-3 h-3" />
//                     <span>SSL Encrypted</span>
//                   </div>
//                   <div className="flex items-center space-x-1">
//                     <Shield className="w-3 h-3" />
//                     <span>Secure Payment</span>
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-center space-x-2 mt-3">
//                   <div className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
//                     Norton Secured
//                   </div>
//                   <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
//                     256-bit SSL
//                   </div>
//                 </div>
//               </div> */}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className=" w-full flex justify-end items-center lg:px-8 px-4">
//         <Button onClick={onBack}>Back to Checkout</Button>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;




"use client"
import Button from "@mui/material/Button";
import { useState } from "react";
import {
  Shield,
  Check,
  Truck,
  CreditCard,
  Tag,
  X,
} from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import useRazorpayLoader from "@/hooks/useRazorpayLoader";

const PaymentPage = ({ onBack, onOrderComplete }) => {
  const isRazorpayLoaded = useRazorpayLoader();
  const [selectedPayment, setSelectedPayment] = useState("razorpay");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const items = useSelector((state) => state.userCart?.items);
  const user = useSelector((state) => state.user?.user); // Get user data including email
  const shippingAddress = useSelector((state) => state.checkout?.shippingAddress); // Get shipping address from checkout state

  const formattedItems = items.map((item) => ({
    productId: item.product._id,
    quantity: item.quantity,
    price: item.product.price,
    product: item.product, // Include full product data for order confirmation
  }));

  const subtotal = items.reduce(
    (sum, item) => sum + item?.product?.price * item.quantity,
    0
  );
  const shipping = 0;
  const tax = 0;
  
  // Calculate discount based on applied coupon
  const discount = appliedCoupon 
    ? (subtotal * appliedCoupon.discount) / 100 
    : 0;
  const total = subtotal + shipping + tax - discount;

  // Handle coupon validation (GET request)
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
          setCouponError(`Minimum purchase of ₹${data.coupon.thresholdAmount} required to apply this coupon`);
          setIsApplyingCoupon(false);
          return;
        }

        const discountAmount = (subtotal * data.coupon.discount) / 100;

        setAppliedCoupon({
          code: data.coupon.name,
          discount: data.coupon.discount,
          discountAmount: discountAmount,
          thresholdAmount: data.coupon.thresholdAmount,
          couponId: data.coupon._id,
        });
        setCouponCode("");
        setCouponError("");
      }
    } catch (error) {
      setCouponError(
        error.response?.data?.error || "Invalid or expired coupon code"
      );
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  // Remove applied coupon
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  // Send confirmation email
  const sendConfirmationEmail = async (orderId, email) => {
    try {
      await axios.post('/api/email/send-confirmation', {
        orderId,
        email,
      });
      console.log('Confirmation email sent successfully');
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
      // Don't throw error - email failure shouldn't break the flow
    }
  };

  // Handle Razorpay payment
  const handleRazorpayPayment = async () => {
    if (!isRazorpayLoaded || typeof window.Razorpay === "undefined") {
      alert("Razorpay SDK is still loading. Please try again in a second.");
      return;
    }

    if (isProcessing) return;
    setIsProcessing(true);

    const amount = Math.round(total);
    
    try {
      const { data } = await axios.post("/api/payment/createOrder", { 
        amount,
      });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: "Wed My Pet",
        description: "Pet Purchase",
        image: "/logo.png",
        order_id: data.order.id,
        handler: async function (response) {
          try {
            // Verify payment and create order
            const verifyResponse = await axios.post("/api/payment/verifyPayment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              items: formattedItems,
              amount: total.toFixed(2),
              subtotal: subtotal.toFixed(2),
              shipping: shipping.toFixed(2),
              tax: tax.toFixed(2),
              discount: discount.toFixed(2),
              userId: data.userId,
              couponCode: appliedCoupon?.code,
              purchaseAmount: subtotal,
              paymentMethod: "Razorpay",
              shippingAddress: shippingAddress,
            });

            const createdOrder = verifyResponse.data.order;

            // If coupon was applied, decrement usage
            if (appliedCoupon) {
              await axios.post(`/api/user/couponCode/${appliedCoupon.code}`, {
                purchaseAmount: subtotal,
              });
            }

            // Send confirmation email
            const userEmail = user?.email || shippingAddress?.email;
            if (userEmail && createdOrder._id) {
              await sendConfirmationEmail(createdOrder._id, userEmail);
            }

            // Prepare order data for confirmation page
            const orderData = {
              orderNumber: createdOrder.orderNumber || createdOrder._id,
              orderId: createdOrder._id,
              date: createdOrder.createdAt || new Date().toISOString(),
              items: formattedItems,
              subtotal: subtotal,
              discount: discount,
              shipping: shipping,
              tax: tax,
              total: total,
              paymentMethod: "Razorpay",
              couponCode: appliedCoupon?.code,
              shippingAddress: shippingAddress,
              email: userEmail,
            };

            // Move to order confirmation page
            onOrderComplete(orderData);
          } catch (error) {
            console.error("Payment verification error:", error);
            alert("Payment verification failed. Please contact support.");
            setIsProcessing(false);
          }
        },
        prefill: {
          name: shippingAddress?.firstName + " " + shippingAddress?.lastName || "Customer",
          email: user?.email || shippingAddress?.email || "test@example.com",
          contact: shippingAddress?.phone || "9999999999",
        },
        theme: {
          color: "#F37254",
        },
        modal: {
          ondismiss: function() {
            console.log("Payment cancelled");
            setIsProcessing(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Razorpay order creation error:", error);
      alert("Failed to initiate payment. Please try again.");
      setIsProcessing(false);
    }
  };

  // Handle COD order
  const handleCODOrder = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      // Create order with COD
      const orderResponse = await axios.post("/api/orders/create", {
        items: formattedItems,
        amount: total.toFixed(2),
        subtotal: subtotal.toFixed(2),
        shipping: shipping.toFixed(2),
        tax: tax.toFixed(2),
        discount: discount.toFixed(2),
        paymentMethod: "COD",
        couponCode: appliedCoupon?.code,
        purchaseAmount: subtotal,
        shippingAddress: shippingAddress,
      });

      const createdOrder = orderResponse.data.order;

      // If coupon was applied, decrement usage
      if (appliedCoupon) {
        await axios.post(`/api/user/couponCode/${appliedCoupon.code}`, {
          purchaseAmount: subtotal,
        });
      }

      // Send confirmation email
      const userEmail = user?.email || shippingAddress?.email;
      if (userEmail && createdOrder._id) {
        await sendConfirmationEmail(createdOrder._id, userEmail);
      }

      // Prepare order data for confirmation page
      const orderData = {
        orderNumber: createdOrder.orderNumber || createdOrder._id,
        orderId: createdOrder._id,
        date: createdOrder.createdAt || new Date().toISOString(),
        items: formattedItems,
        subtotal: subtotal,
        discount: discount,
        shipping: shipping,
        tax: tax,
        total: total,
        paymentMethod: "COD",
        couponCode: appliedCoupon?.code,
        shippingAddress: shippingAddress,
        email: userEmail,
      };

      // Move to order confirmation page
      onOrderComplete(orderData);
    } catch (error) {
      console.error("COD order error:", error);
      alert("Failed to place order. Please try again.");
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
    <div className="">
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
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedPayment === "razorpay"
                      ? "border-pink-500 ring-2 shadow-lg ring-pink-200"
                      : "border-gray-200 hover:border-gray-300"
                  } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                      <span className="font-medium text-gray-900">
                        Razorpay
                      </span>
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
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedPayment === "cod"
                      ? "border-pink-500 ring-2 shadow-lg ring-pink-200"
                      : "border-gray-200 hover:border-gray-300"
                  } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="flex items-center space-x-3">
                    <Truck className="w-6 h-6 text-green-600" />
                    <span className="font-medium text-gray-900">
                      Cash on Delivery
                    </span>
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
        <Button onClick={onBack} disabled={isProcessing}>Back to Checkout</Button>
      </div>
    </div>
  );
};

export default PaymentPage;