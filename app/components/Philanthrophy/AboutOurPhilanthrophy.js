"use client";
import Image from "next/image";
import React from "react";
import CountUp from "react-countup";

const AboutOurStore = () => {
  return (
    <div className="w-full relative py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Main Container with improved shadow and border */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          
          {/* Header Section */}
          <div className="text-center px-6 md:px-12 lg:px-16 pt-12 pb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Our Commitment to Giving Back
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#ff0047] to-[#ff4d7a] mx-auto rounded-full"></div>
          </div>

          {/* Content Grid */}
          <div className="px-6 md:px-12 lg:px-16 pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              
              {/* Card 1 */}
              <div className="group">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 h-full shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                  <p className="text-base md:text-lg leading-relaxed text-gray-700">
                    At <span className="text-[#ff0047] font-semibold">Woof Woof</span>, we believe that love for pets goes beyond our shelves. Our philanthropy program is dedicated to supporting animal shelters, rescuing stray pets, and contributing to the well-being of our community. We are deeply committed to making a positive impact on the lives of those less privileged and actively seek opportunities to contribute to the well-being of our community.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 h-full shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                  <p className="text-base md:text-lg leading-relaxed text-gray-700">
                    We donate part of our earnings through our group companies to <span className="text-[#ff0047] font-semibold">The Balaji Institute of Surgery, Research and Rehabilitation for the Disabled (BIRRD)</span> in Tirupati, India. BIRRD is a remarkable hospital specializing in orthopaedics and rehabilitation for the disabled, with a particular focus on providing free treatment to the poor, regardless of religion, caste, or creed.
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

export default AboutOurStore;