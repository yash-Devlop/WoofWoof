"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const TinTinSec = () => {
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    let isUserScrolling = false;
    let userScrollTimeout;
    let currentIndex = 0;

    const scrollToNext = () => {
      if (isUserScrolling) return;

      currentIndex++;
      
      const cardWidth = 250 + 16;
      const targetScroll = currentIndex * cardWidth;
      
      // Smooth scroll with easing
      container.scrollTo({
        left: targetScroll,
        behavior: "smooth"
      });

      if (currentIndex >= 3) {
        setTimeout(() => {
          container.scrollTo({
            left: 0,
            behavior: "auto"
          });
          currentIndex = 0;
        }, 800);
      }
    };

    // Scroll every 2.5 seconds with ease
    const intervalId = setInterval(scrollToNext, 2500);

    const handleUserScroll = () => {
      isUserScrolling = true;
      clearTimeout(userScrollTimeout);
      
      userScrollTimeout = setTimeout(() => {
        isUserScrolling = false;
        // Snap to nearest card and continue from there
        const cardWidth = 250 + 16;
        currentIndex = Math.round(container.scrollLeft / cardWidth);
        if (currentIndex >= 3) currentIndex = 0;
      }, 2000);
    };

    container.addEventListener("touchstart", handleUserScroll);
    container.addEventListener("touchmove", handleUserScroll);
    container.addEventListener("wheel", handleUserScroll);

    return () => {
      clearInterval(intervalId);
      clearTimeout(userScrollTimeout);
      container.removeEventListener("touchstart", handleUserScroll);
      container.removeEventListener("touchmove", handleUserScroll);
      container.removeEventListener("wheel", handleUserScroll);
    };
  }, [isMobile]);

  const dummyImages = [
    "/images/tinTin1.png",
    "/images/tinTin2.png",
    "/images/tinTin1.png",
  ];

  // Duplicate images for seamless loop
  const loopedImages = isMobile ? [...dummyImages, ...dummyImages] : dummyImages;

  return (
    <div className="bg-white rounded-3xl m-4 md:m-12 py-6">
      <h2 className="text-2xl font-bold text-center mb-6">Meet Tin Tin</h2>

      <div
        ref={scrollContainerRef}
        className={`flex ${
          isMobile
            ? "overflow-x-auto gap-4 px-4 scrollbar-hide snap-x snap-mandatory"
            : "flex-wrap justify-center gap-6"
        }`}
        style={isMobile ? { 
          scrollbarWidth: "none", 
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch"
        } : {}}
      >
        {loopedImages.map((src, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: isMobile ? 0.85 : 1, opacity: isMobile ? 0.6 : 1 }}
            whileHover={!isMobile ? { scale: 1.05 } : {}}
            whileInView={isMobile ? { scale: 1, opacity: 1 } : {}}
            transition={{ 
              duration: 0.6,
              ease: [0.34, 1.56, 0.64, 1] // Smooth ease-out with slight bounce
            }}
            viewport={{ once: false, amount: 0.7 }}
            className={`rounded-3xl overflow-hidden shadow-lg snap-center ${
              isMobile ? "flex-shrink-0 w-[250px]" : "w-[300px] h-[300px]"
            }`}
          >
            <Image
              src={src}
              alt={`Puppy ${(idx % dummyImages.length) + 1}`}
              width={400}
              height={400}
              className="w-full h-auto object-cover rounded-xl"
            />
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default TinTinSec;