"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import EmptyCart from "./EmptyCart";
import toast from "react-hot-toast";
import {
  fetchCart,
  removeFromCart,
  updateCartQuantity,
} from "@/store/slices/user/cartSlice";

const CartPage = ({ onNext }) => {
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.userCart);

  const [pendingUpdates, setPendingUpdates] = useState({});
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [hydrated, setHydrated] = useState(false); // 💥 Fix hydration mismatch

  useEffect(() => setHydrated(true), []); // only render after mount
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const cartItems = useMemo(() => {
    return Array.isArray(cart?.items) ? cart.items : [];
  }, [cart]);

  const isUpdating = Object.keys(pendingUpdates).length > 0;

  const handleRemove = (productId) => dispatch(removeFromCart(productId));

  const handleQtyChange = async (productId, newQty) => {
    const item = cartItems.find((i) => i.product._id === productId);
    if (!item) return;

    const previousQuantity = item.quantity;
    dispatch({
      type: "cart/updateLocalQuantity",
      payload: { productId, quantity: newQty },
    });

    setPendingUpdates((prev) => ({ ...prev, [productId]: true }));

    try {
      await dispatch(updateCartQuantity({ productId, quantity: newQty })).unwrap();
    } catch (err) {
      dispatch({
        type: "cart/updateLocalQuantity",
        payload: { productId, quantity: previousQuantity },
      });
      toast.error("Failed to update cart. Try again.");
    } finally {
      setPendingUpdates((prev) => {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      });
    }
  };

  const handleAddToCheckout = () => {
    if (!isConfirmed) {
      toast.error("Please accept the terms and conditions first!");
      return;
    }
    onNext();
  };

  if (!hydrated) return null; // ✅ SSR-safe render prevention
  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) {
    toast.error(error);
    return <p className="text-center mt-4 text-red-500">{error}</p>;
  }

  // ✅ Single consistent empty state
  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="relative bg-white flex justify-center items-center m-4 rounded-3xl md:mx-12">
      <div className="relative z-10 container p-4 md:px-8 rounded-3xl">
        {cartItems.map((item, index) => {
          const { product, quantity, size, color } = item;
          const { images, name, price } = product;

          return (
            <div
              key={product._id || index}
              className="flex flex-col md:flex-row justify-between gap-8 p-4 my-4 bg-white rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="w-full bg-[#EEEEEE] rounded-2xl md:w-32 flex-shrink-0">
                {images?.[0]?.url && (
                  <Image
                    src={images[0].url}
                    width={100}
                    height={100}
                    alt={name}
                    className="w-full h-auto object-contain rounded-xl"
                  />
                )}
              </div>

              <div className="flex-1 w-full">
                <h3 className="text-lg font-medium text-gray-800">{name}</h3>
                <p className="text-base font-semibold text-gray-800 mt-1">₹{price}</p>

                <div className="flex items-center gap-4 mt-3">
                  {color && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Color:</span>
                      <div
                        className="w-5 h-5 rounded-full border border-gray-400"
                        style={{ backgroundColor: color?.code || "#ccc" }}
                        title={color?.name || "N/A"}
                      ></div>
                      <span className="text-sm text-gray-700">{color?.name}</span>
                    </div>
                  )}
                  {size && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Size:</span>
                      <span className="px-2 py-0.5 bg-gray-100 rounded-md text-sm font-medium text-gray-800">
                        {size}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <button
                    className="px-2.5 border font-medium border-gray-300 rounded-2xl text-sm cursor-pointer"
                    onClick={() =>
                      item.quantity > 1 &&
                      handleQtyChange(item.product._id, item.quantity - 1)
                    }
                  >
                    −
                  </button>
                  <span className="text-base font-medium">{quantity}</span>
                  <button
                    className="px-2.5 border border-gray-300 font-medium rounded-2xl text-sm cursor-pointer"
                    onClick={() =>
                      handleQtyChange(item.product._id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                  <button
                    className="text-sm text-gray-600 flex items-center gap-1 cursor-pointer"
                    onClick={() => handleRemove(item.product._id)}
                  >
                    🗑 Remove Item
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        <div className="flex items-center space-x-2 mt-4">
          <input
            type="checkbox"
            id="terms"
            className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            checked={isConfirmed}
            onChange={(e) => setIsConfirmed(e.target.checked)}
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            I confirm that I have read and accept the{" "}
            <a href="/policies/terms-and-conditions" className="text-blue-400 hover:underline">
              terms and conditions
            </a>{" "}
            and{" "}
            <a href="/policies/shipping" className="text-blue-400 hover:underline">
              privacy policy
            </a>.
          </label>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div>
            <span className="font-semibold">Total Amount: </span>
            <span>{`₹ ${Math.floor(totalAmount)}`}</span>
          </div>
          <button
            className="bg-[#F91F54] flex items-center px-4 py-2 gap-2 text-white font-medium rounded-full uppercase hover:scale-105 transition-all duration-300"
            onClick={handleAddToCheckout}
          >
            Proceed To Checkout
            <Image src="/images/logo2.png" width={33} height={33} alt="logo" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
