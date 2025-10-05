"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setCategory } from "@/store/slices/user/productSlice";
import axios from "axios";

const ShopByCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/user/category"); // 👈 adjust if your route is different
        setCategories(res.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  console.log("Fetched categories:", categories);
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
      image: "/images/category/accessories.png",
    },
  ];
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (selectedCategory) {
      const selected = categories.find((cat) => cat._id === selectedCategory);
      if (selected) {
        dispatch(setCategory(selected.name));
        dispatch(fetchProducts());
      }
    }
  }, [selectedCategory, dispatch]);

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
    <div className="relative">
      <div className="flex w-full justify-between mb-8">
        <h2 className="text-2xl mx-auto my-auto md:text-4xl font-semibold">Shop By Category</h2>
      </div>

      <div
        className="relative flex overflow-y-hidden overflow-x-auto gap-4"
        style={{ position: "relative" }}
      >
        {categories.map((category, index) => (
          <motion.div
            key={category._id}
            onClick={() => {
              setSelectedCategory(category._id);
            }}
            custom={index}
            variants={fadeDown}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative min-w-[80px] md:min-w-[170px] lg:min-w-[420px] cursor-pointer p-4 rounded-xl flex flex-col items-center transition-transform hover:scale-105 duration-300"
          >
            {selectedCategory === category._id && (
              <motion.div
                layoutId="categoryBg"
                className="absolute top-0 left-0 w-full h-full z-0 rounded-xl overflow-y-hidden"
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
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ShopByCategory;
