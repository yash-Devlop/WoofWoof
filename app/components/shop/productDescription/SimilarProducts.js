"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useRouter } from "next/navigation";

export default function SimilarProducts({ productId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!productId) return;

    const controller = new AbortController();

    async function fetchSimilarProducts() {
      try {
        const res = await axios.get(`/api/similarProducts?productId=${productId}`, {
          signal: controller.signal,
          headers: { "Cache-Control": "no-store" },
        });

        const data = Array.isArray(res.data)
          ? res.data
          : res.data.products || res.data.data || [];

        setProducts(data);
      } catch (err) {
        if (!axios.isCancel(err)) console.error("Error fetching similar products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSimilarProducts();
    return () => controller.abort();
  }, [productId]);

  return (
    <div className="relative bg-white m-4 rounded-3xl md:m-12 md:py-16">
      <Image
        src="/images/bgPaws1.png"
        alt="bgpaws"
        fill
        className="h-full w-full absolute inset-0 opacity-30"
      />
      <div className="p-4 md:px-12 relative z-10">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 border-l-4 border-red-500 pl-2">
          Related Products
        </h2>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2 snap-x">
          {loading ? (
            <p className="text-gray-500 text-center w-full">Loading...</p>
          ) : products.length === 0 ? (
            <p className="text-gray-500 text-center w-full">
              No related products found.
            </p>
          ) : (
            products.map((product, idx) => (
              <div
                key={product._id || idx}
                className="min-w-[220px] max-w-[240px] bg-white rounded-xl shadow-xl relative group hover:scale-105 transition-all duration-300 my-4 snap-center"
              >
                {/* Discount Badge */}
                {product.markedPrice && product.markedPrice > product.price && (
                  <span className="absolute top-2 left-2 bg-[#DE1244] text-white text-xs px-2 py-1 rounded-full">
                    -
                    {Math.round(
                      ((product.markedPrice - product.price) / product.markedPrice) * 100
                    )}
                    %
                  </span>
                )}

                {/* Wishlist Icon */}
                <button className="absolute top-2 right-2 px-1.5 bg-white hover:bg-black hover:text-white transition-all duration-300 p-1 rounded-full shadow cursor-pointer">
                  <FavoriteBorderOutlinedIcon fontSize="small" />
                </button>

                {/* Add to Cart Icon */}
                <button className="absolute top-12 right-2 px-1.5 bg-white hover:bg-black hover:text-white transition-all duration-300 p-1 rounded-full shadow cursor-pointer">
                  <ShoppingCartOutlinedIcon fontSize="small" />
                </button>

                {/* Product Image */}
                <div
                  className="w-full h-[240px] flex flex-col bg-[#EEEEEE] items-center justify-center overflow-hidden rounded-2xl cursor-pointer"
                  onClick={() => router.push(`/shop/${product._id}`)}
                >
                  <Image
                    src={product?.images?.[0]?.url || "/images/no-image.png"}
                    alt={product?.name || "Product"}
                    width={200}
                    height={200}
                    className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  <button className="w-full bg-black text-white text-sm py-2 opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer">
                    Add To Cart
                  </button>
                </div>

                {/* Product Info */}
                <div className="mt-2 px-4 pb-4">
                  <h3 className="text-sm font-medium truncate">{product.name}</h3>
                  <div className="text-sm mt-1">
                    <span className="text-red-500 font-bold">₹{product.price}</span>{" "}
                    {product.markedPrice && (
                      <span className="line-through text-gray-400 text-xs">
                        ₹{product.markedPrice}
                      </span>
                    )}
                  </div>

                  {/* Ratings */}
                  <div className="text-yellow-500 text-sm mt-1">
                    {"★".repeat(Math.round(product.rating || 0))}{" "}
                    <span className="text-gray-500 text-xs">
                      ({product.reviews?.length || 0})
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
