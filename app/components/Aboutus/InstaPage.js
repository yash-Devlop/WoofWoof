import Image from "next/image";
import React from "react";

const InstaPage = () => {
  const instaData = [
    {
      id: 1,
      name: "Rajiv",
      Designation: "Commercial Operation",
      image: "/images/insta1.png",
    },
    {
      id: 2,
      name: "Rithwik",
      Designation: "Marketing Head",
      image: "/images/insta2.png",
    },
    {
      id: 3,
      name: "Rajiv",
      Designation: "Social Media Manager",
      image: "/images/insta3.png",
    },
    {
      id: 3,
      name: "Rajiv",
      Designation: "Social Media Manager",
      image: "/images/insta4.png",
    },
  ];

  return (
    <div className="w-full relative py-8">
      <div className=" px-4 md:px-24 xl:px-40">
        <div className=" flex justify-center">
          <h2 className=" text-4xl font-bold tracking-wide mb-6">
            Follow our instagram
          </h2>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {instaData.map((insta, index) => (
            <div data-aos="zoom-in" key={index} className=" space-y-4">
              <div className=" overflow-hidden rounded-3xl ">
                <Image
                  src={insta.image}
                  alt="team1"
                  width={380}
                  height={380}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer"
                />
              </div>

              {/* <div className=" w-full flex flex-col justify-center items-center">
                <h2 className=" text-2xl font-semibold">{team.name}</h2>
                <h4 className=" text-lg text-gray-700 font-medium">
                  {team.Designation}
                </h4>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstaPage;
