"use client";
import { Scale } from "@mui/icons-material";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const InstaPage = () => {
  const instaData = [
    {
      id: 1,
      name: "Rajiv",
      Designation: "Commercial Operation",
      image: "/images/insta1.png",
    },
    {
      id: 2,
      name: "Rithwik",
      Designation: "Marketing Head",
      image: "/images/insta2.png",
    },
    {
      id: 3,
      name: "Rajiv",
      Designation: "Social Media Manager",
      image: "/images/insta3.png",
    },
    {
      id: 4,
      name: "Rajiv",
      Designation: "Social Media Manager",
      image: "/images/insta4.png",
    },
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // mobile breakpoint
    };
    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fadeDown = {
    hidden: { opacity: 0, scale: 0.3 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: isMobile ? 0.2 : 0.6,
        ease: "easeOut",
        delay: isMobile ? 0 : i * 0.2, // stagger based on index
      },
    }),
  };

  return (
    <div className="w-full relative">
      <div className="bg-white rounded-3xl m-4 md:m-12 py-6">
        <div className=" px-4 md:px-16 xl:px-40">
          <div className=" flex justify-center">
            <h2 className=" text-4xl font-bold tracking-wide mb-6">
              Follow our instagram
            </h2>
          </div>
          <div className=" overflow-x-auto no-scrollbar scrollbar-hide ">
            <div className=" flex lg:grid lg:grid-cols-4 gap-4">
              {instaData.map((insta, index) => (
                <motion.div
                  custom={index}
                  variants={fadeDown}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  //  data-aos="zoom-in"
                  key={index}
                  className=" space-y-4"
                >
                  <div className=" overflow-hidden rounded-3xl ">
                    <Image
                      src={insta.image}
                      alt="team1"
                      width={380}
                      height={380}
                      className="w-full min-h-[150px] min-w-[170px] h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer"
                    />
                  </div>

                  {/* <div className=" w-full flex flex-col justify-center items-center">
                <h2 className=" text-2xl font-semibold">{team.name}</h2>
                <h4 className=" text-lg text-gray-700 font-medium">
                  {team.Designation}
                </h4>
              </div> */}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstaPage;
