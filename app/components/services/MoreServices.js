"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const MoreServices = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className=" w-full flex justify-center items-center">
      <button
        className={` bg-black/97 gap-1 flex justify-start items-center pl-4 pr-1 hover:scale-105  py-1 group transition-transform duration-300 text-white font-medium lg:text-lg my-4  rounded-full uppercase cursor-pointer`}
      >
        More Services Comming Soon
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
  );
};

export default MoreServices;
