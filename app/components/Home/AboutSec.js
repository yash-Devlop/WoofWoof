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
    <div className="w-full relative ">
      <div className="bg-white rounded-3xl m-4 md:m-12 py-8 md:py-16">
        <div className=" px-4 md:px-24 xl:px-40 rounded-3xl">
          <motion.div
            // initial={
            //   isMobile ? { rotateY: 180, opacity: 0 } : { x: -400, opacity: 0 }
            // }
            // whileInView={
            //   isMobile ? { rotateY: 0, opacity: 1 } : { x: 0, opacity: 1 }
            // }
            // transition={{ duration: 1 }}
            // viewport={{ once: true }}
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
            <div data-aos="fade-down-right" className=" relative">
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
            <div
              data-aos="fade-down-left"
              className=" space-y-2 lg:space-y-10 flex flex-col items-center"
            >
              <h2 className=" text-3xl lg:text-5xl font-extrabold text-gray-800">
                ABOUT WED MY PET
              </h2>
              <h3 className=" text-2xl lg:text-[2.15rem] font-semibold">
                Welcome to Wedmypet - Where Pets Find Love!
              </h3>
              <p className=" text-justify text-lg xl:text-2xl lg:scale-y-125 font-medium font-saira">
                At Wedmypet, we believe that love knows no boundaries, not even
                for our furry friends. Our mission is to create a vibrant and
                inclusive community that connects pets and their loving owners,
                fostering new friendships, meaningful connections, and even
                finding true love!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSec;
