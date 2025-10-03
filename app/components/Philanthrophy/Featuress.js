// "use client";
// import { Opacity } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import React from "react";

// const Features = () => {
//   const teamData = [
//     {
//       id: 1,
//       name: "Rajiv",
//       Designation: "Commercial Operation",
//       image: "/images/team1.png",
//     },
//     {
//       id: 2,
//       name: "Rithwik",
//       Designation: "Marketing Head",
//       image: "/images/team2.png",
//     },
//     {
//       id: 3,
//       name: "Iyra",
//       Designation: "Social Media Manager",
//       image: "/images/team3.png",
//     },
//   ];
//   return (
//     <div className="w-full relative">
//       <div className="bg-white rounded-3xl m-4 md:m-12 py-6">
//         <div className=" px-4 md:px-16 xl:px-40">
//           <div className=" flex justify-center">
//             <h2 className=" text-4xl font-bold tracking-wide mb-6">Our Team</h2>
//           </div>
//           <div className=" overflow-x-auto  no-scrollbar scrollbar-hide">
//             <motion.div
//               initial={{ Opacity: 0, scale: 0.8 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5 }}
//               className=" flex xl:grid xl:grid-cols-3 gap-4"
//             >
//               {teamData.map((team, index) => (
//                 <div
//                   //  data-aos="zoom-in"
//                   key={index}
//                   className=" space-y-4"
//                 >
//                   <div className=" overflow-hidden rounded-3xl ">
//                     <Image
//                       src={team.image}
//                       alt="team1"
//                       width={380}
//                       height={380}
//                       className="w-full h-full min-h-[170px] min-w-[170px] md:min-w-[200px] object-cover transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer"
//                     />
//                   </div>

//                   <div className=" w-full flex flex-col justify-center items-center">
//                     <h2 className=" text-2xl font-semibold">{team.name}</h2>
//                     <h4 className=" text-lg text-gray-700 font-medium">
//                       {team.Designation}
//                     </h4>
//                   </div>
//                 </div>
//               ))}
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Features;




"use client";
import { motion } from "framer-motion";
import React from "react";

const Features = () => {
  const featuresData = [
    {
      id: 1,
      title: "Focus on the Animals",
      description:
        "WoofWoof provides free medical treatment and rescue facilities for dogs in need, ensuring access to crucial healthcare.",
    },
    {
      id: 2,
      title: "Community Involvement",
      description:
        "As a non-profit supported by donations, WoofWoof embodies a strong commitment to community well-being and canine welfare.",
    },
    {
      id: 3,
      title: "State-of-the-Art Facilities",
      description:
        "Equipped with modern veterinary equipment and dedicated rescue teams, WoofWoof ensures every dog receives the best possible care.",
    },
  ];

  return (
    <div className="w-full relative">
      <div className="bg-white rounded-3xl m-4 md:m-12 py-6">
        <div className="px-4 md:px-16 xl:px-40">
          <div className="flex justify-center">
            <h2 className="text-4xl font-bold tracking-wide mb-6 text-[#ff0047]">
              Our Commitment to Dogs
            </h2>
          </div>

          <div className="overflow-x-auto no-scrollbar scrollbar-hide">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row xl:grid xl:grid-cols-3 gap-6"
            >
              {featuresData.map((feature) => (
                <div
                  key={feature.id}
                  className="rounded-3xl p-6 shadow-md border border-gray-200 flex flex-col justify-center items-center text-center min-h-[220px] min-w-[220px] md:min-w-[260px] bg-gray-50 hover:shadow-lg transition"
                >
                  <h2 className="text-xl font-semibold text-[#ff0047] mb-3">
                    {feature.title}
                  </h2>
                  <p className="text-gray-700">{feature.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
