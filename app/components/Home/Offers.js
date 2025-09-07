"use client";
import { motion } from "framer-motion";

const Offer = () => {
  return (
    <div className="w-full overflow-hidden bg-[#ff3971e5] py-2">
      <motion.div
        className="flex gap-10 whitespace-nowrap text-black text-[11px] md:text-lg font-semibold"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      >
        <span>Special Offer! 50% Off on All Items</span>
        <span>Free Shipping Above ₹99</span>
        <span>Limited Time Deal! Grab Now</span>
        <span>Special Offer! 50% Off on All Items</span>
        <span>Free Shipping Above ₹99</span>
        <span>Limited Time Deal! Grab Now</span>
        <span>Special Offer! 50% Off on All Items</span>
        <span>Free Shipping Above ₹99</span>
        <span>Limited Time Deal! Grab Now</span>
        <span>Special Offer! 50% Off on All Items</span>
        <span>Free Shipping Above ₹99</span>
        <span>Limited Time Deal! Grab Now</span>
        <span>Special Offer! 50% Off on All Items</span>
        <span>Free Shipping Above ₹99</span>
        <span>Limited Time Deal! Grab Now</span>
        <span>Special Offer! 50% Off on All Items</span>
        <span>Free Shipping Above ₹99</span>
        <span>Limited Time Deal! Grab Now</span>
      </motion.div>
    </div>
  );
};

export default Offer;
