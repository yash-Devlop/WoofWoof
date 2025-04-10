import Image from "next/image";
import React from "react";

const SmartWay = () => {
  return (
    <div className="w-full relative py-16">
      <div className=" px-4 md:px-24 xl:px-40">
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Image
            src="/images/vectorImage.png"
            alt="vectorImage"
            width={500}
            height={500}
          />
          <div className=" space-y-3 flex flex-col justify-center lg:max-w-[350px]">
            <h4 className=" font-semibold text-[#E42916]">WED MY PET</h4>
            <h2 className=" text-4xl font-semibold">
              The smarter way to shop for your pet
            </h2>
            <p className=" text-[16px] tracking-wide font-normal text-gray-700">
              Lorem ipsum dolor sit amet consectetur. At et vehicula sodales est
              proin turpis pellentesque sinulla a aliquam amet rhoncus quisque
              eget sit
            </p>
            <div className=" mt-6">
              <button className=" px-10 bg-black text-white text-lg rounded-lg  py-2 cursor-pointer">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartWay;
