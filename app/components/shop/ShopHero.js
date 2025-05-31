"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const ShopHero = ({ scrollToProduct }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div data-aos="fade-down" className="w-full  pt-20">
      <div className=" px-4 md:px-16 xl:px-30">
        <div className="relative w-full">
          <div className=" absolute inset-0  ">
            {/* Top Image */}
            <div className="absolute top-0 left-0">
              <motion.div
                initial={{ x: 20, y: -10, scale: 1 }}
                animate={{
                  x: [0, -30, -50, -30, 0],
                  y: [0, 20, 40, 20, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Image
                  src="/images/testimonialBg.png"
                  alt="floatingVector1"
                  width={200}
                  height={200}
                  className="object-contain h-[100px] w-[100px] lg:h-[150px] lg:w-[150px]"
                />
              </motion.div>
            </div>
            {/* Bottom Image */}
            <div className="absolute bottom-3/5 lg:bottom-1/10 right-4 lg:right-3/6">
              <motion.div
                initial={{ x: 10, y: -10, scale: 1 }}
                animate={{
                  x: [0, 20, 40, 20, 0],
                  y: [0, -10, 0, 10, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Image
                  src="/images/transitionBg.png"
                  alt="floatingVector2"
                  width={200}
                  height={200}
                  className="object-contain h-[100px] w-[100px] lg:h-[150px] lg:w-[150px]"
                />
              </motion.div>
            </div>
          </div>
          <Image
            src="/images/ServiceGroup1.png"
            alt="group"
            fill
            className="hidden absolute w-full h-full  object-contain"
          />
          <div className=" grid grid-cols-1 lg:grid-cols-2 md:gap-10 ">
            <div className="relative flex flex-col justify-center items-center lg:items-start space-y-2  lg:space-y-20">
              <div className=" text-3xl text-center lg:text-start lg:text-5xl font-bold">
                <span className=" text-[#ff0047] ">Wed My Pet, </span>
                <span>
                  brings joyful, stylish essentials to pamper your dog with
                  love, care, and fun.
                </span>
              </div>
              <div className=" flex  gap-8">
                <button
                  onClick={scrollToProduct}
                  className={` bg-black/97 gap-1 flex justify-center items-center pl-4 pr-1.5  py-1 group hover:scale-105 transition-all duration-300 text-white font-medium lg:text-lg  rounded-full uppercase cursor-pointer`}
                >
                  Shop Now
                  <motion.span className=" ">
                    <Image
                      src="/images/logo.png"
                      width={33}
                      height={33}
                      alt="logo"
                      className=" group-hover:block transition-all duration-300"
                    />
                  </motion.span>
                </button>
              </div>
            </div>
            <div
              // data-aos="fade-right"
              // data-aos-duration="1500"
              className=" relative flex w-full h-full justify-center items-center"
            >
              <Image
                src="/images/pinkBG.png"
                alt="Background"
                fill
                className=" object-contain " // customize as needed
              />
              <div className=" h-full w-full flex justify-center   items-center">
                <Image
                  src="/images/serviceHeroSec.png"
                  alt="heroImage"
                  width={450}
                  height={200}
                  className=" object-cover  relative"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopHero;
