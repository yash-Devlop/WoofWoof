"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const AboutHeroSection = () => {
  const router = useRouter();

  return (
    <div data-aos="fade-down" className="w-full pt-20 md:pt-0">
      <div className=" px-4 md:px-16 xl:px-30">
        <div className="relative w-full">
          <div className=" absolute inset-0  ">
            {/* Top Image */}
            <div className="absolute  top-0 left-0">
              <motion.div
                initial={{ x: 20, y: -10, scale: 1 }}
                animate={{
                  x: [0, -30, -60, -30, 0],
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
            <div className="absolute bottom-3/5 lg:bottom-1/8 right-4 lg:right-1/2">
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
            src="/images/Group1.png"
            alt="group"
            fill
            className="hidden absolute w-full h-full  object-contain"
          />
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4 lg:pt-4 ">
            <div className="relative flex flex-col justify-center items-center lg:items-start  lg:space-y-20">
              <div
                // data-aos="fade-right"
                // data-aos-duration="1500"
                className=" text-3xl lg:text-5xl font-bold text-center lg:text-start"
              >
                <span>If animals could talk, they’d talk </span>
                <span className=" text-[#ff0047] ">about us!</span>
              </div>
            </div>
            <div
              // data-aos="fade-left"
              // data-aos-duration="1500"
              className="relative flex w-full h-full justify-start items-center"
            >
              <Image
                src="/images/pinkBG.png"
                alt="Background"
                fill
                className=" absolute inset-0 w-full h-full object-contain " // customize as needed
              />
              <div className=" flex justify-center xl:pl-20 items-center">
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
