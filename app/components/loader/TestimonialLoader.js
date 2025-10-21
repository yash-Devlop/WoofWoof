import React from "react";

const TestimonialLoader = () => {
  return (
    <div className="w-full relative">
      <div className="bg-white rounded-3xl m-4 md:m-12 py-6">
        <div className="px-4 md:px-24 xl:px-40">
          {/* Header Section */}
          <div>
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-12 w-72 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] lg:gap-2">
            {/* Left Column */}
            <div className="flex flex-col justify-between mt-6">
              <div>
                {/* Stars */}
                <div className="flex gap-3 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 bg-gray-200 rounded animate-pulse"
                    ></div>
                  ))}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <div className="h-5 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-5 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-5 w-4/6 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Bottom Section with Name and Navigation */}
              <div className="flex justify-between items-center lg:mb-16 mt-6">
                <div>
                  <div className="h-8 w-40 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex gap-6">
                  <div className="w-[35px] h-[35px] bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="w-[35px] h-[35px] bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Right Column - Image Section */}
            <div className="relative w-full h-[200px] md:h-[400px] flex justify-center items-center overflow-hidden">
              <div className="w-full h-full bg-gray-200 animate-pulse"></div>
              <div className="absolute w-[150px] h-[150px] md:w-[220px] md:h-[220px] xl:w-[280px] xl:h-[280px] bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialLoader;