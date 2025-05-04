"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";

const ServicesSec = () => {
  const [isHovered, setIsHovered] = useState(false);

  const services = [
    {
      id: 1,
      image: "",
      title: "",
      button: "",
      description: "",
    },
    {
      id: 2,
      image: "/images/service/service1.png",
      title: "Pet Relocation",
      button: "Know More",
      description:
        "Looking to relocate your furry friend ? You’ve come to the right place",
    },
    {
      id: 3,
      image: "/images/service/service2.png",
      title: "Pet Training",
      button: "",
      description: "coming soon",
    },
    {
      id: 4,
      image: "/images/service/service3.png",
      title: "Pet Vet",
      button: "",
      description: "coming soon",
    },
  ];
  return (
    <div className="w-full relative">
      <div className="bg-white rounded-3xl m-4 md:mx-12  py-8 md:py-16">
        <div className=" px-4 md:px-30 flex flex-col items-center ">
          {services.map((service, index) => {
            const orderChange = index % 2 === 0;
            return (
              <div
                key={service.id}
                className={` grid grid-cols-1 gap-12 ${
                  orderChange
                    ? "lg:grid-cols-[40%_60%]"
                    : "lg:grid-cols-[60%_40%]"
                }`}
              >
                <div
                  className={` ${orderChange ? "lg:order-1" : "lg:order-2"}`}
                >
                  {service.image && (
                    <Image
                      alt={service.id}
                      src={service?.image}
                      width={500}
                      height={400}
                      className=" object-contain rounded-full"
                    />
                  )}
                </div>
                <div
                  className={`${
                    orderChange ? "lg:order-2" : "lg:order-1"
                  } flex flex-col justify-center items-center 2xl:px-40 space-y-4`}
                >
                  {service.title && (
                    <div className=" flex w-full lg:justify-start justify-center text-3xl lg:text-4xl font-bold">
                      {service.title}
                    </div>
                  )}
                  <h1
                    className={`flex w-full text-2xl lg:leading-[3.75rem] tracking-wider text-justify justify-center lg:justify-start  `}
                  >
                    {service.description}
                  </h1>
                  {service.button && (
                    <button
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      className={` bg-black/97 gap-1 flex justify-start items-center px-4  py-1 group  transition-all duration-300 text-white font-medium lg:text-lg mb-8  rounded-full uppercase cursor-pointer`}
                    >
                      {service?.button}
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
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServicesSec;
