// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import { motion } from "framer-motion";
// import axios from "axios";
// import Slider from "react-slick";
// import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Spinner from "../loader/Spinner";
// import SkeletonLoader from "../loader/SkeletonLoader";

// const BestSelling = () => {
//   const [products, setProducts] = useState([]);
//   const [isMobile, setIsMobile] = useState(false);
//   const [wishlist, setWishlist] = useState([]);
//   const [loadingWishlist, setLoadingWishlist] = useState({});
//   const { isAuthenticated } = useSelector((state) => state.auth);

//   // Fetch best-selling products
//   useEffect(() => {
//     const fetchBestSelling = async () => {
//       try {
//         const res = await axios.get("/api/bestProducts");
//         setProducts(res.data?.products?.slice(0, 8) || []);
//       } catch (err) {
//         console.error("Failed to fetch best-selling products:", err);
//       }
//     };
//     fetchBestSelling();
//   }, []);

//   // Fetch user's wishlist on mount (only for authenticated users)
//   useEffect(() => {
//     const fetchWishlist = async () => {
//       if (!isAuthenticated) return;

//       try {
//         const res = await axios.get("/api/wishlist");
//         setWishlist(res.data?.wishlist || []);
//       } catch (err) {
//         console.error("Failed to fetch wishlist:", err);
//       }
//     };
//     fetchWishlist();
//   }, [isAuthenticated]);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleWishlistToggle = async (e, productId) => {
//     // Stop all event propagation immediately
//     e.preventDefault();
//     e.stopPropagation();
//     e.nativeEvent.stopImmediatePropagation();

//     // Check authentication
//     if (!isAuthenticated) {
//       toast.error("Please login to add to wishlist");
//       return;
//     }

//     // Prevent multiple clicks
//     if (loadingWishlist[productId]) return;

//     // Optimistic UI update
//     const previousWishlist = [...wishlist];
//     const wasInWishlist = wishlist.includes(productId);

//     // Update UI immediately
//     if (wasInWishlist) {
//       setWishlist((prev) => prev.filter((id) => id !== productId));
//     } else {
//       setWishlist((prev) => [...prev, productId]);
//     }

//     setLoadingWishlist((prev) => ({ ...prev, [productId]: true }));

//     try {
//       await axios.post("/api/wishlist", { productId });

//       // Show success toast after API confirms
//       toast.success(wasInWishlist ? "Removed from wishlist" : "Added to wishlist");
//     } catch (err) {
//       // Rollback on error
//       setWishlist(previousWishlist);

//       console.error("Wishlist toggle error:", err);
//       if (err.response?.status === 401) {
//         toast.error("Please login to add to wishlist");
//       } else {
//         toast.error("Failed to update wishlist");
//       }
//     } finally {
//       setLoadingWishlist((prev) => ({ ...prev, [productId]: false }));
//     }
//   };

//   const isInWishlist = (productId) => wishlist.includes(productId);

//   const fadeDown = {
//     hidden: { opacity: 0, y: -30 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut", delay: i * 0.2 },
//     }),
//   };

//   if (!products.length) {  // ← Fix: was products.length, should be !products.length
//     return (
//       <div className="w-full relative">
//         <div className="bg-white rounded-3xl m-4 md:m-12 py-8 md:py-16">
//           <div className="px-4 md:px-20 xl:px-40">
//             <div className="flex w-full justify-center">
//               <h2 className="text-4xl font-semibold">Best Selling Products</h2>
//             </div>

//             {isMobile ? (
//               <div className="mt-10">
//                 <SkeletonLoader count={8} isMobile={isMobile} />
//               </div>
//             ) : (
//               <div className="overflow-x-auto lg:overflow-x-visible no-scrollbar scrollbar-hide">
//                 <div className="flex gap-6 mt-10 lg:grid lg:grid-cols-3 xl:grid-cols-4 md:px-0">
//                   <SkeletonLoader count={8} isMobile={isMobile} />
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Slider settings for mobile
//   const sliderSettings = {
//     dots: true,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   const ProductCard = ({ product, index }) => (
//     <motion.div
//       key={product._id}
//       custom={index}
//       variants={fadeDown}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, amount: 0.2 }}
//       className={isMobile ? "px-2" : ""}
//     >
//       <div className="relative flex flex-col items-center justify-center">
//         <Link href={`/shop/${product._id}`} className="w-full">
//           {product.discount && (
//             <div className="absolute top-2 left-2 z-10 bg-[#FF3971] text-white text-sm px-2 py-1 rounded-full">
//               {product.discount}% off
//             </div>
//           )}
//           <Image
//             src={product.images?.[0]?.url || "/images/no-image.png"}
//             alt={product.name || "Product"}
//             width={200}
//             height={200}
//             className="rounded-t-2xl w-full object-cover hover:scale-105 transition-all duration-500 cursor-pointer"
//           />
//         </Link>
//         <div className="flex flex-col gap-2 mt-4 px-2 w-full">
//           <div className="flex justify-between items-center">
//             <Link href={`/shop/${product._id}`} className="flex-1">
//               <span className="text-lg font-semibold hover:text-[#F91F54] transition-colors">
//                 {product.name}
//               </span>
//             </Link>

