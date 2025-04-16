import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <div className="w-full py-32 lg:py-16">
      <div className=" px-4 md:px-24 xl:px-40">
        <div className="relative w-full">
          <Image
            src="/images/group1.png"
            alt="group"
            width={400}
            height={400}
            className="absolute w-full h-full lg:h-[60vh] object-cover"
          />
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4 ">
            <div className="relative flex flex-col justify-center items-center space-y-20">
              <div className=" text-3xl text-center lg:text-5xl font-bold">
                <span className=" text-[#ff0047] ">Wed My Pet ,</span>
                <span>
                  the pet dating website. Connect, match, and unleash happiness
                  today!
                </span>
              </div>
              <div className="relative flex gap-8">
                <button className="bg-[rgba(255,86,79,0.5)] px-6 py-3 text-[#724319] font-medium lg:text-xl rounded-xl uppercase cursor-pointer">
                  Add Pet Profile
                </button>
                <button className="bg-[rgba(255,86,79,0.5)] px-6 py-3 text-[#724319] font-medium lg:text-xl rounded-xl uppercase cursor-pointer">
                  Start Search
                </button>
              </div>
            </div>
            <div className=" flex w-full h-full justify-center items-center">
              <Image
                src="/images/heroImage.png"
                alt="heroImage"
                width={400}
                height={400}
                className=" object-cover relative"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
