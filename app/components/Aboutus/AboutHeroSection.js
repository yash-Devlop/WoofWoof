"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const AboutHeroSection = () => {
  const router = useRouter();

  return (
    <div data-aos="fade-down" className="w-full pt-20 md:pt-0">
      <div className=" px-4 md:px-16 xl:px-30">
        <div className="relative w-full">
          <Image
            src="/images/Group1.png"
            alt="group"
            fill
            className="hidden lg:block absolute w-full h-full  object-contain"
          />
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4 lg:py-24 ">
            <div className="relative flex flex-col justify-center items-center lg:items-start space-y-10  lg:space-y-20">
              <div
                // data-aos="fade-right"
                // data-aos-duration="1500"
                className=" text-3xl lg:text-5xl font-bold"
              >
                <span>If animals could talk, they’d talk </span>
                <span className=" text-[#ff0047] ">about us!</span>
              </div>
              {/* <div className=" flex  gap-8">
                <button
                  onClick={() => router.push("/register")}
                  className=" bg-[rgba(255,86,79,0.5)] px-6 py-3 hover:scale-105 transition-all duration-300 text-[#724319] font-medium lg:text-xl rounded-xl uppercase cursor-pointer"
                >
                  Add Your Pet Profile
                </button>
                <button className="relative z-50 bg-[rgba(255,86,79,0.5)] px-6 py-3 text-[#724319] hover:scale-105 transition-all duration-300 font-medium lg:text-xl rounded-xl uppercase cursor-pointer">
                  Start Search
                </button>
              </div> */}
            </div>
            <div
              // data-aos="fade-left"
              // data-aos-duration="1500"
              className=" flex w-full h-full justify-start items-center"
            >
              <Image
                src="/images/pinkBG.png"
                alt="Background"
                fill
                className="lg:hidden object-contain " // customize as needed
              />
              <div className=" flex justify-start xl:pl-20 items-center">
                <Image
                  src="/images/aboutHeroImg.png"
                  alt="heroImage"
                  width={420}
                  height={400}
                  className=" object-contain relative"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHeroSection;
