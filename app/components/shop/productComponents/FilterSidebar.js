"use client";
import React, { useEffect, useRef, useState } from "react";
import Slider from "@mui/material/Slider";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProducts,
  setPriceRange,
  toogleTag,
} from "@/store/slices/user/productSlice";

const FilterSidebar = () => {
  const dispatch = useDispatch();
  const selectedTags = useSelector((state) => state.product.filters.tags);
  const maxPrice = useSelector((state) => state.product.filters.maxPrice);
  const minPrice = useSelector((state) => state.product.filters.minPrice);
  const priceRange = [minPrice, maxPrice];

  // Create a ref to hold the timeout ID
  const debounceRef = useRef(null);

  const handleChange = (event, newValue) => {
    dispatch(setPriceRange(newValue));

    // Clear any existing timer
    clearTimeout(debounceRef.current);

    // Set a new timer
    debounceRef.current = setTimeout(() => {
      dispatch(fetchProducts());
    }, 500); // delay in milliseconds
  };

  useEffect(() => {
    return () => clearTimeout(debounceRef.current);
  }, []);

  return (
    <div className="bg-white px-4 rounded-2xl space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Filter by Price</h2>
        <Slider
          value={priceRange}
          onChange={handleChange}
          valueLabelDisplay="auto"
          min={0}
          max={5000}
          step={100}
          sx={{
            color: "#ff3971e5", // this changes the track, thumb, and active color
            "& .MuiSlider-thumb": {
              borderRadius: "50%",
            },
          }}
        />
        <div className=" flex justify-between mt-2">
          <div className="flex gap-1 text-lg font-semibold mt-1 text-gray-600">
            <span>₹{priceRange[0]}</span>
            <span>
              <HorizontalRuleIcon />
            </span>
            <span>₹{priceRange[1]}</span>
          </div>
          <button className=" transition-transform hover:scale-105 duration-300 px-4 bg-black text-white py-1 rounded-full cursor-pointer">
            Apply
          </button>
        </div>
      </div>

      <div>
        <h2 className="font-semibold mb-2">Filter by Tags</h2>
        <div className="flex flex-wrap gap-2">
          {["toys", "bones", "Natural", "balls", "Small dog", "Tent"].map(
            (tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => {
                    dispatch(toogleTag(tag));
                    clearTimeout(debounceRef.current);
                    debounceRef.current = setTimeout(() => {
                      dispatch(fetchProducts());
                    }, 300); // slight debounce for better UX
                  }}
                  className={`text-sm px-3 py-1 rounded-full cursor-pointer transition-transform hover:scale-105 ${
                    isSelected
                      ? "bg-[#ffcad7] font-semibold"
                      : "bg-[#EEEEEE] font-medium"
                  }`}
                >
                  {tag}
                </button>
              );
            }
          )}
        </div>
      </div>

      <div>
        <h2 className="font-semibold mb-2">Popular Products</h2>
        <ul className="space-y-2 text-sm text-gray-800">
          <li>🧸 Pink Star Pillow - ₹99</li>
          <li>🍉 Watermelon Pillow - ₹220</li>
          <li>🐶 Bone Pillow - ₹50</li>
        </ul>
      </div>
    </div>
  );
};

export default FilterSidebar;
