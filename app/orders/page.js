"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Spinner from "../components/loader/Spinner";

export default function UserOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedOrder, setExpandedOrder] = useState(null);

    const router = useRouter()
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!isAuthenticated) {
            toast.error("Login to see orders.")
            router.push("/login")
            return
        }
        fetchOrders();
    }, []);



    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/orders/get");

            // Sort: Delivered orders last
            const sortedOrders = response.data.orders.sort((a, b) => {
                if (a.status === "Delivered" && b.status !== "Delivered") return 1;
                if (b.status === "Delivered" && a.status !== "Delivered") return -1;
                return new Date(b.createdAt) - new Date(a.createdAt); // optional: newest first
            });

            setOrders(sortedOrders);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };


    const calculateSavings = (subtotal, discount) => {
        if (!discount || discount === 0) return 0;
        return ((discount / subtotal) * 100).toFixed(0);
    };

    const getOrderStatus = (status) => {
        switch (status) {
            case "Delivered":
                return { label: "Delivered", color: "text-green-600", icon: true, step: 3 };
            case "Shipped":
                return { label: "In Progress", color: "text-orange-500", icon: false, step: 2 };
            case "Pending":
                return { label: "Pending", color: "text-orange-500", icon: false, step: 1 };
            case "Cancelled":
                return { label: "Cancelled", color: "text-red-600", icon: false, step: 0 };
            default:
                return { label: status, color: "text-gray-600", icon: false, step: 1 };
        }
    };

    if (loading) {
        return (
            <div className="relative bg-white m-4 rounded-3xl md:m-12 md:py-16 min-h-screen">
                <Image
                    src="/images/bgPaws1.png"
                    alt="bgpaws"
                    fill
                    className="h-full w-full absolute inset-0 opacity-30"
                />
                {/* <div className="relative z-10 container mx-auto px-4 py-8 text-center">
                    <p className="text-xl">Loading your orders...</p>
                </div> */}
                <Spinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="relative bg-white m-4 rounded-3xl md:m-12 md:py-16 min-h-screen">
                <Image
                    src="/images/bgPaws1.png"
                    alt="bgpaws"
                    fill
                    className="h-full w-full absolute inset-0 opacity-30"
                />
                <div className="relative z-10 container mx-auto px-4 py-8 text-center">
                    <p className="text-xl text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative bg-white m-4 rounded-3xl md:m-12 py-16 min-h-screen">
            <Image
                src="/images/bgPaws1.png"
                alt="bgpaws"
                fill
                className="h-full w-full absolute inset-0 opacity-30 object-cover"
            />

            <div className="relative z-10 container mx-auto px-4 py-4 md:px-24 xl:px-20">
                <h1 className="text-3xl font-bold mb-8 text-[#F91F54]">My Orders</h1>

                {orders.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-xl text-gray-600">No orders found</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => {
                            const orderStatus = getOrderStatus(order.status);
                            const savingsPercent = calculateSavings(order.subtotal, order.discount);

                            return (
                                <div key={order._id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                                    {/* Order Header */}
                                    <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                                        <div>
                                            <h2 className="text-xl font-bold">Order ID: {order.orderNumber}</h2>
                                            <p className="text-gray-600 text-sm mt-1">
                                                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold">₹ {order.amount.toLocaleString()}</p>
                                            {order.discount > 0 && (
                                                <p className="text-green-600 text-sm">You saved ₹ {order.discount}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Order Status Timeline */}
                                    <div className="mb-6">
                                        <div className="flex items-center justify-between relative">
                                            {/* Order Confirmed */}
                                            <div className="flex flex-col items-center z-10">
                                                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                                                    <CheckCircleIcon className="text-white" fontSize="small" />
                                                </div>
                                                <p className="text-xs mt-2 font-medium">Order confirmed</p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                                        day: "numeric",
                                                        month: "short",
                                                    })}
                                                </p>
                                            </div>

                                            {/* Progress Line */}
                                            <div
                                                className={`absolute top-5 left-0 h-0.5 ${order.status === "Delivered" ? "bg-green-500" : "bg-gray-300"
                                                    }`}
                                                style={{ width: "calc(50% - 20px)", marginLeft: "20px" }}
                                            />

                                            {/* Shipped */}
                                            <div className="flex flex-col items-center z-10">
                                                <div
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${orderStatus.step >= 2 ? "bg-green-500" : "bg-gray-300"
                                                        }`}
                                                >
                                                    <CheckCircleIcon className="text-white" fontSize="small" />
                                                </div>
                                                <p className="text-xs mt-2 font-medium">Shipped</p>
                                                <p className="text-xs text-gray-500">
                                                    {orderStatus.step >= 2
                                                        ? new Date(order.updatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
                                                        : "Pending"}
                                                </p>
                                            </div>

                                            {/* Progress Line */}
                                            <div
                                                className={`absolute top-5 right-0 h-0.5 ${order.status === "Delivered" ? "bg-green-500" : "bg-gray-300"
                                                    }`}
                                                style={{ width: "calc(50% - 20px)", marginRight: "20px" }}
                                            />

                                            {/* Delivered */}
                                            <div className="flex flex-col items-center z-10">
                                                <div
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === "Delivered" ? "bg-green-500" : "bg-gray-300"
                                                        }`}
                                                >
                                                    <CheckCircleIcon className="text-white" fontSize="small" />
                                                </div>
                                                <p className="text-xs mt-2 font-medium">Delivered</p>
                                                <p className={`text-xs ${orderStatus.color}`}>
                                                    {order.status === "Delivered"
                                                        ? new Date(order.updatedAt).toLocaleDateString("en-IN", {
                                                            day: "numeric",
                                                            month: "short",
                                                        })
                                                        : orderStatus.label}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="space-y-4 mb-6">
                                        {order.items.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl"
                                            >
                                                <img
                                                    src={item.image || "/placeholder.png"}
                                                    alt={item.name}
                                                    className="w-20 h-20 object-cover rounded-lg border"
                                                />
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                                    <div className="flex gap-4 mt-1 text-sm text-gray-600">
                                                        {item.size && <span>Size: {item.size}</span>}
                                                        {item.color?.name && <span>Color: {item.color.name}</span>}
                                                        <span>Qty: {item.quantity}</span>
                                                    </div>
                                                    <p className="text-sm font-medium text-gray-800 mt-1">
                                                        ₹ {item.price.toLocaleString()}
                                                    </p>
                                                </div>
                                                <div className={`font-medium ${orderStatus.color}`}>
                                                    {orderStatus.icon && <CheckCircleIcon fontSize="small" className="mr-1" />}
                                                    {orderStatus.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Expandable Details */}
                                    <Accordion>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography className="font-semibold">View Order Details</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div className="space-y-6">
                                                {/* Delivery Address */}
                                                <div>
                                                    <h4 className="font-semibold mb-2 text-[#F91F54]">Delivery Address</h4>
                                                    <div className="bg-gray-50 p-4 rounded-lg">
                                                        <p className="font-medium">{order.shippingAddress?.name}</p>
                                                        <p className="text-sm text-gray-700">{order.shippingAddress?.addressLine1}</p>
                                                        {order.shippingAddress?.addressLine2 && (
                                                            <p className="text-sm text-gray-700">{order.shippingAddress?.addressLine2}</p>
                                                        )}
                                                        <p className="text-sm text-gray-700">
                                                            {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.postalCode}
                                                        </p>
                                                        <p className="text-sm text-gray-700">{order.shippingAddress?.country}</p>
                                                        <p className="text-sm text-gray-700 mt-2">Phone: {order.shippingAddress?.phone}</p>
                                                    </div>
                                                </div>

                                                {/* Payment Details */}
                                                <div>
                                                    <h4 className="font-semibold mb-2 text-[#F91F54]">Payment Details</h4>
                                                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-gray-600">Subtotal</span>
                                                            <span className="font-medium">₹ {order.subtotal.toLocaleString()}</span>
                                                        </div>
                                                        {order.shipping > 0 && (
                                                            <div className="flex justify-between text-sm">
                                                                <span className="text-gray-600">Delivery</span>
                                                                <span className="font-medium">₹ {order.shipping}</span>
                                                            </div>
                                                        )}
                                                        {order.discount > 0 && (
                                                            <div className="flex justify-between text-sm text-green-600">
                                                                <span>Coupon savings {savingsPercent > 0 && `(${savingsPercent}%)`}</span>
                                                                <span className="font-medium">-₹ {order.discount}</span>
                                                            </div>
                                                        )}
                                                        {order.couponCode && (
                                                            <div className="flex justify-between text-sm">
                                                                <span className="text-gray-600">Coupon Code</span>
                                                                <span className="font-medium bg-green-100 px-2 py-0.5 rounded">{order.couponCode}</span>
                                                            </div>
                                                        )}
                                                        <div className="border-t pt-2 flex justify-between font-bold">
                                                            <span>Total</span>
                                                            <span>₹ {order.amount.toLocaleString()}</span>
                                                        </div>
                                                        <div className="border-t pt-2 text-sm">
                                                            <p className="text-gray-600">Payment Method: <span className="font-medium">{order.paymentMethod}</span></p>
                                                            {order.paymentId && (
                                                                <p className="text-gray-600 text-xs mt-1">Payment ID: {order.paymentId}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}