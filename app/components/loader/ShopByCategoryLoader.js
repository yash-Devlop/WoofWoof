import React from "react";

const ShopByCategoryLoader = () => {
  return (
    <div className="relative">


      {/* Category Cards Container */}
      <div
        className="relative flex overflow-y-hidden overflow-x-auto gap-4"
        style={{ position: "relative" }}
      >
        {/* Generate 5 skeleton cards */}
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="relative min-w-[80px] md:min-w-[170px] lg:min-w-[420px] p-4 rounded-xl flex flex-col items-center"
          >
            <div className="relative z-10 flex flex-col items-center">
              {/* Image Skeleton */}
              <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] bg-gray-200 rounded-lg animate-pulse"></div>
              
              {/* Text Skeleton */}
              <div className="mt-2 w-20 md:w-32 h-4 md:h-5 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByCategoryLoader;