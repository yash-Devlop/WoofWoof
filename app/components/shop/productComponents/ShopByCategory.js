"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setCategory } from "@/store/slices/user/productSlice";

const ShopByCategory = () => {
  const categoryData = [
    {
      id: "1",
      name: "Pet Toy",
      image: "/images/category/toy.png",
    },
    {
      id: "2",
      name: "Pet Accessories",
      image: "/images/category/accessories.png",
    },
    {
      id: "3",
      name: "Birthday Gift",
      image: "/images/category/birthday.png",
    },
  ];
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (selectedCategory) {
      const selected = categoryData.find((cat) => cat.id === selectedCategory);
      if (selected) {
        dispatch(setCategory(selected.name));
        dispatch(fetchProducts());
      }
    }
  }, [selectedCategory, dispatch]);

  return (
    <div className="relative">
      <div className="flex w-full justify-between mb-8">
        <h2 className="text-2xl md:text-4xl font-semibold">Shop By Category</h2>
      </div>

      <div
        className="relative grid grid-cols-3 gap-4"
        style={{ position: "relative" }}
      >
        {categoryData.map((category) => (
          <div
            key={category.id}
            onClick={() => {
              setSelectedCategory(category.id);
            }}
            className="relative cursor-pointer p-4 rounded-xl flex flex-col items-center transition-transform hover:scale-105 duration-300"
          >
            {selectedCategory === category.id && (
              <motion.div
                layoutId="categoryBg"
                className="absolute top-0 left-0 w-full h-full z-0 rounded-xl overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Image
                  src="/images/transitionBg.png"
                  alt="Vector BG"
                  fill
                  className="object-contain"
                />
              </motion.div>
            )}

            <div className="relative z-10">
              <Image
                src={category.image}
                alt={category.name}
                width={100}
                height={100}
                className="object-cover"
              />
              <h3 className="mt-2 text-sm md:text-lg text-center font-semibold">
                {category.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByCategory;
