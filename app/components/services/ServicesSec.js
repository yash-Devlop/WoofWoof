"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import { toast, ToastContainer, ToastOptions, Slide } from "react-toastify"

const ServicesSec = () => {
  const slideInVariants = {
    hidden: (i) => ({
      opacity: 0,
      x: i % 2 === 0 ? 100 : -100,
    }),
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };
  const [isHovered, setIsHovered] = useState(false);

  const defaultOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Slide,
  };

const showToast = (message, type = "info", options = {}) => {
  console.log('clicked');
  const finalOptions = { ...defaultOptions, ...options };

  switch (type) {
    case "success":
      toast.success(message, {
        ...finalOptions
      });
      break;

    case "error":
      toast.error(message, {
        ...finalOptions
      });
      break;

    case "warning":
      toast.warn(message, {
        ...finalOptions
      });
      break;

    default: // info
      toast.info(message, {
        ...finalOptions
      });
      break;
  }
};


  return (
    <div className="w-full">
      <ToastContainer />
      <div className="bg-white rounded-3xl m-4 md:mx-12 py-8 md:py-16">
        <div className="relative h-[860px] lg:h-auto px-4 md:px-30 flex flex-col">
          <div className=" absolute inset-0 top-0 z-10 flex justify-center items-start">
            <Image
              src="/images/pawsFlow.png"
              alt="pawsFlow"
              fill
              className="absolute h-full w-full object-contain"
            />
          </div>
          <div className=" hidden lg:block">
            {/* --- Pet Relocation --- */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.8 }}
              className="grid relative z-20 grid-cols-[35%_65%] lg:grid-cols-2 lg:gap-12 gap-5 lg:pt-36"
            >
              <div className="order-1 flex flex-col justify-center items-center 2xl:px-40 lg:space-y-4 space-y-2">
                <div className="flex w-full lg:justify-start justify-center text-xl lg:text-4xl font-bold">
                  Pet Relocation
                </div>
                <h1 className="flex w-full text-base lg:text-2xl lg:leading-[3.75rem] lg:tracking-wider lg:text-justify justify-center lg:justify-start">
                  Looking to relocate your furry friend? You’ve come to the
                  right place
                </h1>
                <button
                  className="bg-black/97 gap-1 text-sm flex justify-start items-center pl-4 pr-1.5 py-1 group transition-all duration-300 text-white font-medium lg:text-lg lg:mb-8 rounded-full uppercase cursor-pointer"
                  onClick={() => showToast('Service coming soon.', 'error')}
                >
                  Know More
                  <motion.span className="">
                    <Image
                      src="/images/logo.png"
                      width={33}
                      height={33}
                      alt="logo"
                      className="group-hover:block transition-all duration-300"
                    />
                  </motion.span>
                </button>
              </div>
              <div className="order-2 flex justify-start items-center">
                <Image
                  alt="pet-relocation"
                  src="/images/service/service1.png"
                  width={600}
                  height={400}
                  className="object-contain rounded-full  lg:h-[400px] h-[100px] lg:w-[280px] "
                />
              </div>
            </motion.div>

            {/* --- Pet Training --- */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.8 }}
              className="grid relative z-20 grid-cols-2 gap-12 "
            >
              <div className="order-1 flex justify-end items-start">
                <Image
                  alt="pet-training"
                  src="/images/service/service2.png"
                  width={600}
                  height={400}
                  className="object-contain rounded-full lg:h-[400px] h-[100px] w-[280px] lg:pb-16"
                />
              </div>
              <div className="order-2 flex flex-col justify-center items-center 2xl:px-40 space-y-4">
                <div className="flex w-full lg:justify-start justify-center text-3xl lg:text-4xl font-bold">
                  Pet Training
                </div>
                <h1 className="flex w-full text-2xl lg:leading-[3.75rem] tracking-wider text-justify justify-center lg:justify-start">
                  Coming Soon
                </h1>
              </div>
            </motion.div>

            {/* --- Pet Vet --- */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.8 }}
              className="grid relative z-20 grid-cols-[30%_70%] gap-12 mt-10"
            >
              <div className="order-2">
                <Image
                  alt="pet-vet"
                  src="/images/service/service3.png"
                  width={600}
                  height={400}
                  className="object-contain rounded-full lg:h-[400px] lg:w-[280px] h-[100px]  lg:pb-24"
                />
              </div>
              <div className="order-1 flex flex-col justify-center items-center space-y-4">
                <div className="flex w-full justify-center text-xl lg:text-4xl font-bold">
                  Pet Vet
                </div>
                <h1 className="flex w-full text-2xl lg:leading-[3.75rem] tracking-wider text-justify justify-center">
                  Coming Soon
                </h1>
              </div>
            </motion.div>
          </div>
          <div className=" lg:hidden ">
            <div className=" absolute top-45">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
                className="grid relative z-20 grid-cols-[50%_50%] lg:grid-cols-2 lg:pt-36"
              >
                <div className="order-1 flex flex-col justify-center items-center 2xl:px-40 lg:space-y-4 space-y-2">
                  <div className="flex w-full lg:justify-start justify-center text-xl lg:text-4xl font-bold">
                    Pet Relocation
                  </div>
                  <h1 className="flex w-full text-sm lg:text-2xl lg:leading-[3.75rem] lg:tracking-wider lg:text-justify justify-center lg:justify-start">
                    Looking to relocate your furry friend? You’ve come to the
                    right place
                  </h1>
                  <button className="bg-black/97 gap-1 flex justify-start items-center pl-4 pr-1.5 py-1 group transition-all duration-300 text-white text-sm font-medium lg:text-lg lg:mb-8 rounded-full uppercase cursor-pointer">
                    Know More
                    <motion.span className="">
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
                <div className="order-2 flex justify-start items-center">
                  <Image
                    alt="pet-relocation"
                    src="/images/service/service1.png"
                    width={600}
                    height={400}
                    className="object-contain rounded-full  lg:h-[400px] h-[150px] w-[200px] lg:w-[280px] pr-4"
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
                className="grid relative z-20 grid-cols-2  mt-8 "
              >
                <div className="order-1 flex justify-end items-start">
                  <Image
                    alt="pet-training"
                    src="/images/service/service2.png"
                    width={600}
                    height={400}
                    className="object-contain rounded-full lg:h-[400px] h-[150px] w-[280px] lg:pb-16"
                  />
                </div>
                <div className="order-2 flex flex-col justify-center items-center 2xl:px-40">
                  <div className="flex w-full lg:justify-start justify-center text-xl lg:text-4xl font-bold">
                    Pet Training
                  </div>
                  <h1 className="flex w-full text-sm lg:leading-[3.75rem] tracking-wider text-justify justify-center lg:justify-start">
                    Coming Soon
                  </h1>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
                className="grid relative z-20 grid-cols-[30%_70%] mt-10"
              >
                <div className="order-2">
                  <Image
                    alt="pet-vet"
                    src="/images/service/service3.png"
                    width={600}
                    height={400}
                    className="object-contain rounded-full lg:h-[400px] lg:w-[280px] h-[150px] w-[130px]  lg:pb-24"
                  />
                </div>
                <div className="order-1 flex flex-col justify-center items-center">
                  <div className="flex w-full justify-center text-xl lg:text-4xl font-bold">
                    Pet Vet
                  </div>
                  <h1 className="flex w-full text-sm lg:leading-[3.75rem] tracking-wider text-justify justify-center">
                    Coming Soon
                  </h1>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSec;
