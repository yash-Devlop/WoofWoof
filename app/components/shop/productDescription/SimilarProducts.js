"use client";
import Image from "next/image";
import React from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

export default function SimilarProducts({}) {
  const products = [
    {
      title: "Yellow Ball",
      price: 120,
      oldPrice: 240,
      rating: 4,
      reviews: 88,
      discount: 50,
      image: "/images/products/yellowBall.png",
    },
    {
      title: "Red Ball",
      price: 960,
      oldPrice: 1160,
      rating: 5,
      reviews: 76,
      discount: 35,
      image: "/images/products/redBall.png",
    },
    {
      title: "Blue Ball",
      price: 370,
      oldPrice: 490,
      rating: 4,
      reviews: 109,
      discount: 33,
      image: "/images/products/blueBall.png",
    },
    {
      title: "Blue Ball with white dots",
      price: 160,
      oldPrice: 170,
      rating: 4,
      reviews: 65,
      image: "/images/products/blueWhiteBall.png",
    },
    {
      title: "Blue Ball with white dots",
      price: 160,
      oldPrice: 170,
      rating: 4,
      reviews: 65,
      image: "/images/dotted-blue-ball.png",
    },
    {
      title: "Blue Ball with white dots",
      price: 160,
      oldPrice: 170,
      rating: 4,
      reviews: 65,
      image: "/images/dotted-blue-ball.png",
    },
    {
      title: "Blue Ball with white dots",
      price: 160,
      oldPrice: 170,
      rating: 4,
      reviews: 65,
      image: "/images/dotted-blue-ball.png",
    },
    {
      title: "Blue Ball with white dots",
      price: 160,
      oldPrice: 170,
      rating: 4,
      reviews: 65,
      image: "/images/dotted-blue-ball.png",
    },
    {
      title: "Blue Ball with white dots",
      price: 160,
      oldPrice: 170,
      rating: 4,
      reviews: 65,
      image: "/images/dotted-blue-ball.png",
    },
  ];

  return (
    <div className="relative bg-white m-4 rounded-3xl md:m-12 md:py-16">
      <Image
        src="/images/bgPaws1.png"
        alt="bgpaws"
        fill
        className=" h-full w-full absolute inset-0 opacity-30"
      />
      <div className="p-4 md:px-12">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 border-l-4 border-red-500 pl-2">
          Related Items
        </h2>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="min-w-[220px] max-w-[240px] bg-white rounded-xl shadow-xl relative group hover:scale-105 transition-all duration-300 my-4"
            >
              {/* Discount Badge */}
              {product.discount && (
                <span className="absolute top-2 left-2 bg-[#DE1244] text-white text-xs px-2 py-1 rounded-full">
                  -{product.discount}%
                </span>
              )}

              {/* Wishlist Icon */}
              <button className="absolute top-2 right-2 px-1.5 bg-white hover:bg-black hover:text-white transition-all duration-300 p-1 rounded-full shadow cursor-pointer">
                <FavoriteBorderOutlinedIcon fontSize="small" />
              </button>

              <button className="absolute top-12 right-2 px-1.5 bg-white hover:bg-black hover:text-white transition-all duration-300 p-1 rounded-full shadow cursor-pointer">
                <ShoppingCartOutlinedIcon fontSize="small" />
              </button>

              {/* Product Image */}
              <div className="w-full h-[240px] flex flex-col bg-[#EEEEEE] items-center justify-center overflow-hidden rounded-2xl">
                <Image
                  src={product?.image}
                  alt={product?.title}
                  width={200}
                  height={200}
                  className="h-full object-contain"
                />
                <button className=" w-full bg-black text-white text-sm py-2 opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer">
                  Add To Cart
                </button>
              </div>

              {/* Add to Cart Button */}

              {/* Product Info */}
              <div className=" mt-2 px-4 pb-4">
                <h3 className="text-sm font-medium">{product.title}</h3>
                <div className="text-sm mt-1">
                  <span className="text-red-500 font-bold">
                    ₹{product.price}
                  </span>{" "}
                  <span className="line-through text-gray-400 text-xs">
                    ₹{product.oldPrice}
                  </span>
                </div>

                {/* Ratings */}
                <div className="text-yellow-500 text-sm mt-1">
                  {"★".repeat(product.rating)}{" "}
                  <span className="text-gray-500 text-xs">
                    ({product.reviews})
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
