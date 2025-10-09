import React from 'react';
import { Check, Package, Truck, MapPin, CreditCard, Calendar, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

const OrderConfirmation = ({ orderData }) => {
  const router = useRouter();

  // Default order data structure
  const order = orderData || {
    orderNumber: 'ORD123456',
    orderId: '507f1f77bcf86cd799439011',
    date: new Date().toISOString(),
    items: [],
    subtotal: 0,
    discount: 0,
    shipping: 0,
    tax: 0,
    total: 0,
    paymentMethod: 'Razorpay',
    couponCode: null,
    shippingAddress: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipCode: ''
    },
    email: ''
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleContinueShopping = () => {
    router.push('/');
  };

  const handleViewOrders = () => {
    router.push('/orders');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-6 shadow-lg">
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your purchase
          </p>
        </div>

        {/* Order Number Card */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6 animate-in fade-in slide-in-from-top-5 duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Order Number</p>
              <p className="text-2xl font-bold text-gray-900">
                #{order.orderNumber || order.orderId}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(order.date)}</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Items & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-sm border p-6 animate-in fade-in slide-in-from-left duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Order Items
                </h2>
              </div>

              <div className="space-y-4">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 pb-4 border-b last:border-b-0">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item?.product?.images?.[0]?.url || item?.image || '/placeholder.png'}
                          alt={item?.product?.name || item?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-medium text-gray-900 truncate">
                          {item?.product?.name || item?.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-semibold text-gray-900">
                          ₹{((item?.product?.price || item?.price) * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          ₹{(item?.product?.price || item?.price).toFixed(2)} each
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No items in order</p>
                )}
              </div>
            </div>

            {/* Shipping Address */}
            {order.shippingAddress && (
              <div className="bg-white rounded-2xl shadow-sm border p-6 animate-in fade-in slide-in-from-left duration-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Shipping Address
                  </h2>
                </div>
                <div className="text-gray-700 leading-relaxed">
                  <p className="font-medium text-gray-900">
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  </p>
                  <p className="mt-2">{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </p>
                </div>
              </div>
            )}

            {/* Delivery Info */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 p-6 animate-in fade-in slide-in-from-left duration-900">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    Estimated Delivery
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Your order will be delivered within 5-7 business days
                  </p>
                  <p className="text-xs text-gray-600">
                    We'll send you a shipping confirmation email with tracking details once your order ships.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border p-6 sticky top-6 animate-in fade-in slide-in-from-right duration-500">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal.toFixed(2)}</span>
                </div>
                
                {order.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600 font-medium">
                    <span>Discount</span>
                    <span>-₹{order.discount.toFixed(2)}</span>
                  </div>
                )}

                {order.couponCode && (
                  <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                    <Check className="w-4 h-4" />
                    <span>Coupon "{order.couponCode}" applied</span>
                  </div>
                )}

                {order.shipping > 0 && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span>₹{order.shipping.toFixed(2)}</span>
                  </div>
                )}

                {order.tax > 0 && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tax</span>
                    <span>₹{order.tax.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total Paid</span>
                  <span>₹{order.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="border-t pt-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Payment Method</p>
                    <p className="text-sm font-medium text-gray-900">
                      {order.paymentMethod}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Confirmation */}
              {order.email && (
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">
                        Confirmation Email Sent
                      </p>
                      <p className="text-xs text-blue-700 mt-1">
                        to {order.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleViewOrders}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  View Order Details
                </button>
                <button
                  onClick={handleContinueShopping}
                  className="w-full bg-white text-gray-700 py-3 px-6 rounded-xl font-medium border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border p-6 text-center animate-in fade-in duration-1000">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Need Help?
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            If you have any questions about your order, please contact our customer support.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="mailto:support@wedmypet.com" className="text-blue-600 hover:text-blue-700 font-medium">
              support@wedmypet.com
            </a>
            <span className="text-gray-300">|</span>
            <a href="tel:+911234567890" className="text-blue-600 hover:text-blue-700 font-medium">
              +91 123 456 7890
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;