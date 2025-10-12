"use client";
import React from "react";

const AboutOurBlueOcean = () => {
  return (
    <div className="w-full relative py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Main Container with improved shadow and border */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <br />
          {/* Content Grid */}
          <div className="px-6 md:px-12 lg:px-16 pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              
              {/* Card 1 */}
              <div className="group">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 h-full shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                  <p className="text-base md:text-lg leading-relaxed text-gray-700">
                    At <span className="text-[#ff0047] font-semibold">Blue Ocean</span>, is a diversified trading company built on innovation, trust, and quality. Established with the vision of creating meaningful brands for everyday life, Blue Ocean serves as the parent company of multiple ventures across different industries. Much like a vast ocean that nurtures countless ecosystems, Blue Ocean is home to unique businesses that bring value, joy, and reliability to customers.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 h-full shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                  <p className="text-base md:text-lg leading-relaxed text-gray-700">
                   At <span className="text-[#ff0047] font-semibold">Blue Ocean</span>, we curate and develop brands that cater to diverse lifestyle needs. From traditional craftsmanship to modern living essentials, we bring together quality products that enrich daily life. Our mission is to connect people with products that not only serve a purpose but also create memorable experiences.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Accent */}
          <div className="h-2 bg-gradient-to-r from-[#ff0047] via-[#ff4d7a] to-[#ff0047]"></div>
        </div>
      </div>
    </div>
  );
};

export default AboutOurBlueOcean;