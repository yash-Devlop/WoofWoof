"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const MoreServices = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className=" w-full flex justify-center items-center">
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={` bg-black/97 gap-1 flex justify-start items-center px-4  py-1 group  transition-all duration-300 text-white font-medium lg:text-lg my-4  rounded-full uppercase cursor-pointer`}
      >
        More Services Comming Soon
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
  );
};

export default MoreServices;
