import React from "react";
import Button from "@mui/material/Button";
import Image from "next/image";

const CartPage = ({ onNext }) => {
  const cartItems = [
    {
      id: 1,
      name: "Yellow Ball with paw embossing",
      price: 300,
      image: "/images/products/yellowBall.png",
      colors: ["#FBBF24", "#374151"],
      size: "M",
      quantity: 1,
    },
    {
      id: 2,
      name: "Bone Shaped Pillow",
      price: 400,
      image: "/images/products/bonePillow.PNG",
      colors: ["#EF4444", "#3B82F6", "#10B981"],
      size: "L",
      quantity: 1,
    },
    {
      id: 3,
      name: "Pet Chew Rope Toy",
      price: 250,
      image: "/images/products/watermelonPillow.PNG",
      colors: ["#D946EF", "#F97316"],
      size: "S",
      quantity: 1,
    },

    {
      id: 4,
      name: "Pet Frisbee",
      price: 150,
      image: "/images/products/pinkStarPillow.png",
      colors: ["#38BDF8", "#F43F5E"],
      size: "L",
      quantity: 1,
    },
  ];

  return (
    <div className="relative bg-white flex justify-center items-center m-4 rounded-3xl md:mx-12">
      {/* Background paw prints */}
      {/* <div className="absolute inset-0 z-0 bg-[url('/paws-bg.png')] bg-no-repeat bg-contain md:bg-[length:200px_200px] opacity-10 pointer-events-none" /> */}

      <div className="relative z-10 container  p-4 md:px-8 rounded-3xl">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex   flex-col md:flex-row justify-between gap-8 p-4 my-4 bg-white rounded-2xl shadow-lg border border-gray-100"
          >
            {/* Image */}
            <div className="w-full  bg-[#EEEEEE] rounded-2xl md:w-32 flex-shrink-0">
              <Image
                src={item.image}
                width={100}
                height={100}
                alt={item.name}
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>

            {/* Details */}
            <div className="flex-1 w-full">
              <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
              <p className="text-base font-semibold text-gray-800 mt-1">
                ₹{item.price}
              </p>

              {/* Colors */}
              <div className="mt-3">
                <p className="text-sm text-gray-500 mb-1">Color</p>
                <div className="flex items-center gap-2">
                  {item.colors.map((color, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 rounded-full border border-gray-300 cursor-pointer"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Size and Quantity */}
              <div className="flex flex-col sm:flex-row items-start gap-4 mt-4">
                <div className="flex border border-gray-300 px-2 rounded-2xl items-center cursor-pointer">
                  <label className="text-sm font-medium mr-2">Size:</label>
                  <select
                    className="  rounded px-1 text-sm cursor-pointer"
                    defaultValue={item.size}
                  >
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button className="px-2.5  border font-medium border-gray-300 rounded-2xl text-sm cursor-pointer">
                    −
                  </button>
                  <span className="text-base font-medium">{item.quantity}</span>
                  <button className="px-2.5  border border-gray-300 font-medium rounded-2xl text-sm cursor-pointer">
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Remove */}
            <div className="mt-4 flex md:items-end justify-center md:px-20 md:mt-0 flex-shrink-0 ">
              <button className="text-sm text-gray-600 flex items-center gap-1 cursor-pointer">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_491_113)">
                    <path
                      d="M12.76 7.2453C12.5013 7.2453 12.2916 7.45498 12.2916 7.71368V16.5661C12.2916 16.8247 12.5013 17.0345 12.76 17.0345C13.0187 17.0345 13.2284 16.8247 13.2284 16.5661V7.71368C13.2284 7.45498 13.0187 7.2453 12.76 7.2453Z"
                      fill="#374151"
                    />
                    <path
                      d="M7.23181 7.24573C6.9731 7.24573 6.76343 7.4554 6.76343 7.71411V16.5666C6.76343 16.8251 6.9731 17.035 7.23181 17.035C7.49052 17.035 7.70019 16.8251 7.70019 16.5666V7.71411C7.70019 7.4554 7.49052 7.24573 7.23181 7.24573Z"
                      fill="#374151"
                    />
                    <path
                      d="M3.20455 5.9538V17.4938C3.20455 18.1758 3.45466 18.8164 3.89157 19.276C4.32647 19.7369 4.93171 19.9985 5.56513 19.9996H14.4271C15.0607 19.9985 15.6659 19.7369 16.1006 19.276C16.5375 18.8164 16.7876 18.1758 16.7876 17.4938V5.9538C17.6562 5.72326 18.219 4.8842 18.1028 3.99299C17.9864 3.10197 17.2273 2.43544 16.3286 2.43525H13.9305V1.84978C13.9333 1.35743 13.7386 0.884652 13.39 0.536841C13.0415 0.189213 12.568 -0.00436035 12.0756 -0.000335187H7.91655C7.4242 -0.00436035 6.9507 0.189213 6.60215 0.536841C6.25361 0.884652 6.05894 1.35743 6.06168 1.84978V2.43525H3.6636C2.76489 2.43544 2.00578 3.10197 1.88942 3.99299C1.77324 4.8842 2.33603 5.72326 3.20455 5.9538ZM14.4271 19.0628H5.56513C4.7643 19.0628 4.14132 18.3749 4.14132 17.4938V5.99496H15.8509V17.4938C15.8509 18.3749 15.2279 19.0628 14.4271 19.0628ZM6.99845 1.84978C6.99534 1.60589 7.09121 1.37115 7.26429 1.19898C7.43719 1.02681 7.67248 0.932222 7.91655 0.93643H12.0756C12.3197 0.932222 12.555 1.02681 12.7279 1.19898C12.901 1.37096 12.9969 1.60589 12.9937 1.84978V2.43525H6.99845V1.84978ZM3.6636 3.37202H16.3286C16.7942 3.37202 17.1717 3.74947 17.1717 4.21511C17.1717 4.68075 16.7942 5.0582 16.3286 5.0582H3.6636C3.19796 5.0582 2.82051 4.68075 2.82051 4.21511C2.82051 3.74947 3.19796 3.37202 3.6636 3.37202Z"
                      fill="#374151"
                    />
                    <path
                      d="M9.99633 7.2453C9.73763 7.2453 9.52795 7.45498 9.52795 7.71368V16.5661C9.52795 16.8247 9.73763 17.0345 9.99633 17.0345C10.255 17.0345 10.4647 16.8247 10.4647 16.5661V7.71368C10.4647 7.45498 10.255 7.2453 9.99633 7.2453Z"
                      fill="#374151"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_491_113">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Remove Item
              </button>
            </div>
          </div>
        ))}
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
            <span> ₹ 800</span>
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
