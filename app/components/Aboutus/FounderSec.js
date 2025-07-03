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
                src="/images/founder.png"
                alt="dogCouple"
                width={500}
                height={600}
                className=" rounded-3xl h-[250px] md:h-[450px] w-full"
              />
            </div>
            <div
              // data-aos="zoom-out-left"
              className=" space-y-3 lg:space-y-10 flex lg:max-w-[500px] flex-col justify-center "
            >
              <div>
                <h2 className=" text-3xl lg:text-5xl font-extrabold text-black">
                  Monika Trehan
                </h2>
                <h3 className=" font-semibold text-gray-700">Founder</h3>
              </div>

              <p className=" text-gray-800 italic text-lg xl:text-2xl xl:tracking-wide font-medium">
                Woof Woof originated from the founders&apos; love for their pet,
                a two-month-old Pekingese named Tintin, adopted at their
                children&apos;s request; Tintin subsequently became a central
                member of the family.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderSec;
