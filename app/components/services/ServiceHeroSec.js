"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const ServiceHeroSec = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div data-aos="fade-down" className="w-full  pt-20">
      <div className=" px-4 md:px-16 xl:px-30">
        <div className="relative w-full">
          <Image
            src="/images/ServiceGroup1.png"
            alt="group"
            fill
            className="hidden lg:block absolute w-full h-full  object-contain"
          />
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-10 ">
            <div className="relative flex flex-col justify-center items-center lg:items-start space-y-10  lg:space-y-20">
              <div
                // data-aos="fade-right"
                // data-aos-duration="1500"
                className=" text-3xl lg:text-5xl font-bold text-center lg:text-start"
              >
                <span className=" text-[#ff0047] ">Wed My Pet, </span>
                <span>
                  we create unforgettable moments by celebrating your beloved
                  pets.
                </span>
              </div>
              <div className=" flex  gap-8">
                <button
                  onClick={() => router.push("/register")}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={` bg-black/97 gap-1 flex justify-center items-center px-4  py-1 group hover:scale-105 transition-all duration-300 text-white font-medium lg:text-lg  rounded-full uppercase cursor-pointer`}
                >
                  Add Your Pet
                  {isHovered && (
                    <motion.span
                      className=" "
                      initial={{ x: -5, opacity: 0 }}
                      animate={{
                        x: isHovered ? 10 : 0,
                        opacity: isHovered ? 1 : 0,
                      }}
                      transition={{
                        type: "easeIn",
                        duration: 0.6,
                      }}
                    >
                      <Image
                        src="/images/logo.png"
                        width={33}
                        height={33}
                        alt="logo"
                        className="hidden  group-hover:block transition-all duration-300"
                      />
                    </motion.span>
                  )}
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
                className="lg:hidden object-contain " // customize as needed
              />
              <div className=" h-full w-full flex justify-center   items-center">
                <Image
                  src="/images/serviceHeroSec.png"
                  alt="heroImage"
                  width={450}
                  height={200}
                  className=" object-cover  relative 2xl:right-32"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceHeroSec;
