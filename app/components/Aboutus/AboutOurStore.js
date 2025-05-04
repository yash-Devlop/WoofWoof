"use client";
import Image from "next/image";

import React from "react";
import CountUp from "react-countup";

const AboutOurStore = () => {
  const statData = [
    { id: 1, count: 50, suffix: "+", Description: "Happy Client" },
    { id: 2, count: 5, suffix: "+", Description: "Brands" },
    { id: 3, count: 30, suffix: "+", Description: "Products" },
    { id: 4, count: 5, suffix: "", Description: "Years in business" },
  ];
  return (
    <div className="w-full relative">
      <div className="bg-white rounded-3xl m-4 md:m-12 py-6">
        <div className=" px-4 md:px-24 xl:px-40">
          <h2 className=" text-4xl font-bold tracking-wide mb-6">
            About Our Store
          </h2>
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div
              // data-aos="zoom-in"
              // data-aos-duration="1200"
              className=" lg:text-[17px] lg:max-w-[420px] text-gray-800"
            >
              <p className=" ">
                Our online pet store was founded on the principle of providing
                superior products and services to our beloved pets, reflecting
                the unconditional love they give us.
              </p>
            </div>
            <div
              // data-aos="zoom-in"
              // data-aos-duration="1200"
              className=" lg:text-[17px] lg:max-w-[420px] text-gray-800"
            >
              <p className=" ">
                Wedmypet originated from the founders&apos; love for their pet,
                a two-month-old Pekingese named Tintin, adopted at their
                children&apos;s request; Tintin subsequently became a central
                member of the family.
              </p>
            </div>
          </div>
          <div className=" grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statData.map((stat) => (
              <div key={stat.id}>
                <h2 className="text-3xl font-semibold text-[#F31C51]">
                  <CountUp
                    end={stat.count}
                    duration={10}
                    suffix={stat.suffix}
                  />
                </h2>
                <h4 className="font-normal">{stat.Description}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutOurStore;
