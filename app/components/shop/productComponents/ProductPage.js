"use client";
import ProductGrid from "./ProductGrid";
import PaginationSec from "./Pagination";
import FilterSidebar from "./FilterSidebar";
import ShopByCategory from "./ShopByCategory";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "@/store/slices/user/productSlice";
import { useEffect } from "react";
import { fetchProducts } from "@/store/slices/user/productSlice";

export default function ProductPage() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.product.filters);

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
    dispatch(fetchProducts());
  }, [dispatch, filters]);

  return (
    <div className="w-full relative ">
      <div className="bg-white rounded-3xl p-4 mx-4 md:m-0 md:mx-12 md:p-10">
        <div className=" mb-8">
          <ShopByCategory />
        </div>

        <div className=" py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <aside className="w-full lg:w-1/4">
              <FilterSidebar />
            </aside>
            <main className="w-full lg:w-3/4 px-4">
              <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                <div className="flex gap-2">
                  <div className="w-full relative">
                    <select
                      className="cursor-pointer border appearance-none w-full rounded-2xl px-3 pr-6 py-1 text-sm"
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
                      className="cursor-pointer border appearance-none w-full rounded-2xl px-3 pr-10 py-1 text-sm"
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
                <div className="relative mx-auto md:mx-0">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="px-3 py-1.5 rounded-full border bg-gray-300 border-none"
                  />
                  <div className=" absolute top-1 right-1.5 bg-black px-0.5 text-white rounded-full">
                    <SearchIcon className=" cursor-pointer" />
                  </div>
                </div>
              </div>
              <ProductGrid />
              <PaginationSec />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
