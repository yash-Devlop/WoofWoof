import Image from "next/image";
import React from "react";

const FounderSec = () => {
  return (
    <div data-aos="zoom-in" className="w-full relative">
      <div className="bg-white rounded-3xl m-4 md:m-12 py-6">
        <div className=" px-4 md:px-24 xl:px-40">
          <div className=" relative grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div
              // data-aos="zoom-out-right"
              className=""
            >
              <Image
                src="/images/BIRRD.webp"
                alt="dog rescue"
                width={500}
                height={600}
                className=" rounded-3xl h-[250px] md:h-[450px] w-full"
              />
            </div>
            <div
              // data-aos="zoom-out-left"
              className=" space-y-3 lg:space-y-10 flex lg:max-w-[500px] flex-col justify-center "
            >
              <div className="text-center">
                <h2 className=" text-3xl lg:text-5xl font-extrabold text-[#ff0047]">
                  Woof Woof
                </h2>
                <h2 className=" text-2xl lg:text-5xl font-extrabold text-black">
                  Why BIRRD?
                </h2>
              </div>

              <p className=" text-gray-800 italic text-lg xl:text-2xl xl:tracking-wide font-medium">
                BIRRD’s dedication to serving humanity resonates deeply with our values. Their key features include:
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderSec;
