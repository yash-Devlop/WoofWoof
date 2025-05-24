"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SmartWay = () => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  return (
    <div data-aos="zoom-in" className="w-full relative">
      <div className="bg-white rounded-3xl m-4 md:m-12 py-8 md:py-16">
        <div className=" px-4 md:px-24 xl:px-40">
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Image
              src="/images/vectorImage.png"
              alt="vectorImage"
              width={500}
              height={500}
            />
            <div
              // data-aos="flip-down"
              className=" space-y-3 flex flex-col justify-center lg:max-w-[420px]"
            >
              <h4 className=" font-semibold text-[#E42916]">WED MY PET</h4>
              <h2 className=" text-4xl lg:text-5xl font-semibold">
                The smarter way to shop for your pet
              </h2>
              <p className=" lg:text-[20px] tracking-wide font-normal text-gray-700">
                Lorem ipsum dolor sit amet consectetur. At et vehicula sodales
                est proin turpis pellentesque sinulla a aliquam amet rhoncus
                quisque eget sit
              </p>
              <div className=" flex mt-6  gap-8">
                <button
                  onClick={() => router.push("/shop")}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={` bg-black/97 gap-1 flex justify-center items-center px-4  py-1 group hover:scale-105 transition-all duration-300 text-white font-medium lg:text-lg rounded-full uppercase cursor-pointer`}
                >
                  Shop Now
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartWay;
