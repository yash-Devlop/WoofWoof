"use client";
import Image from "next/image";

import React from "react";
import CountUp from "react-countup";

const AboutOurStore = () => {

    return (
        <div className="w-full relative">
            <div className="bg-white rounded-3xl m-4 md:m-12 py-6">
                <div className="text-center px-4 md:px-24 xl:px-40">
                    <h2 className=" text-4xl font-bold tracking-wide mb-6">
                        Our Commitment to Giving Back
                    </h2>
                    <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                        <div
                            // data-aos="zoom-in"
                            // data-aos-duration="1200"
                            className=" lg:text-[17px] lg:max-w-[420px] text-gray-800"
                        >
                            <p className="text-2xl">
                                At <span className="text-[#ff0047] font-semibold">Woof Woof</span>,  we believe that love for pets goes beyond our shelves. Our philanthropy program is dedicated to supporting animal shelters, rescuing stray pets, and contributing to the well-being of our community.. We are deeply committed to making a positive impact on the lives of those less privileged and actively seek opportunities to contribute to the well-being of our community.
                            </p>
                        </div>
                        <div
                            // data-aos="zoom-in"
                            // data-aos-duration="1200"
                            className=" lg:text-[17px] lg:max-w-[420px] text-gray-800"
                        >
                            <p className="text-2xl">
                                We Donate part of our earnings through our group companies to <span className="text-[#ff0047]">The Balaji Institute of Surgery, Research and Rehabilitation for the Disabled (BIRRD)</span> in Tirupati, India. BIRRD is a remarkable hospital specializing in orthopaedics and rehabilitation for the disabled, with a particular focus on providing free treatment to the poor, regardless of religion, caste, or creed.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AboutOurStore;
