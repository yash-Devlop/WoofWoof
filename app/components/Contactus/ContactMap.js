import Image from "next/image";
import React from "react";

const ContactMap = () => {
  return (
    <div className="w-full relative">
      <div className="bg-white rounded-3xl m-4 md:m-12 py-6">
        <div className=" px-4 md:px-20 xl:px-40">
          <div className=" overflow-hidden rounded-3xl">
            <Image
              src="/images/MapPin.png"
              alt="map"
              width={600}
              height={400}
              className=" w-full cursor-pointer hover:scale-105 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMap;
