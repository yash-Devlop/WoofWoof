"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";

const AboutSec = () => {
  const router = useRouter();
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
        <div className=" px-4 md:px-24 xl:px-30 rounded-3xl">
          <motion.div
            initial={{ x: 20, y: -10, scale: 1 }}
            animate={{
              x: [0, -30, -50, -30, 0],
              y: [0, 20, 40, 20, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
            className="h-auto w-62 right-0 bottom-1/6 md:right-1/8 md:bottom-1/8 absolute rounded-[4rem]"
          >
            <Image
              src="/images/bone1.png"
              alt="dogCouple"
              width={300}
              height={300}
              className="rounded-[4rem] h-[200px] w-[200px]  md:rotate-0"
            />
          </motion.div>
          <div className=" relative grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-30 pb-10">
            <div className="relative inline-block">
              <Image
                src="/images/dogCouple.png"
                alt="dogCouple"
                width={500}
                height={600}
                className="rounded-[4rem] relative z-10 drop-shadow-[15px_20px_0_#FE97AF]"
              />
            </div>



            <div className=" space-y-2 lg:space-y-10 flex flex-col items-center">
              <h2 className=" text-3xl lg:text-5xl font-extrabold text-[#ff0047]">
                ABOUT WOOf WOOf
              </h2>
              <h3 className=" text-2xl lg:text-[2.15rem] font-semibold">
                Welcome to Woof Woof - Where Pets Find Love!
              </h3>
              <p className=" text-justify text-lg xl:text-2xl lg:scale-y-125 font-medium font-saira">
                Woof Woof is a platform designed to offer pet owners a
                comprehensive and immersive 360-degree pet experience. As the
                website develops, we are initially focusing on delivering
                high-quality, RoHS-compliant, and innovative pet products.
              </p>
              <div className=" mt-6 flex justify-center md:justify-start w-full  gap-8">
                <button
                  onClick={() => router.push("/aboutUs")}
                  className={` bg-black/97 gap-1 flex justify-center items-center pl-4 pr-1.5  py-1 group hover:scale-105 transition-all duration-300 text-white font-medium lg:text-lg rounded-full uppercase cursor-pointer`}
                >
                  About Us
                  <motion.span className=" ">
                    <Image
                      src="/images/logo.png"
                      width={40}
                      height={40}
                      alt="logo"
                      className="  group-hover:block transition-all duration-300"
                    />
                  </motion.span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutSec;
