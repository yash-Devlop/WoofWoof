"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Offers = () => {
  const router = useRouter();
  return (
    <div className=" w-full bg-[#ff3971e5] flex justify-center px-24 py-2 ">
      <div
        onClick={() => router.push("/register")}
        className=" font-medium text-[10px] md:text-lg cursor-pointer"
      >
        Get a free Product worth 199 absolutely free
      </div>
    </div>
  );
};

export default Offers;
