import Image from "next/image";
import React from "react";

const OurTeam = () => {
  const teamData = [
    {
      id: 1,
      name: "Rajiv",
      Designation: "Commercial Operation",
      image: "/images/team1.png",
    },
    {
      id: 2,
      name: "Rithwik",
      Designation: "Marketing Head",
      image: "/images/team2.png",
    },
    {
      id: 3,
      name: "Rajiv",
      Designation: "Social Media Manager",
      image: "/images/team3.png",
    },
  ];
  return (
    <div className="w-full relative">
      <div className="bg-white rounded-3xl m-4 md:m-12 py-6">
        <div className=" px-4 md:px-16 xl:px-40">
          <div className=" flex justify-center">
            <h2 className=" text-4xl font-bold tracking-wide mb-6">Our Team</h2>
          </div>
          <div className=" overflow-x-auto  no-scrollbar scrollbar-hide">
            <div className=" flex xl:grid xl:grid-cols-3 gap-4">
              {teamData.map((team, index) => (
                <div
                //  data-aos="zoom-in" 
                 key={index} className=" space-y-4">
                  <div className=" overflow-hidden rounded-3xl ">
                    <Image
                      src={team.image}
                      alt="team1"
                      width={380}
                      height={380}
                      className="w-full h-full min-h-[170px] min-w-[170px] md:min-w-[200px] object-cover transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer"
                    />
                  </div>

                  <div className=" w-full flex flex-col justify-center items-center">
                    <h2 className=" text-2xl font-semibold">{team.name}</h2>
                    <h4 className=" text-lg text-gray-700 font-medium">
                      {team.Designation}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
