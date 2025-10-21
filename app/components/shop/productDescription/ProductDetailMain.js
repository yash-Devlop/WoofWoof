"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "@/store/slices/user/productSlice";
import Image from "next/image";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { addToCart } from "@/store/slices/user/cartSlice";
import QuantitySelector from "./QuantitySelector";
import { motion } from "framer-motion";
import axios from "axios";
import ProductDetailSkeleton from "../../loader/ProductSkeletonLoader";

const normalizeUrl = (url) => {
  if (!url) return "/images/logo.png";
  if (url.startsWith("//")) return url.replace(/^\/\//, "/");
  if (!url.startsWith("/")) return "/" + url;
  return url;
};

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;

  if (url.includes('youtube.com/embed/')) {
    return url;
  }

  const standardMatch = url.match(/[?&]v=([^&]+)/);
  if (standardMatch) {
    return `https://www.youtube.com/embed/${standardMatch[1]}`;
  }

  const shortMatch = url.match(/youtu\.be\/([^?]+)/);
  if (shortMatch) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`;
  }

  return null;
};

export default function ProductDetailMain({ productId }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const productstate = useSelector((state) => state.product);
  const { loading, error, product } = productstate.productDetails;
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  const productImages = product?.images || ["/images/logo.png"];
  const [mainImage, setMainImage] = useState("/images/logo.png");

  useEffect(() => {
    if (product?.images?.length > 0) {
      setMainImage(product.images[0].url || "/images/logo.png");
    }
  }, [product]);

  useEffect(() => {
    if (productId) dispatch(fetchProductById(productId));
  }, [productId, dispatch]);

  useEffect(() => {
    if (product) {
      if (product.colors?.length > 0 && !selectedColor) {
        setSelectedColor(product.colors[0]);
      }
      if (product.sizes?.length > 0 && !selectedSize) {
        setSelectedSize(product.sizes[0]);
      }
    }
  }, [product]);

  // Fetch wishlist status for authenticated users
  useEffect(() => {
    const fetchWishlistStatus = async () => {
      if (!isAuthenticated || !productId) return;

      try {
        const res = await axios.get("/api/wishlist");
        const wishlist = res.data?.wishlist || [];
        setIsInWishlist(wishlist.includes(productId));
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
      }
    };

    fetchWishlistStatus();
  }, [productId, isAuthenticated]);

  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to add to wishlist");
      return;
    }

    if (isWishlistLoading) return;

    // Optimistic UI update
    const previousState = isInWishlist;
    setIsInWishlist(!isInWishlist);
    setIsWishlistLoading(true);

    try {
      await axios.post("/api/wishlist", { productId });

      // Show success message after API confirms
      toast.success(
        previousState ? "Removed from wishlist" : "Added to wishlist"
      );
    } catch (err) {
      // Rollback on error
      setIsInWishlist(previousState);
      console.error("Wishlist toggle error:", err);

      if (err.response?.status === 401) {
        toast.error("Please login to add to wishlist");
      } else {
        toast.error("Failed to update wishlist");
      }
    } finally {
      setIsWishlistLoading(false);
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId,
        quantity,
        size: selectedSize || null,
        color: selectedColor
          ? { name: selectedColor.name, code: selectedColor.code }
          : null,
      })
    );
  };

  const handleBuy = async () => {
    const result = await dispatch(
      addToCart({
        productId,
        quantity,
        size: selectedSize || null,
        color: selectedColor
          ? { name: selectedColor.name, code: selectedColor.code }
          : null,
      })
    );

    if (addToCart.fulfilled.match(result)) {
      router.push("/cart");
    } else {
      toast.error(result.payload?.message || "Unable to add to cart");
    }
  };

  if (loading) return <ProductDetailSkeleton />
  if (error) return <p className="p-8 text-center text-red-600">{error}</p>;
  if (!product) return null;

  const embedUrl = getYouTubeEmbedUrl(product?.embeddedVideoLink);

  return (
    <>
      <div className="relative bg-white m-4 rounded-3xl md:m-12 md:py-16 min-h-screen">
        <Image
          src="/images/bgPaws1.png"
          alt="bgpaws"
          fill
          className="h-full w-full absolute object-cover inset-0 opacity-30"
        />

        <div className="relative z-10 container mx-auto px-4 py-4 md:px-24 xl:px-20 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* LEFT: Product Images */}
            <div className="md:sticky top-10">
              <div className="w-full md:h-[500px] bg-gray-100 flex items-center justify-center rounded-3xl overflow-hidden">
                <Image
                  src={mainImage}
                  width={400}
                  height={400}
                  alt="Product"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex gap-4 mt-4">
                {productImages.map((image, idx) => (
                  <div
                    key={idx}
                    onClick={() => setMainImage(image.url)}
                    className="w-20 h-20 bg-gray-100 rounded-md p-1 cursor-pointer hover:scale-110 transition-transform"
                  >
                    <img
                      src={normalizeUrl(image?.url)}
                      alt={image?.alt || "thumbnail"}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Product Info */}
            <div className="mx-auto max-w-md">
              <h2 className="text-[#F91F54] font-semibold text-sm">Woof Woof</h2>
              <h1 className="text-2xl font-bold mt-1">{product?.name}</h1>
              <div className="flex items-center gap-2 mt-2 text-sm text-yellow-500">
                <p>{product?.reviews?.length} reviews</p>
                <p
                  className={
                    product?.inStock
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  {product?.inStock ? "IN STOCK" : "SOLD OUT"}
                </p>
              </div>

              <div className="mt-3">
                <span className="text-xl font-bold">{`₹ ${product?.price}`}</span>
                <span className="line-through text-gray-400 ml-2">{`₹ ${product?.markedPrice ?? product?.price + 50
                  }`}</span>
                <span className="text-red-400 pl-2">Inclusive of all taxes</span>
              </div>

              <div className="mt-3 border border-gray-300"></div>

              {/* COLOR SELECTION */}
              {product?.colors?.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="font-medium">Colours:</div>
                  <div className="flex gap-2 flex-wrap">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        title={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`w-7 h-7 rounded-full border-2 cursor-pointer transition-transform ${selectedColor?.code === color.code
                            ? "scale-110 border-[#F91F54]"
                            : "border-gray-300"
                          }`}
                        style={{ backgroundColor: color.code }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* SIZE SELECTION */}
              {product?.sizes?.length > 0 && (
                <div className="mt-3 flex gap-3 items-center flex-wrap">
                  <label className="font-medium">Size:</label>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`border rounded px-2 py-1 text-sm hover:bg-[#F91F54] hover:text-white transition ${selectedSize === size
                            ? "bg-[#F91F54] text-white"
                            : "text-gray-700"
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* QUANTITY & ACTIONS */}
              <div className="mt-6 space-y-3">
                {/* Top row: Quantity selector and wishlist on mobile, all inline on desktop */}
                <div className="flex items-center gap-4 justify-between md:justify-start">
                  <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

                  {/* WISHLIST ICON - Only show for authenticated users */}
                  {isAuthenticated && (
                    <motion.button
                      onClick={handleWishlistToggle}
                      disabled={isWishlistLoading}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="focus:outline-none disabled:opacity-50 p-2 rounded-full hover:bg-pink-50 transition-colors"
                      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <motion.div
                        initial={false}
                        animate={{
                          scale: isInWishlist ? [1, 1.3, 1] : 1,
                          rotate: isInWishlist ? [0, 10, -10, 0] : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {isInWishlist ? (
                          <FavoriteIcon
                            sx={{
                              color: "#F91F54",
                              fontSize: 32,
                              filter: "drop-shadow(0 2px 4px rgba(249, 31, 84, 0.3))"
                            }}
                          />
                        ) : (
                          <FavoriteBorderIcon
                            sx={{
                              color: "#F91F54",
                              fontSize: 32
                            }}
                          />
                        )}
                      </motion.div>
                    </motion.button>
                  )}
                </div>

                {/* Bottom row: Action buttons */}
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={handleBuy}
                    className="bg-[#F91F54] hover:bg-[#d20037] text-white px-6 py-2 rounded cursor-pointer transition-colors flex-1 min-w-[120px]"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="bg-[#F91F54] hover:bg-[#d20037] text-white px-6 py-2 rounded cursor-pointer transition-colors flex-1 min-w-[120px]"
                  >
                    Add to cart
                  </button>
                </div>
              </div>

              {/* DELIVERY INFO */}
              <div className="mt-6 border rounded p-4 space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <b>Free Delivery:</b>
                  <span className="text-gray-600">
                    Free shipping for all products
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <b>Delivery ETA:</b>
                  <span className="text-gray-600">
                    Estimate 5–7 business days
                  </span>
                </div>
              </div>

              {/* ACCORDION DETAILS */}
              <div className="mt-8">
                {["Description", "Details", "Care Instruction"].map((section, i) => {
                  const descMap = {
                    Description: product?.description?.additionalDetails,
                    Details: product?.description?.detailedInfo,
                    "Care Instruction": product?.description?.coreInstruction,
                  };
                  return (
                    <Accordion key={i}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{section}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {descMap[section] ||
                          `No additional ${section.toLowerCase()} available.`}
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded YouTube Video */}
      {embedUrl && (
        <div className="relative bg-white m-4 rounded-3xl md:m-12 md:py-16">
          <Image
            src="/images/bgPaws1.png"
            alt="bgpaws"
            fill
            className="h-full w-full absolute inset-0 opacity-30"
          />
          <div className="p-4 md:px-12 relative z-10">
            <h2 className="text-2xl font-bold text-center mb-6">Product Video</h2>
            <div className="max-w-4xl mx-auto">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-lg"
                  src={embedUrl}
                  title="Product Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}