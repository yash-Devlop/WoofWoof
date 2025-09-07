"use client";
import React, { useEffect, useRef, useState } from "react";
import Slider from "@mui/material/Slider";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { useDispatch, useSelector } from "react-redux";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import { setSort } from "@/store/slices/user/productSlice";
import Link from "next/link";

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

  const handlePriceSort = (e) => {
    const value = e.target.value;
    if (value === "Low to High") {
      dispatch(setSort({ type: "price", order: "asc" }));
    } else if (value === "High to Low") {
      dispatch(setSort({ type: "price", order: "desc" }));
    }
    dispatch(fetchProducts());
  };

  const handleOtherSort = (e) => {
    const value = e.target.value;
    if (value === "Latest") {
      dispatch(setSort({ type: "latest", order: "desc" }));
    } else if (value === "Popularity") {
      dispatch(setSort({ type: "popularity", order: "desc" }));
    }
    dispatch(fetchProducts());
  };

  useEffect(() => {
    return () => clearTimeout(debounceRef.current);
  }, []);

  return (
    <div className=" px-4 rounded-2xl space-y-6">
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
                  className={`text-sm px-3 py-1 rounded-lg cursor-pointer transition-transform hover:scale-105 ${
                    isSelected
                      ? "bg-[#ffcad7] font-semibold"
                      : "bg-white font-medium"
                  }`}
                >
                  {tag}
                </button>
              );
            }
          )}
        </div>
      </div>

      <div className="flex md:hidden justify-between items-center mb-4 flex-wrap gap-2">
        <div className="flex gap-2">
          <div className="w-full relative">
            <select
              className="cursor-pointer border appearance-none w-full rounded-lg px-3 pr-6 py-1 text-sm"
              onChange={handlePriceSort}
              defaultValue="Sort by Price"
            >
              <option disabled>Sort by Price</option>
              <option>Low to High</option>
              <option>High to Low</option>
            </select>
            <ArrowDropDownIcon
              className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
              fontSize="small"
            />
          </div>

          <div className="w-full relative">
            <select
              className="cursor-pointer border appearance-none w-full rounded-lg px-3 pr-10 py-1 text-sm"
              onChange={handleOtherSort}
              defaultValue="Sort by"
            >
              <option disabled>Sort by</option>
              <option>Latest</option>
              <option>Popularity</option>
            </select>
            <ArrowDropDownIcon
              className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
              fontSize="small"
            />
          </div>
        </div>
        <div className="hidden md:block relative mx-auto md:mx-0">
          <input
            type="text"
            placeholder="Search products..."
            className="px-3 py-1.5 rounded-full border bg-gray-300 border-none"
          />
          <div className="  absolute top-1 right-1.5 bg-black px-0.5 text-white rounded-full">
            <SearchIcon className=" cursor-pointer" />
          </div>
        </div>
      </div>

      <div className=" hidden md:block">
        <h2 className="font-semibold mb-2">Popular Products</h2>
        <ul className="space-y-2 text-sm text-gray-800">
          <li>
            <Link href="/shop/6828722bea10c7d7b8db0163" className="hover:underline">
              Pink Star Pillow - ₹29.99
            </Link>
          </li>
          <li>
            <Link href="/shop/683ae02b292494f3b0373621" className="hover:underline">
              Party Cap - ₹145
            </Link>
          </li>
          <li>
            <Link href="/shop/683ad89e292494f3b03734db" className="hover:underline">
              Pink Pet Collar - ₹249
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FilterSidebar;
