// import React, { useEffect } from "react";
// import Image from "next/image";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "@/store/slices/user/productSlice";
// import Link from "next/link";
// import { motion } from "framer-motion";

// function normalizeUrl(url) {
//   if (!url) return "/placeholder.png";
//   if (url.startsWith("//")) return url.replace(/^\/\//, "/");
//   if (!url.startsWith("/")) return "/" + url;
//   return url;
// }

// export default function ProductGrid() {
//   const dispatch = useDispatch();
//   const { products, status } = useSelector((state) => state.product);

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   if (status === "loading") return <p>Loading...</p>;
//   if (status === "failed") return <p>Failed to load products.</p>;

//   const fadeDown = {
//     hidden: { opacity: 0, y: -30 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//         delay: i * 0.2, // stagger based on index
//       },
//     }),
//   };

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//       {products.map((product, index) => (
//         <motion.div
//           key={index}
//           custom={index}
//           variants={fadeDown}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.2 }}
//         >
//           <Link href={`/shop/${product._id}`}>
//             <div className="rounded-2xl cursor-pointer shadow-md hover:shadow-lg transition-transform hover:scale-[1.02]">
//               <div className="bg-[#ececec] lg:min-h-[200px] overflow-hidden rounded-t-2xl">
//                 <Image
//                   src={
//                     normalizeUrl(product?.images?.[0]?.url) ||
//                     "/placeholder.png"
//                   }
//                   alt={product?.images?.[0]?.altText || product.name}
//                   width={100}
//                   height={100}
//                   className="w-full h-32 object-contain mb-2"
//                 />
//               </div>
//               <div className="p-3 flex justify-between">
//                 <div>
//                   <h3 className="text-sm font-medium">{product.name}</h3>
//                   <p className="text-gray-600 text-sm">₹{product.price}</p>
//                 </div>
//                 <div>
//                   <FavoriteBorderIcon
//                     sx={{
//                       color: "#ff4081",
//                       fontSize: "22px",
//                       cursor: "pointer",
//                       transition: "transform 0.2s ease-in-out",
//                       "&:hover": {
//                         transform: "scale(1.1)",
//                       },
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </Link>
//         </motion.div>
//       ))}
//     </div>
//   );
// }








"use client";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";

export default function ProductGrid({ bestSellingOnly = false }) {
  const products = useSelector((state) => state.product.products);
  const filters = useSelector((state) => state.product.filters);
  const sort = useSelector((state) => state.product.sort);

  // Apply filters
  const filteredProducts = products
    .filter((product) => {
      // Best-selling filter
      if (bestSellingOnly && !product.bestSelling) return false;

      // Tags filter
      if (
        filters.selectedTags?.length > 0 &&
        !filters.selectedTags.some((tag) => product.tags?.includes(tag))
      )
        return false;

      // Price range filter
      const price = product.price || 0;
      if (
        filters.priceRange &&
        (price < filters.priceRange.min || price > filters.priceRange.max)
      )
        return false;

      return true;
    })
    .sort((a, b) => {
      // Apply sorting based on Redux sort state
      if (sort?.type === "price") {
        return sort.order === "asc" ? a.price - b.price : b.price - a.price;
      }
      if (sort?.type === "latest") {
        return sort.order === "desc"
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (sort?.type === "popularity") {
        return sort.order === "desc"
          ? (b.sold || 0) - (a.sold || 0)
          : (a.sold || 0) - (b.sold || 0);
      }
      return 0;
    });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <Link
            key={product._id}
            href={`/shop/${product._id}`}
            className="block bg-white p-3 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <div className="relative w-full aspect-square mb-2 overflow-hidden rounded-xl">
              <Image
                src={product?.images[0].url || "/placeholder.png"}
                alt={product.name}
                fill
                className="object-cover hover:scale-105 transition-transform"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-gray-800 text-sm truncate">
                {product.name}
              </span>
              <span className="text-gray-500 text-xs mb-1">
                {product.category}
              </span>
              <span className="font-bold text-black text-sm">
                ₹{product.price.toLocaleString()}
              </span>
            </div>
          </Link>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500 py-10">
          No products found matching filters.
        </div>
      )}
    </div>
  );
}
