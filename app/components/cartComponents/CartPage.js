import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  fetchCart,
  removeFromCart,
  updateCartQuantity,
} from "@/store/slices/user/cartSlice";

const CartPage = ({ onNext }) => {
  const dispatch = useDispatch();
  const handleRemove = (productId) => dispatch(removeFromCart(productId));
  const handleQtyChange = (productId, qty) =>
    dispatch(updateCartQuantity({ productId, quantity: qty }));
  const {
    items: cartItems,
    loading,
    error,
  } = useSelector((state) => state.userCart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) {
    toast.error(error);
    return <p className="text-center mt-4 text-red-500">{error}</p>;
  }

  if (cartItems.length === 0) {
    return <p className="text-center mt-4">Your cart is empty.</p>;
  }

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="relative bg-white flex justify-center items-center m-4 rounded-3xl md:mx-12">
      {/* Background paw prints */}
      {/* <div className="absolute inset-0 z-0 bg-[url('/paws-bg.png')] bg-no-repeat bg-contain md:bg-[length:200px_200px] opacity-10 pointer-events-none" /> */}

      <div className="relative z-10 container  p-4 md:px-8 rounded-3xl">
        {cartItems.map((item, index) => {
          const { product, quantity } = item;
          const { images, name, price, colors } = product;

          return (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between gap-8 p-4 my-4 bg-white rounded-2xl shadow-lg border border-gray-100"
            >
              {/* Image */}
              <div className="w-full bg-[#EEEEEE] rounded-2xl md:w-32 flex-shrink-0">
                <Image
                  src={images[0]?.url}
                  width={100}
                  height={100}
                  alt={name}
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>

              {/* Details */}
              <div className="flex-1 w-full">
                <h3 className="text-lg font-medium text-gray-800">{name}</h3>
                <p className="text-base font-semibold text-gray-800 mt-1">
                  ₹{price}
                </p>

                {/* Colors */}
                <div className="mt-3">
                  <p className="text-sm text-gray-500 mb-1">Color</p>
                  <div className="flex items-center gap-2">
                    {colors?.map((color, i) => (
                      <div
                        key={i}
                        className="w-5 h-5 rounded-full border border-gray-300 cursor-pointer"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2 mt-4">
                  <button
                    className="px-2.5 border font-medium border-gray-300 rounded-2xl text-sm cursor-pointer"
                    onClick={() => {
                      if (item.quantity > 1)
                        handleQtyChange(item.product._id, item.quantity - 1);
                    }}
                  >
                    −
                  </button>
                  <span className="text-base font-medium">{item.quantity}</span>
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
            id="gift-wrap"
            className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
          />
          <label htmlFor="gift-wrap" className="text-sm text-gray-700">
            I confirm that I have read and accept the terms and conditions and
            privacy policy.
          </label>
        </div>
        <div className=" flex justify-between items-center mt-6">
          {/* <Button variant="contained"  className="">
            Proceed to Checkout
          </Button> */}
          <div>
            <span className=" font-semibold">Total Amount: </span>
            <span>{` ₹ ${Math.floor(totalAmount)}`}</span>
          </div>
          <button
            className={` bg-[#F91F54] gap-4 flex justify-center items-center px-1.5 pl-4   py-1 group scale-95 hover:scale-100 transition-all duration-300 text-white font-medium text-sm lg:text-lg  rounded-full uppercase cursor-pointer`}
            onClick={onNext}
          >
            Proceed To Checkout
            <span>
              <Image
                src="/images/logo2.png"
                width={33}
                height={33}
                alt="logo"
                className=" transition-all duration-300"
              />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
