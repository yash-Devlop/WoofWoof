"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { motion } from "framer-motion";

const productData = [
  {
    id: 1,
    title: "Carry Bag",
    image: "/images/product1.jpg",
    price: "300",
  },
  {
    id: 2,
    title: "Tent",
    image: "/images/product2.jpg",
    price: "300",
  },
  {
    id: 3,
    title: "Dog Leash",
    image: "/images/product3.jpg",
    price: "300",
  },
  {
    id: 4,
    title: "Toy",
    image: "/images/product4.jpg",
    price: "300",
  },
  {
    id: 5,
    title: "Dog Bowl",
    image: "/images/product5.jpg",
    price: "300",
  },
  {
    id: 6,
    title: "Dog Clothes",
    image: "/images/product6.jpg",
    price: "300",
  },
  {
    id: 7,
    title: "Dog Bed",
    image: "/images/product7.jpg",
    price: "300",
  },
  {
    id: 8,
    title: "Dog Food",
    image: "/images/product8.jpg",
    price: "300",
  },
];

const BestSelling = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // mobile breakpoint
    };
    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fadeDown = {
    hidden: { opacity: 0, y: -30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: i * 0.2, // stagger based on index
      },
    }),
  };

  return (
    <div className="w-full relative">
      <div className="bg-white rounded-3xl m-4 md:m-12 py-8 md:py-16">
        <div className=" px-4 md:px-20 xl:px-40">
          <div className="flex w-full justify-center">
            <h2 className=" text-4xl font-semibold">Best Selling Products</h2>
          </div>
          <div className="overflow-x-auto lg:overflow-x-visible no-scrollbar scrollbar-hide">
            <div className="flex gap-6 mt-10  lg:grid lg:grid-cols-3 xl:grid-cols-4 md:px-0">
              {productData.map((product, index) => (
                <motion.div
                  key={product.id}
                  className=""
                  custom={index}
                  variants={fadeDown}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div className="relative flex h-[120px] w-[120px] md:w-[200px]  md:h-[200px] lg:w-full justify-center">
                    <div className=" absolute bottom-1 z-10 left-1 md:bottom-2 md:left-2">
                      <div className=" bg-[#FF3971] text-sm px-1 rounded-full">
                        20% off
                      </div>
                    </div>
                    <Image
                      src={product.image}
                      alt="dogHut"
                      width={200}
                      height={200}
                      className="rounded-t-2xl w-full object-cover  hover:scale-105 transition-all duration-500 cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col md:gap-2 mt-4 px-2">
                    <div className="flex justify-between">
                      <span className="text-sm md:text-xl font-semibold">
                        {product.title}
                      </span>
                      <FavoriteBorderIcon sx={{ color: "#ff0047" }} />
                    </div>
                    <div className="text-sm">
                      <span>Rs. </span>
                      <span>{product.price}</span>
                      <span className="line-through ml-2 text-gray-500">
                        Rs. {Number(product.price) + 200}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSelling;
