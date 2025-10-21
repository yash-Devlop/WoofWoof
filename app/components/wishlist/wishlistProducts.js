"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/user/cartSlice";
import { useRouter } from "next/navigation";
import Spinner from "../loader/Spinner";

export default function WishlistPage() {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCart, setLoadingCart] = useState({});
  const [loadingRemove, setLoadingRemove] = useState({});
  const [userEmail, setUserEmail] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const res = await axios.get("/api/email/getUserEmail");
        setUserEmail(res.data?.email);
      } catch (err) {
        console.error("Failed to fetch user email:", err);
        if (err.response?.status === 401) {
          toast.error("Please login to view wishlist");
          router.push("/login");
        }
      }
    };
    fetchUserEmail();
  }, [router]);

  // Fetch wishlist and products
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);

        // Fetch user's wishlist
        const wishlistRes = await axios.get("/api/wishlist");
        const wishlistIds = wishlistRes.data?.wishlist || [];

        if (wishlistIds.length === 0) {
          setWishlistProducts([]);
          setLoading(false);
          return;
        }

        // Fetch all products
        const productsRes = await axios.get("/api/admin/products");
        const allProducts = productsRes.data?.products || [];

        // Filter products that are in wishlist
        const filteredProducts = allProducts.filter((product) =>
          wishlistIds.includes(product._id)
        );

        setWishlistProducts(filteredProducts);
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
        toast.error("Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchWishlist();
    }
  }, [userEmail]);

  const handleRemoveFromWishlist = async (productId) => {
    if (loadingRemove[productId]) return;

    setLoadingRemove((prev) => ({ ...prev, [productId]: true }));

    try {
      await axios.post("/api/wishlist", { productId });
      setWishlistProducts((prev) => prev.filter((p) => p._id !== productId));
      toast.success("Removed from wishlist");
    } catch (err) {
      console.error("Remove from wishlist error:", err);
      toast.error("Failed to remove from wishlist");
    } finally {
      setLoadingRemove((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const handleAddToCart = async (product) => {
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

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: i * 0.1 },
    }),
  };

  if (loading) {
    return (
      <div className="relative bg-white m-4 rounded-3xl md:m-12 md:py-20 min-h-screen">
        {/* <Image
          src="/images/bgPaws1.png"
          alt="bgpaws"
          fill
          className="h-full w-full absolute inset-0 opacity-30"
        />
        <div className="relative z-10 container mx-auto px-4 py-20">
          <p className="text-center text-gray-500 text-xl">Loading your wishlist...</p>
        </div> */}
        <Image
        src="/images/bgPaws1.png"
        alt="bgpaws"
        fill
        className="h-full w-full absolute inset-0 opacity-30"
      />
        <Spinner />
      </div>
    );
  }

  return (
    <div className="relative bg-white m-4 rounded-3xl md:m-12 py-16 min-h-screen">
      <Image
        src="/images/bgPaws1.png"
        alt="bgpaws"
        fill
        className="h-full w-full absolute inset-0 opacity-30"
      />

      <div className="relative z-10 container mx-auto px-4 py-8 md:px-24 xl:px-40">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <FavoriteIcon sx={{ color: "#ff0047", fontSize: 32 }} />
            <h1 className="text-3xl md:text-4xl font-bold">My Wishlist</h1>
          </div>
          <span className="text-gray-600 text-lg">
            {wishlistProducts.length} {wishlistProducts.length === 1 ? "item" : "items"}
          </span>
        </div>

        {/* Empty State */}
        {wishlistProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FavoriteIcon sx={{ color: "#ff0047", fontSize: 80, opacity: 0.3 }} />
            <h2 className="text-2xl font-semibold mt-6 text-gray-700">Your wishlist is empty</h2>
            <p className="text-gray-500 mt-2">Start adding products you love!</p>
            <Link
              href="/shop"
              className="mt-6 bg-[#F91F54] hover:bg-[#d20037] text-white px-8 py-3 rounded-lg transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistProducts.map((product, index) => (
              <motion.div
                key={product._id}
                custom={index}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Product Image */}
                <Link href={`/shop/${product._id}`} className="block relative">
                  <div className="relative w-full h-64 bg-gray-100">
                    <Image
                      src={product.images?.[0]?.url || "/images/no-image.png"}
                      alt={product.name || "Product"}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Discount Badge */}
                  {product.markedPrice && product.markedPrice > product.price && (
                    <span className="absolute top-3 left-3 bg-[#DE1244] text-white text-xs px-3 py-1 rounded-full font-medium">
                      -
                      {Math.round(
                        ((product.markedPrice - product.price) / product.markedPrice) * 100
                      )}
                      %
                    </span>
                  )}

                  {/* Stock Status */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        product.inStock
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-4">
                  <Link href={`/shop/${product._id}`}>
                    <h3 className="font-semibold text-lg mb-2 hover:text-[#F91F54] transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Category */}
                  {product.Category?.name && (
                    <p className="text-xs text-gray-500 mb-2">{product.Category.name}</p>
                  )}

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl font-bold text-[#F91F54]">₹{product.price}</span>
                    {product.markedPrice && (
                      <span className="text-sm line-through text-gray-400">
                        ₹{product.markedPrice}
                      </span>
                    )}
                  </div>

                  {/* Colors & Sizes */}
                  <div className="space-y-2 mb-4">
                    {product.colors?.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600 font-medium">Colors:</span>
                        <div className="flex gap-1">
                          {product.colors.slice(0, 5).map((color, idx) => (
                            <div
                              key={idx}
                              title={color.name}
                              className="w-5 h-5 rounded-full border-2 border-gray-300"
                              style={{ backgroundColor: color.code }}
                            />
                          ))}
                          {product.colors.length > 5 && (
                            <span className="text-xs text-gray-500">+{product.colors.length - 5}</span>
                          )}
                        </div>
                      </div>
                    )}

                    {product.sizes?.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600 font-medium">Sizes:</span>
                        <div className="flex gap-1 flex-wrap">
                          {product.sizes.slice(0, 4).map((size, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 bg-gray-100 rounded border border-gray-300"
                            >
                              {size}
                            </span>
                          ))}
                          {product.sizes.length > 4 && (
                            <span className="text-xs text-gray-500">+{product.sizes.length - 4}</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  {/* <div className="flex gap-2">
                    <motion.button
                      onClick={() => handleAddToCart(product)}
                      disabled={loadingCart[product._id] || !product.inStock}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-[#F91F54] hover:bg-[#d20037] text-white py-2 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <ShoppingCartOutlinedIcon fontSize="small" />
                      {loadingCart[product._id] ? "Adding..." : "Add to Cart"}
                    </motion.button>

                    <motion.button
                      onClick={() => handleRemoveFromWishlist(product._id)}
                      disabled={loadingRemove[product._id]}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Remove from wishlist"
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </motion.button>
                  </div> */}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}