//             {/* Wishlist Icon - Only show for authenticated users */}
//             {isAuthenticated && (
//               <motion.button
//                 onClick={(e) => handleWishlistToggle(e, product._id)}
//                 disabled={loadingWishlist[product._id]}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="focus:outline-none disabled:opacity-50 z-20 relative ml-2"
//                 aria-label={isInWishlist(product._id) ? "Remove from wishlist" : "Add to wishlist"}
//                 type="button"
//               >
//                 <motion.div
//                   initial={false}
//                   animate={{
//                     scale: isInWishlist(product._id) ? [1, 1.3, 1] : 1,
//                     rotate: isInWishlist(product._id) ? [0, 10, -10, 0] : 0,
//                   }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   {isInWishlist(product._id) ? (
//                     <FavoriteIcon
//                       sx={{
//                         color: "#F91F54",
//                         fontSize: 28,
//                         filter: "drop-shadow(0 2px 4px rgba(249, 31, 84, 0.3))"
//                       }}
//                     />
//                   ) : (
//                     <FavoriteBorderIcon
//                       sx={{
//                         color: "#F91F54",
//                         fontSize: 28
//                       }}
//                     />
//                   )}
//                 </motion.div>
//               </motion.button>
//             )}
//           </div>
//           <Link href={`/shop/${product._id}`}>
//             <div className="text-sm">
//               <span>Rs. </span>
//               <span>{product.price}</span>
//               {product.markedPrice && (
//                 <span className="line-through ml-2 text-gray-500">
//                   Rs. {product.markedPrice}
//                 </span>
//               )}
//             </div>
//           </Link>
//         </div>
//       </div>
//     </motion.div>
//   );

//   return (
//     <div className="w-full relative">
//       <div className="bg-white rounded-3xl m-4 md:m-12 py-8 md:py-16">
//         <div className="px-4 md:px-20 xl:px-40">
//           <div className="flex w-full justify-center">
//             <h2 className="text-4xl font-semibold">Best Selling Products</h2>
//           </div>

//           {isMobile ? (
//             // Mobile Slider
//             <div className="mt-10">
//               <Slider {...sliderSettings}>
//                 {products.map((product, index) => (
//                   <ProductCard key={product._id} product={product} index={index} />
//                 ))}
//               </Slider>
//             </div>
//           ) : (
//             // Desktop grid
//             <div className="overflow-x-auto lg:overflow-x-visible no-scrollbar scrollbar-hide">
//               <div className="flex gap-6 mt-10 lg:grid lg:grid-cols-3 xl:grid-cols-4 md:px-0">
//                 {products.map((product, index) => (
//                   <ProductCard key={product._id} product={product} index={index} />
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BestSelling;




"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import SkeletonLoader from "../loader/SkeletonLoader";

