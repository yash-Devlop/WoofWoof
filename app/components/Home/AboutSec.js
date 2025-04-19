import Image from "next/image";
import React from "react";

const AboutSec = () => {
  return (
    <div className="w-full relative py-16">
      <div className=" px-4 md:px-24 xl:px-40">
        <Image
          src="/images/bone.png"
          alt="dogCouple"
          width={300}
          height={300}
          className=" h-84 w-52 right-0 bottom-0 absolute rounded-[4rem]"
        />
        <div className=" relative grid grid-cols-1 lg:grid-cols-2 gap-8 pb-30">
          <div data-aos="flip-left" className="">
            <Image
              src="/images/dogCouple.png"
              alt="dogCouple"
              width={500}
              height={600}
              className=" rounded-[4rem]"
            />
          </div>
          <div
            data-aos="flip-right"
            className=" space-y-3 lg:space-y-15 flex flex-col items-center"
          >
            <h2 className=" text-3xl lg:text-5xl font-extrabold text-gray-800">
              ABOUT WED MY PET
            </h2>
            <h3 className=" text-2xl lg:text-[2.15rem] font-semibold">
              Welcome to Wedmypet - Where Pets Find Love!
            </h3>
            <p className=" text-justify text-lg xl:text-2xl lg:scale-y-125 xl:leading-10 font-medium font-saira">
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
  );
};

export default AboutSec;
