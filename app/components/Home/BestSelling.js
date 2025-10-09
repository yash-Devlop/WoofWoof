"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { motion } from "framer-motion";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BestSelling = () => {
  const [products, setProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Fetch best-selling products
  useEffect(() => {
    const fetchBestSelling = async () => {
      try {
        const res = await axios.get("/api/bestProducts");
        setProducts(res.data?.products?.slice(0, 8) || []);
      } catch (err) {
        console.error("Failed to fetch best-selling products:", err);
      }
    };
    fetchBestSelling();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fadeDown = {
    hidden: { opacity: 0, y: -30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: i * 0.2 },
    }),
  };

  if (!products.length) {
    return (
      <div className="w-full text-center py-20">
        <span className="text-gray-500 text-xl">Loading best-selling products...</span>
      </div>
    );
  }

  // Slider settings for mobile
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="w-full relative">
      <div className="bg-white rounded-3xl m-4 md:m-12 py-8 md:py-16">
        <div className="px-4 md:px-20 xl:px-40">
          <div className="flex w-full justify-center">
            <h2 className="text-4xl font-semibold">Best Selling Products</h2>
          </div>

          {isMobile ? (
            // Mobile Slider
            <div className="mt-10">
              <Slider {...sliderSettings}>
                {products.map((product, index) => (
                  <motion.div
                    key={product._id}
                    custom={index}
                    variants={fadeDown}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="px-2"
                  >
                    <Link
                      href={`/shop/${product._id}`}
                      className="relative flex flex-col items-center justify-center"
                    >
                      {product.discount && (
                        <div className="absolute top-2 left-2 z-10 bg-[#FF3971] text-sm px-1 rounded-full">
                          {product.discount}% off
                        </div>
                      )}
                      <Image
                        src={product.images?.[0]?.url || "/images/no-image.png"}
                        alt={product.name || "Product"}
                        width={200}
                        height={200}
                        className="rounded-t-2xl w-full object-cover hover:scale-105 transition-all duration-500 cursor-pointer"
                      />
                      <div className="flex flex-col gap-2 mt-4 px-2 w-full">
                        <div className="flex justify-between">
                          <span className="text-lg font-semibold">{product.name}</span>
                          <FavoriteBorderIcon sx={{ color: "#ff0047" }} />
                        </div>
                        <div className="text-sm">
                          <span>Rs. </span>
                          <span>{product.price}</span>
                          {product.markedPrice && (
                            <span className="line-through ml-2 text-gray-500">
                              Rs. {product.markedPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </Slider>
            </div>
          ) : (
            // Desktop grid
            <div className="overflow-x-auto lg:overflow-x-visible no-scrollbar scrollbar-hide">
              <div className="flex gap-6 mt-10 lg:grid lg:grid-cols-3 xl:grid-cols-4 md:px-0">
                {products.map((product, index) => (
                  <motion.div
                    key={product._id}
                    custom={index}
                    variants={fadeDown}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <Link
                      href={`/shop/${product._id}`}
                      className="relative flex flex-col items-center justify-center"
                    >
                      {product.discount && (
                        <div className="absolute top-2 left-2 z-10 bg-[#FF3971] text-sm px-1 rounded-full">
                          {product.discount}% off
                        </div>
                      )}
                      <Image
                        src={product.images?.[0]?.url || "/images/no-image.png"}
                        alt={product.name || "Product"}
                        width={200}
                        height={200}
                        className="rounded-t-2xl w-full object-cover hover:scale-105 transition-all duration-500 cursor-pointer"
                      />
                      <div className="flex flex-col gap-2 mt-4 px-2 w-full">
                        <div className="flex justify-between">
                          <span className="text-lg font-semibold">{product.name}</span>
                          <FavoriteBorderIcon sx={{ color: "#ff0047" }} />
                        </div>
                        <div className="text-sm">
                          <span>Rs. </span>
                          <span>{product.price}</span>
                          {product.markedPrice && (
                            <span className="line-through ml-2 text-gray-500">
                              Rs. {product.markedPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestSelling;
