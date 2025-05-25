// components/PawPrints.jsx
'use client'
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PetsIcon from '@mui/icons-material/Pets';

const PawPrints = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const pawAnimation = {
    hidden: { opacity: 0, y: 20, scale: 0.5 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <div ref={ref} className="flex justify-center gap-4 my-10">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={pawAnimation}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-3xl text-pink-500"
        >
          <PetsIcon />
        </motion.div>
      ))}
    </div>
  );
};

export default PawPrints;