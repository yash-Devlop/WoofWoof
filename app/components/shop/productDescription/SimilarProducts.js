"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/user/cartSlice";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function SimilarProducts({ productId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [loadingWishlist, setLoadingWishlist] = useState({});
  const [loadingCart, setLoadingCart] = useState({});
  const router = useRouter();
  const dispatch = useDispatch();

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

  // Fetch user's wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get("/api/wishlist");
        setWishlist(res.data?.wishlist || []);
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
      }
    };
    fetchWishlist();
  }, []);

  const handleWishlistToggle = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();

    if (loadingWishlist[productId]) return;

    setLoadingWishlist((prev) => ({ ...prev, [productId]: true }));

    try {
      const res = await axios.post("/api/wishlist", { productId });
      
      if (wishlist.includes(productId)) {
        setWishlist((prev) => prev.filter((id) => id !== productId));
        toast.success("Removed from wishlist");
      } else {
        setWishlist((prev) => [...prev, productId]);
        toast.success("Added to wishlist");
      }
    } catch (err) {
      console.error("Wishlist toggle error:", err);
      if (err.response?.status === 401) {
        toast.error("Please login to add to wishlist");
      } else {
        toast.error("Failed to update wishlist");
      }
    } finally {
      setLoadingWishlist((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const handleAddToCart = async (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    if (loadingCart[product._id]) return;

    setLoadingCart((prev) => ({ ...prev, [product._id]: true }));

    try {
      await dispatch(
        addToCart({
          productId: product._id,
          quantity: 1,
          size: product.sizes?.[0] || null,
          color: product.colors?.[0]
            ? { name: product.colors[0].name, code: product.colors[0].code }
            : null,
        })
      );
      toast.success("Added to cart");
    } catch (err) {
      console.error("Add to cart error:", err);
      toast.error("Failed to add to cart");
    } finally {
      setLoadingCart((prev) => ({ ...prev, [product._id]: false }));
    }
  };

  const isInWishlist = (prodId) => wishlist.includes(prodId);

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
                  <span className="absolute top-2 left-2 bg-[#DE1244] text-white text-xs px-2 py-1 rounded-full z-10">
                    -
                    {Math.round(
                      ((product.markedPrice - product.price) / product.markedPrice) * 100
                    )}
                    %
                  </span>
                )}

                {/* Wishlist Icon */}
                <motion.button
                  onClick={(e) => handleWishlistToggle(e, product._id)}
                  disabled={loadingWishlist[product._id]}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-2 right-2 px-1.5 bg-white hover:bg-black hover:text-white transition-all duration-300 p-1 rounded-full shadow cursor-pointer z-10 disabled:opacity-50"
                  aria-label={isInWishlist(product._id) ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <motion.div
                    initial={false}
                    animate={{
                      scale: isInWishlist(product._id) ? [1, 1.3, 1] : 1,
                      rotate: isInWishlist(product._id) ? [0, 10, -10, 0] : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {isInWishlist(product._id) ? (
                      <FavoriteIcon 
                        fontSize="small" 
                        sx={{ 
                          color: "#ff0047",
                          filter: "drop-shadow(0 2px 4px rgba(255, 0, 71, 0.3))"
                        }} 
                      />
                    ) : (
                      <FavoriteBorderOutlinedIcon fontSize="small" />
                    )}
                  </motion.div>
                </motion.button>

                {/* Add to Cart Icon */}
                <motion.button
                  onClick={(e) => handleAddToCart(e, product)}
                  disabled={loadingCart[product._id]}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-12 right-2 px-1.5 bg-white hover:bg-black hover:text-white transition-all duration-300 p-1 rounded-full shadow cursor-pointer z-10 disabled:opacity-50"
                  aria-label="Add to cart"
                >
                  <ShoppingCartOutlinedIcon fontSize="small" />
                </motion.button>

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
                  <button 
                    onClick={(e) => handleAddToCart(e, product)}
                    disabled={loadingCart[product._id]}
                    className="w-full bg-black text-white text-sm py-2 opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer disabled:opacity-50"
                  >
                    {loadingCart[product._id] ? "Adding..." : "Add To Cart"}
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