const BestSelling = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [loadingWishlist, setLoadingWishlist] = useState({});
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Fetch best-selling products
  useEffect(() => {
    const fetchBestSelling = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/bestProducts");
        setProducts(res.data?.products?.slice(0, 8) || []);
      } catch (err) {
        console.error("Failed to fetch best-selling products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBestSelling();
  }, []);

  // Fetch user's wishlist on mount (only for authenticated users)
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!isAuthenticated) return;

      try {
        const res = await axios.get("/api/wishlist");
        setWishlist(res.data?.wishlist || []);
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
      }
    };
    fetchWishlist();
  }, [isAuthenticated]);

  useEffect(() => {
    let lastIsMobile = window.innerWidth < 768;
    setIsMobile(lastIsMobile);

    const handleResize = () => {
      const currentIsMobile = window.innerWidth < 768;
      if (currentIsMobile !== lastIsMobile) {
        lastIsMobile = currentIsMobile;
        setIsMobile(currentIsMobile);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const handleWishlistToggle = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    if (!isAuthenticated) {
      toast.error("Please login to add to wishlist");
      return;
    }

    if (loadingWishlist[productId]) return;

    const previousWishlist = [...wishlist];
    const wasInWishlist = wishlist.includes(productId);

    if (wasInWishlist) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
    } else {
      setWishlist((prev) => [...prev, productId]);
    }

    setLoadingWishlist((prev) => ({ ...prev, [productId]: true }));

    try {
      await axios.post("/api/wishlist", { productId });
      toast.success(wasInWishlist ? "Removed from wishlist" : "Added to wishlist");
    } catch (err) {
      setWishlist(previousWishlist);
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

  const isInWishlist = (productId) => wishlist.includes(productId);

  const fadeDown = {
    hidden: { opacity: 0, y: -30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: i * 0.2 },
    }),
  };

  const ProductCard = ({ product, index }) => (
    <motion.div
      key={product._id}
      custom={index}
      variants={fadeDown}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={isMobile ? "flex-shrink-0 w-[45%]" : ""}
    >
      <div className="relative flex flex-col">
        <Link href={`/shop/${product._id}`} className="w-full">
          {product.discount && (
            <div className="absolute top-2 left-2 z-10 bg-[#FF3971] text-white text-sm px-2 py-1 rounded-full">
              {product.discount}% off
            </div>
          )}
          <Image
            src={product.images?.[0]?.url || "/images/no-image.png"}
            alt={product.name || "Product"}
            width={200}
            height={200}
            className="rounded-t-2xl w-full object-cover hover:scale-105 transition-all duration-500 cursor-pointer"
          />
        </Link>
        <div className="flex flex-col gap-2 mt-4 px-2 w-full">
          <div className="flex justify-between items-center">
            <Link href={`/shop/${product._id}`} className="flex-1">
              <span className="text-lg font-semibold hover:text-[#F91F54] transition-colors">
                {product.name}
              </span>
            </Link>

            {isAuthenticated && (
              <motion.button
                onClick={(e) => handleWishlistToggle(e, product._id)}
                disabled={loadingWishlist[product._id]}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="focus:outline-none disabled:opacity-50 z-20 relative ml-2"
                aria-label={isInWishlist(product._id) ? "Remove from wishlist" : "Add to wishlist"}
                type="button"
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
                      sx={{
                        color: "#F91F54",
                        fontSize: 28,
                        filter: "drop-shadow(0 2px 4px rgba(249, 31, 84, 0.3))"
                      }}
                    />
                  ) : (
                    <FavoriteBorderIcon
                      sx={{
                        color: "#F91F54",
                        fontSize: 28
                      }}
                    />
                  )}
                </motion.div>
              </motion.button>
            )}
          </div>
          <Link href={`/shop/${product._id}`}>
            <div className="text-sm">
              <span>Rs. </span>
              <span>{product.price}</span>
              {product.markedPrice && (
                <span className="line-through ml-2 text-gray-500">
                  Rs. {product.markedPrice}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="w-full relative">
        <div className="bg-white rounded-3xl m-4 md:m-12 py-8 md:py-16">
          <div className="px-4 md:px-20 xl:px-40">
            <div className="flex w-full justify-center">
              <h2 className="text-4xl font-semibold">Best Selling Products</h2>
            </div>

            {isMobile ? (
              <div className="mt-10">
                <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar scrollbar-hide">
                  <SkeletonLoader count={4} isMobile={true} />
                </div>
                <div className="flex overflow-x-auto gap-4 pb-4 mt-4 no-scrollbar scrollbar-hide">
                  <SkeletonLoader count={4} isMobile={true} />
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto lg:overflow-x-visible no-scrollbar scrollbar-hide">
                <div className="flex gap-6 mt-10 lg:grid lg:grid-cols-3 xl:grid-cols-4 md:px-0">
                  <SkeletonLoader count={8} isMobile={false} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <div className="bg-white rounded-3xl m-4 md:m-12 py-8 md:py-16">
        <div className="px-4 md:px-20 xl:px-40">
          <div className="flex w-full justify-center">
            <h2 className="text-4xl font-semibold">Best Selling Products</h2>
          </div>

          {isMobile ? (
            <div className="mt-10">
              <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar scrollbar-hide">
                {products.slice(0, 4).map((product, index) => (
                  <ProductCard key={product._id} product={product} index={index} />
                ))}
              </div>
              <div className="flex overflow-x-auto gap-4 pb-4 mt-4 no-scrollbar scrollbar-hide">
                {products.slice(4, 8).map((product, index) => (
                  <ProductCard key={product._id} product={product} index={index + 4} />
                ))}
              </div>
            </div>
          ) : (
            // Desktop grid
            <div className="overflow-x-auto lg:overflow-x-visible no-scrollbar scrollbar-hide">
              <div className="flex gap-6 mt-10 lg:grid lg:grid-cols-3 xl:grid-cols-4 md:px-0">
                {products.map((product, index) => (
                  <ProductCard key={product._id} product={product} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestSelling;