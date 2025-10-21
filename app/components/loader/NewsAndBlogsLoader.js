import React from "react";

const NewsAndBlogsLoader = () => {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="gap-4 flex lg:px-25">
        {/* Generate 3 skeleton blog cards */}
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex gap-4 py-2">
            <div className="w-[320px] h-[300px] gap-4 bg-white shadow-md rounded-2xl overflow-hidden flex flex-col">
              {/* Image Skeleton with Badge */}
              <div className="w-full h-[220px] relative bg-gray-200 animate-pulse">
                {/* Badge Skeleton */}
                <div className="absolute top-3 left-3 z-10">
                  <div className="w-16 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Content Skeleton */}
              <div className="flex-1 flex flex-col justify-between p-4">
                <div>
                  {/* Date Skeleton */}
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>

                  {/* Title Skeleton - Two lines */}
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsAndBlogsLoader;