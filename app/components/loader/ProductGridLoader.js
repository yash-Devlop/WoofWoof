import React from "react";

const ProductGridLoader = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* Generate 4 skeleton product cards (1 page worth) */}
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="block bg-white p-3 rounded-2xl shadow-sm"
        >
          {/* Image Skeleton */}
          <div className="relative w-full aspect-square mb-2 overflow-hidden rounded-xl bg-gray-200 animate-pulse"></div>

          {/* Content Skeleton */}
          <div className="flex flex-col space-y-2">
            {/* Product Name */}
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            
            {/* Category */}
            <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse"></div>
            
            {/* Price */}
            <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGridLoader;