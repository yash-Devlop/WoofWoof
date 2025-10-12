"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const blueOceanHeroSection = () => {
    const router = useRouter();
    const woofTextRef = useRef(null);
    const ballRef = useRef(null);
    const [ballPosition, setBallPosition] = useState({ x: -9999, y: -9999 });
    const [circleRadius, setCircleRadius] = useState(60);

    // Update circle radius based on screen size
    React.useEffect(() => {
        const updateRadius = () => {
            if (window.innerWidth < 640) {
                setCircleRadius(40);
            } else if (window.innerWidth < 1024) {
                setCircleRadius(62.5);
            } else {
                setCircleRadius(75);
            }
        };

        updateRadius();
        window.addEventListener('resize', updateRadius);
        return () => window.removeEventListener('resize', updateRadius);
    }, []);

    return (
        <div data-aos="fade-down" className="w-full relative pt-28 md:pt-0 pb-8 md:pb-0">
            {/* Background Paws - Fixed sizing for mobile */}
            <div className="absolute inset-0 opacity-20 md:opacity-30">
                <Image
                    src="/images/pinkPaws.png"
                    alt="background paws"
                    fill
                    className="object-cover object-center md:object-contain md:object-top"
                    priority
                />
            </div>

            <div className="px-4 md:px-16 xl:px-30">
                <div className="relative w-full">
                    {/* Floating Elements */}
                    <div className="absolute inset-0">
                        {/* Top Blob */}
                        <div className="absolute top-0 left-0">
                            <motion.div
                                ref={ballRef}
                                initial={{ x: 20, y: -10, scale: 1 }}
                                animate={{
                                    x: [0, -30, -60, -30, 0],
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
                                            
                                            const ballCenterX = ballRect.left + ballRect.width / 2 - woofRect.left;
                                            const ballCenterY = ballRect.top + ballRect.height / 2 - woofRect.top;
                                            
                                            setBallPosition({
                                                x: ballCenterX,
                                                y: ballCenterY,
                                            });
                                        });
                                    }
                                }}
                                className="h-[80px] w-[80px] md:h-[100px] md:w-[100px] lg:h-[150px] lg:w-[150px]"
                                style={{
                                    background: '#E6275A',
                                    borderRadius: '45% 55% 52% 48% / 48% 45% 55% 52%',
                                }}
                            />
                        </div>

                        {/* Bottom Floating Vector */}
                        <div className="absolute bottom-3/5 right-4 md:bottom-1/8 md:right-4 lg:right-1/2">
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
                                    className="object-contain h-[80px] w-[80px] md:h-[100px] md:w-[100px] lg:h-[150px] lg:w-[150px]"
                                />
                            </motion.div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-4 lg:pt-4">
                        {/* Left Side - Text Content */}
                        <div className="relative flex flex-col justify-center items-center lg:items-start lg:space-y-20 order-2 lg:order-1">
                            <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center lg:text-start">
                                <span>
                                    <span 
                                        ref={woofTextRef} 
                                        className="text-[#ff0047] font-semibold relative inline-block"
                                    >
                                        Blue Ocean
                                        {/* White mask layer */}
                                        <span 
                                            className="absolute top-0 left-0 text-white font-semibold pointer-events-none whitespace-nowrap"
                                            style={{
                                                clipPath: `circle(${circleRadius}px at ${ballPosition.x}px ${ballPosition.y}px)`,
                                            }}
                                        >
                                            Blue Ocean
                                        </span>
                                    </span>
                                    <br />
                                    <span className="text-black">About Us</span>
                                </span>
                            </div>
                        </div>

                        {/* Right Side - Image */}
                        <div className="relative flex w-full h-full justify-start items-center order-1 lg:order-2">
                            {/* Pink Background */}
                            <Image
                                src="/images/pinkBG.png"
                                alt="Background"
                                fill
                                className="absolute inset-0 w-full h-full object-contain"
                            />

                            {/* Hero Image */}
                            <div className="flex justify-center xl:pl-20 items-center w-full">
                                <Image
                                    src="/images/aboutHeroImg.png"
                                    alt="heroImage"
                                    width={420}
                                    height={400}
                                    className="object-contain relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] lg:w-[420px] lg:h-[400px]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default blueOceanHeroSection;