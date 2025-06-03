"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const ContactHero = () => {
  return (
    <div data-aos="fade-down" className="w-full relative pt-20">
      <div className=" absolute inset-0 opacity-30">
        <Image
          src="/images/pinkPaws.png"
          alt="background paws"
          fill
          className=" object-top w-full h-full"
        />
      </div>
      <div className=" px-4 md:px-16 xl:px-30">
        <div className="relative w-full">
          <div className=" absolute inset-0  ">
            {/* Top Image */}
            <div className="absolute  top-0 left-0">
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
            <div className="absolute bottom-3/7 lg:bottom-1/8 right-4 lg:right-1/2">
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
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-0 lg:py-24 ">
            <div className="relative flex flex-col justify-center items-center lg:items-start space-y-10  lg:space-y-20">
              <div
                // data-aos="fade-right"
                // data-aos-duration="1500"
                className=" text-3xl lg:text-5xl font-bold text-center lg:text-start "
              >
                <div className="">
                  Need help or have a paw-some idea <span>to share?</span>
                </div>
                <div className=" mt-4">
                  Get in touch{" "}
                  <span className=" text-[#ff0047] ">with us!</span>
                </div>
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
              className="relative flex w-full h-full justify-center items-center"
            >
              <Image
                src="/images/pinkBG.png"
                alt="Background"
                fill
                className=" object-contains" // customize as needed
              />
              <div className=" h-full w-full flex justify-center items-center">
                <Image
                  src="/images/contactHero.png"
                  alt="heroImage"
                  width={500}
                  height={450}
                  className=" object-contain relative bottom-7 "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactHero;
