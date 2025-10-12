"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const AboutHeroSection = () => {
    const router = useRouter();
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

    return (
        <div data-aos="fade-down" className="w-full relative pt-20 md:pt-0">
            {/* Background Paws - Fixed for mobile, original for desktop */}
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
                    <div className="absolute inset-0">
                        {/* Top Image with position tracking - replaced with CSS blob shape */}
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
                        <div className="absolute bottom-3/5 lg:bottom-1/8 right-4 lg:right-1/2">
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
                        className="hidden absolute w-full h-full object-contain"
                    />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:pt-4">
                        <div className="relative flex flex-col justify-center items-center lg:items-start lg:space-y-20">
                            <div className="text-3xl lg:text-5xl font-bold text-center lg:text-start">
                                <span>
                                    <span ref={woofTextRef} className="text-[#ff0047] font-semibold relative inline-block">
                                        Woof Woof!
                                        {/* White mask layer only for "Woof Woof!" */}
                                        <span 
                                            className="absolute top-0 left-0 text-white font-semibold pointer-events-none whitespace-nowrap"
                                            style={{
                                                clipPath: `circle(${circleRadius}px at ${ballPosition.x}px ${ballPosition.y}px)`,
                                            }}
                                        >
                                            Woof Woof!
                                        </span>
                                    </span>
                                    <span className="text-black"> dedication to serving animal resonates deeply with our values.</span>
                                </span>
                            </div>
                        </div>
                        <div className="relative flex w-full h-full justify-start items-center">
                            <Image
                                src="/images/pinkBG.png"
                                alt="Background"
                                fill
                                className="absolute inset-0 w-full h-full object-contain"
                            />
                            <div className="flex justify-center xl:pl-20 items-center">
                                <Image
                                    src="/images/aboutHeroImg.png"
                                    alt="heroImage"
                                    width={420}
                                    height={400}
                                    className="object-contain relative"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutHeroSection;