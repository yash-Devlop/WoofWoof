// "use client";
// import Image from "next/image";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { easeInOut, motion } from "framer-motion";

// const HeroSection = () => {
//   const router = useRouter();
//   const [isHovered, setIsHovered] = useState(false);
//   const wordAnimation = {
//     hidden: { y: 20, opacity: 0 },
//     visible: (i) => ({
//       y: 0,
//       opacity: 1,
//       transition: { delay: i * 0.1, duration: 0.5 },
//     }),
//   };

//   return (
//     <div data-aos="fade-down" className="relative w-full pt-20 ">
//       <div className=" absolute inset-0 opacity-30">
//         <Image
//           src="/images/pinkPaws.png"
//           alt="background paws"
//           fill
//           className=" object-top w-full h-full"
//         />
//       </div>
//       <div className=" px-4 md:px-16 xl:px-30">
//         <div className="relative w-full">
//           <div className=" absolute inset-0  ">
//             {/* Top Image */}
//             <div className="absolute top-0 left-0">
//               <motion.div
//                 initial={{ x: 20, y: -10, scale: 1 }}
//                 animate={{
//                   x: [0, -30, -50, -30, 0],
//                   y: [0, 20, 40, 20, 0],
//                 }}
//                 transition={{
//                   duration: 7,
//                   repeat: Infinity,
//                   ease: "linear",
//                 }}
//               >
//                 <Image
//                   src="/images/testimonialBg.png"
//                   alt="floatingVector1"
//                   width={200}
//                   height={200}
//                   className="object-contain h-[100px] w-[100px] lg:h-[150px] lg:w-[150px]"
//                 />
//               </motion.div>
//             </div>
//             {/* Bottom Image */}
//             <div className="absolute bottom-3/5 lg:bottom-1/5 right-4 lg:right-1/2">
//               <motion.div
//                 initial={{ x: 10, y: -10, scale: 1 }}
//                 animate={{
//                   x: [0, 20, 40, 20, 0],
//                   y: [0, -10, 0, 10, 0],
//                 }}
//                 transition={{
//                   duration: 7,
//                   repeat: Infinity,
//                   ease: "linear",
//                 }}
//               >
//                 <Image
//                   src="/images/transitionBg.png"
//                   alt="floatingVector2"
//                   width={200}
//                   height={200}
//                   className="object-contain h-[100px] w-[100px] lg:h-[150px] lg:w-[150px]"
//                 />
//               </motion.div>
//             </div>
//           </div>
//           <Image
//             src="/images/Group1.png"
//             alt="group"
//             fill
//             className="hidden  absolute w-full h-full  object-contain"
//           />
//           <div className=" grid grid-cols-1 lg:grid-cols-2 gap-10 lg:py-24 ">
//             <div className="relative flex flex-col justify-center items-center lg:items-start space-y-10  lg:space-y-20">
//               <div
//                 // data-aos="fade-right"
//                 // data-aos-duration="1500"
//                 className=" text-3xl text-center md:text-start lg:text-5xl font-bold"
//               >
//                 <span
//                   className="text-[#ff0047] font-bold"
//                   style={{
//                     WebkitTextStroke: '1px #EEEEEE',
//                     WebkitTextFillColor: '#ff0047',
//                   }}
//                 >
//                   Woof Woof,
//                 </span>

//                 <span>
//                   our one stop destination for fun, safe, and durable pet toys.
//                   Keep your furry friends happy, active, and entertained every
//                   day.
//                 </span>
//               </div>
//               <div className=" flex  gap-8">
//                 <button
//                   onClick={() => router.push("/register")}
//                   className={` bg-black/97 gap-1 flex justify-center items-center pl-4 pr-1.5  py-1 group hover:scale-105 transition-all duration-300 text-white font-medium lg:text-lg  rounded-full uppercase cursor-pointer`}
//                 >
//                   Register Now
//                   <motion.span className=" ">
//                     <Image
//                       src="/images/logo.png"
//                       width={33}
//                       height={33}
//                       alt="logo"
//                       className="  group-hover:block transition-all duration-300"
//                     />
//                   </motion.span>
//                 </button>
//               </div>
//             </div>
//             <div
//               // data-aos="fade-right"
//               // data-aos-duration="1500"
//               className=" relative flex w-full h-full justify-center items-center"
//             >
//               <Image
//                 src="/images/pinkBG.png"
//                 alt="Background"
//                 fill
//                 className=" object-contain " // customize as needed
//               />
//               <div className=" h-full w-full flex justify-center xl:pl-20 lg:justify-start  items-center">
//                 <Image
//                   src="/images/heroImage.png"
//                   alt="heroImage"
//                   width={400}
//                   height={200}
//                   className=" object-cover lg:left-10  relative"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;











"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { easeInOut, motion } from "framer-motion";

const HeroSection = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const woofTextRef = useRef(null);
  const ballRef = useRef(null);
  const [ballPosition, setBallPosition] = useState({ x: -9999, y: -9999 });
  const [circleRadius, setCircleRadius] = useState(60);

  // Update circle radius based on screen size
  React.useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 640) {
        setCircleRadius(50); // Mobile - match ball size
      } else if (window.innerWidth < 1024) {
        setCircleRadius(62.5); // Tablet
      } else {
        setCircleRadius(75); // Desktop - match ball size
      }
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  const wordAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <div data-aos="fade-down" className="relative w-full pt-20 ">
      <div className=" absolute inset-0 opacity-30">
        <Image
          src="/images/pinkPaws.png"
          alt="background paws"
          fill
          className=" object-top w-full h-full"
        />
      </div>
      <div className=" px-4 md:px-16 xl:px-30">
        <div className="relative w-full">
          <div className=" absolute inset-0  ">
            {/* Top Image with position tracking - replaced with CSS blob shape */}
            <div className="absolute top-0 left-0">
              <motion.div
                ref={ballRef}
                initial={{ x: 20, y: -10, scale: 1 }}
                animate={{
                  x: [0, -30, -50, -30, 0],
                  y: [0, 20, 40, 20, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "linear",
                }}
                onUpdate={(latest) => {
                  if (woofTextRef.current && ballRef.current) {
                    requestAnimationFrame(() => {
                      const woofRect = woofTextRef.current.getBoundingClientRect();
                      const ballRect = ballRef.current.getBoundingClientRect();
                      
                      // Calculate ball center relative to "Woof Woof" span element
                      const ballCenterX = ballRect.left + ballRect.width / 2 - woofRect.left;
                      const ballCenterY = ballRect.top + ballRect.height / 2 - woofRect.top;
                      
                      setBallPosition({
                        x: ballCenterX,
                        y: ballCenterY,
                      });
                    });
                  }
                }}
                className="h-[100px] w-[100px] lg:h-[150px] lg:w-[150px] relative"
                style={{
                  background: '#E6275A',
                  borderRadius: '45% 55% 52% 48% / 48% 45% 55% 52%',
                }}
              >
              </motion.div>
            </div>
            {/* Bottom Image */}
            <div className="absolute bottom-3/5 lg:bottom-1/5 right-4 lg:right-1/2">
              <motion.div
                initial={{ x: 10, y: -10, scale: 1 }}
                animate={{
                  x: [0, 20, 40, 20, 0],
                  y: [0, -10, 0, 10, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Image
                  src="/images/transitionBg.png"
                  alt="floatingVector2"
                  width={200}
                  height={200}
                  className="object-contain h-[100px] w-[100px] lg:h-[150px] lg:w-[150px]"
                />
              </motion.div>
            </div>
          </div>
          <Image
            src="/images/Group1.png"
            alt="group"
            fill
            className="hidden  absolute w-full h-full  object-contain"
          />
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-10 lg:py-24 ">
            <div className="relative flex flex-col justify-center items-center lg:items-start space-y-10  lg:space-y-20">
              <div
                className=" text-3xl text-center md:text-start lg:text-5xl font-bold relative"
              >
                {/* Background layer - pink for "Woof Woof" */}
                <div className="relative">
                  <span ref={woofTextRef} className="text-[#ff0047] font-bold relative inline-block">
                    Woof Woof,
                    {/* White mask layer only for "Woof Woof" */}
                    <span 
                      className="absolute top-0 left-0 text-white font-bold pointer-events-none whitespace-nowrap"
                      style={{
                        clipPath: `circle(${circleRadius}px at ${ballPosition.x}px ${ballPosition.y}px)`,
                      }}
                    >
                      Woof Woof,
                    </span>
                  </span>
                  <span className="text-black">
                    {" "}our one stop destination for fun, safe, and durable pet toys.
                    Keep your furry friends happy, active, and entertained every
                    day.
                  </span>
                </div>
              </div>
              <div className=" flex  gap-8">
                <button
                  onClick={() => router.push("/register")}
                  className={` bg-black/97 gap-1 flex justify-center items-center pl-4 pr-1.5  py-1 group hover:scale-105 transition-all duration-300 text-white font-medium lg:text-lg  rounded-full uppercase cursor-pointer`}
                >
                  Register Now
                  <motion.span className=" ">
                    <Image
                      src="/images/logo.png"
                      width={33}
                      height={33}
                      alt="logo"
                      className="  group-hover:block transition-all duration-300"
                    />
                  </motion.span>
                </button>
              </div>
            </div>
            <div
              className=" relative flex w-full h-full justify-center items-center"
            >
              <Image
                src="/images/pinkBG.png"
                alt="Background"
                fill
                className=" object-contain " // customize as needed
              />
              <div className=" h-full w-full flex justify-center xl:pl-20 lg:justify-start  items-center">
                <Image
                  src="/images/heroImage.png"
                  alt="heroImage"
                  width={400}
                  height={200}
                  className=" object-cover lg:left-10  relative"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;