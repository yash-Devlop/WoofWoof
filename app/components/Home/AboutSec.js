"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

const AboutSec = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  if (!mounted) return null;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="w-full relative "
    >
      <div className="bg-white rounded-3xl m-4 md:m-12 py-8 md:py-16">
        <div className=" px-4 md:px-24 xl:px-40 rounded-3xl">
          <motion.div
            animate={{ rotate: [0, 10, -10, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-auto w-62 right-6 bottom-4 absolute rounded-[4rem]"
          >
            <Image
              src="/images/bone1.png"
              alt="dogCouple"
              width={300}
              height={300}
              className="rounded-[4rem] w-full h-auto  md:rotate-0"
            />
          </motion.div>
          <div className=" relative grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
            <div className=" relative">
              <Image
                src="/images/dogCouple.png"
                alt="dogCouple"
                width={500}
                height={600}
                className=" rounded-[4rem] relative z-1"
              />
              <Image
                src="/images/pinkRec.png"
                alt="dogCouple"
                width={500}
                height={600}
                className=" rounded-[4rem] absolute -bottom-5 md:-bottom-8 md:-right-8 xl:-bottom-15 xl:-right-6 -right-3"
              />
            </div>
            <div className=" space-y-2 lg:space-y-10 flex flex-col items-center">
              <h2 className=" text-3xl lg:text-5xl font-extrabold text-[#ff0047]">
                ABOUT WED MY PET
              </h2>
              <h3 className=" text-2xl lg:text-[2.15rem] font-semibold">
                Welcome to Wedmypet - Where Pets Find Love!
              </h3>
              <p className=" text-justify text-lg xl:text-2xl lg:scale-y-125 font-medium font-saira">
                Wedmy Pets is a platform designed to offer pet owners a
                comprehensive and immersive 360-degree pet experience. As the
                website develops, we are initially focusing on delivering
                high-quality, RoHS-compliant, and innovative pet products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutSec;
