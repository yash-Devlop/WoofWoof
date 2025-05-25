"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const FeatureProfile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: isMobile ? 0 : i * 0.2, // staggered delay per index
      },
    }),
  };

  const featuredProfileData = [
    {
      id: 1,
      name: "Luke",
      image: "/images/featuredDog1.jpg",
      gender: "Male",
      ethnicity: "Indian",
      breed: "Pekingese",
      city: "delhi",
    },
    {
      id: 2,
      name: "Max",
      image: "/images/featuredDog2.jpg",
      gender: "Male",
      ethnicity: "Indian",
      breed: "Pekingese",
      city: "delhi",
    },
    {
      id: 1,
      name: "Luke",
      image: "/images/featuredDog3.jpg",
      gender: "Male",
      ethnicity: "Indian",
      breed: "Pekingese",
      city: "delhi",
    },
    {
      id: 1,
      name: "Luke",
      image: "/images/featuredDog4.jpg",
      gender: "Male",
      ethnicity: "Indian",
      breed: "Pekingese",
      city: "delhi",
    },
  ];

  return (
    <div className="w-full relative">
      <div className="bg-white rounded-3xl m-4 md:m-12 py-8 md:py-16">
        <div className=" px-4 md:px-20 xl:px-40">
          <div className="flex w-full justify-between mb-8">
            <h2 className=" text-4xl font-semibold">Featured Profiles</h2>
            <div className=" flex  gap-3">
              <div className=" cursor-pointer">
                <Image
                  src="/images/previous.png"
                  width={35}
                  height={35}
                  alt="previous button"
                />
              </div>
              <div
                className=" cursor-pointer
            "
              >
                <Image
                  src="/images/next.png"
                  width={35}
                  height={35}
                  alt="previous button"
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto lg:overflow-x-visible no-scrollbar scrollbar-hide">
            <div className=" flex lg:grid gap-4 lg:grid-cols-4 ">
              {featuredProfileData.map((profile, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={slideInRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="rounded-2xl"
                >
                  <Image
                    src={profile.image}
                    alt={profile.image}
                    width={300}
                    height={300}
                    className=" rounded-t-2xl object-cover w-full h-[100px] md:h-[150px] lg:h-[250px]"
                  />
                  <div className=" flex justify-between p-2 md:p-4 rounded-b-2xl bg-gray-100 mt-1 mb-3">
                    <div className=" text-lg font-semibold">{profile.name}</div>
                    <div className=" cursor-pointer">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="24" height="24" rx="12" fill="white" />
                        <path
                          d="M7.33203 12H16.6654"
                          stroke="#ff0047"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 7.33325L16.6667 11.9999L12 16.6666"
                          stroke="#ff0047"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className=" p-2 md:px-6 md:py-4 bg-gray-200 rounded-2xl md:space-y-4">
                    <div className=" flex justify-between">
                      <h3 className=" text-sm md:text-xl font-bold">Gender</h3>
                      <h3 className=" text-sm md:text-xl font-bold">
                        {profile.gender}
                      </h3>
                    </div>
                    <div className=" flex justify-between">
                      <h3 className=" text-sm md:text-xl font-bold">
                        Ethnicity
                      </h3>
                      <h3 className=" text-sm md:text-xl font-bold">
                        {profile.ethnicity}
                      </h3>
                    </div>
                    <div className=" flex justify-between">
                      <h3 className=" text-sm md:text-xl font-bold">Breed</h3>
                      <h3 className=" text-sm md:text-xl font-bold">
                        {profile.breed}
                      </h3>
                    </div>
                    <div className=" flex justify-between">
                      <h3 className=" text-sm md:text-xl font-bold">City</h3>
                      <h3 className=" text-sm md:text-xl font-bold">
                        {profile.city}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureProfile;
