// "use client";
// import { useSelector } from "react-redux";
// import Link from "next/link";
// import Image from "next/image";

// export default function ProductGrid({ bestSellingOnly = false }) {
//   const products = useSelector((state) => state.product.products);
//   const filters = useSelector((state) => state.product.filters);
//   const sort = useSelector((state) => state.product.sort);
//   const loading = useSelector((state) => state.product.loading);

//   // Apply filters
//   const filteredProducts = products
//     .filter((product) => {
//       // Best-selling filter
//       if (bestSellingOnly && !product.bestSelling) return false;

//       // Tags filter
//       if (
//         filters.selectedTags?.length > 0 &&
//         !filters.selectedTags.some((tag) => product.tags?.includes(tag))
//       )
//         return false;

//       // Price range filter
//       const price = product.price || 0;
//       if (
//         filters.priceRange &&
//         (price < filters.priceRange.min || price > filters.priceRange.max)
//       )
//         return false;

//       return true;
//     })
//     .sort((a, b) => {
//       // Apply sorting based on Redux sort state
//       if (sort?.type === "price") {
//         return sort.order === "asc" ? a.price - b.price : b.price - a.price;
//       }
//       if (sort?.type === "latest") {
//         return sort.order === "desc"
//           ? new Date(b.createdAt) - new Date(a.createdAt)
//           : new Date(a.createdAt) - new Date(b.createdAt);
//       }
//       if (sort?.type === "popularity") {
//         return sort.order === "desc"
//           ? (b.sold || 0) - (a.sold || 0)
//           : (a.sold || 0) - (b.sold || 0);
//       }
//       return 0;
//     });

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//       {filteredProducts.length > 0 ? (
//         filteredProducts.map((product) => (
//           <Link
//             key={product._id}
//             href={`/shop/${product._id}`}
//             className="block bg-white p-3 rounded-2xl shadow-sm hover:shadow-md transition"
//           >
//             <div className="relative w-full aspect-square mb-2 overflow-hidden rounded-xl">
//               <Image
//                 src={product?.images[0].url || "/placeholder.png"}
//                 alt={product.name}
//                 fill
//                 className="object-cover hover:scale-105 transition-transform"
//               />
//             </div>

//             <div className="flex flex-col">
//               <span className="font-semibold text-gray-800 text-sm truncate">
//                 {product.name}
//               </span>
//               <span className="text-gray-500 text-xs mb-1">
//                 {product.category}
//               </span>
//               <span className="font-bold text-black text-sm">
//                 ₹{product.price.toLocaleString()}
//               </span>
//             </div>
//           </Link>
//         ))
//       ) : (
//         <div className="col-span-full text-center text-gray-500 py-10">
//           No products found matching filters.
//         </div>
//       )}
//     </div>
//   );
// }



"use client";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import ProductGridLoader from "../../loader/ProductGridLoader";

export default function ProductGrid({ bestSellingOnly = false }) {
  const products = useSelector((state) => state.product.products);
  const filters = useSelector((state) => state.product.filters);
  const sorting = useSelector((state) => state.product.sorting);
  const loading = useSelector((state) => state.product.loading);

  // Show loader while fetching products
  if (loading) {
    return <ProductGridLoader />;
  }

  // Apply filters
  const filteredProducts = products
    .filter((product) => {
      // Best-selling filter
      if (bestSellingOnly && !product.bestSelling) return false;

      // Tags filter
      if (
        filters.tags?.length > 0 &&
        !filters.tags.some((tag) => product.tags?.includes(tag))
      )
        return false;

      // Price range filter
      const price = product.price || 0;
      if (price < filters.minPrice || price > filters.maxPrice) return false;

      return true;
    })
    .sort((a, b) => {
      // Apply sorting based on Redux sort state
      if (sorting?.type === "price") {
        return sorting.order === "asc" ? a.price - b.price : b.price - a.price;
      }
      if (sorting?.type === "latest") {
        return sorting.order === "desc"
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (sorting?.type === "popularity") {
        return sorting.order === "desc"
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
                src={product?.images[0]?.url || "/placeholder.png"}
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