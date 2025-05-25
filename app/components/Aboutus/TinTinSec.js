"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const TinTinSec = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dummyImages = [
    "/images/tinTin1.png",
    "/images/tinTin2.png",
    "/images/tinTin1.png",
  ];

  return (
    <div className="bg-white rounded-3xl m-4 md:m-12 py-6">
      <h2 className="text-2xl font-bold text-center mb-6">Meet Tin Tin</h2>

      <div
        className={`flex ${
          isMobile
            ? "overflow-x-auto gap-4 scroll-smooth px-4"
            : "flex-wrap justify-center gap-6"
        }`}
      >
        {dummyImages.map((src, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: isMobile ? 0.8 : 1 }}
            whileHover={!isMobile ? { scale: 1.05 } : {}}
            whileInView={isMobile ? { scale: 1.05 } : {}}
            transition={{ duration: 0.5 }}
            viewport={{ once: false, amount: 0.6 }}
            className={`rounded-3xl overflow-hidden shadow-lg ${
              isMobile ? "flex-shrink-0 w-[250px]" : "w-[300px] h-[300px]"
            }`}
          >
            <Image
              src={src}
              alt={`Puppy ${idx + 1}`}
              width={400}
              height={400}
              className="w-full h-auto object-cover rounded-xl"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TinTinSec;
