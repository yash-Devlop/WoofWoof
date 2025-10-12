// "use client";
// import { motion } from "framer-motion";

// const Offer = () => {
//   return (
//     <div className="w-full overflow-hidden bg-[#ff3971e5] py-2">
//       <motion.div
//         className="flex gap-10 whitespace-nowrap text-black text-[11px] md:text-lg font-semibold"
//         animate={{ x: ["0%", "-100%"] }}
//         transition={{
//           repeat: Infinity,
//           duration: 20,
//           ease: "linear",
//         }}
//       >
//         <span>Special Offer! 50% Off on All Items</span>
//         <span>Free Shipping Above ₹99</span>
//         <span>Limited Time Deal! Grab Now</span>
//         <span>Special Offer! 50% Off on All Items</span>
//         <span>Free Shipping Above ₹99</span>
//         <span>Limited Time Deal! Grab Now</span>
//         <span>Special Offer! 50% Off on All Items</span>
//         <span>Free Shipping Above ₹99</span>
//         <span>Limited Time Deal! Grab Now</span>
//         <span>Special Offer! 50% Off on All Items</span>
//         <span>Free Shipping Above ₹99</span>
//         <span>Limited Time Deal! Grab Now</span>
//         <span>Special Offer! 50% Off on All Items</span>
//         <span>Free Shipping Above ₹99</span>
//         <span>Limited Time Deal! Grab Now</span>
//         <span>Special Offer! 50% Off on All Items</span>
//         <span>Free Shipping Above ₹99</span>
//         <span>Limited Time Deal! Grab Now</span>
//       </motion.div>
//     </div>
//   );
// };

// export default Offer;




"use client";
import { motion } from "framer-motion";

const Offer = () => {
  const offers = [
    "Special Offer! 50% Off on All Items",
    "Free Shipping Above ₹99",
    "Limited Time Deal! Grab Now",
    "Buy 1 Get 1 Free Today Only",
  ];

  // Triplicate ensures no blank gaps on large screens
  const repeatedOffers = [...offers, ...offers, ...offers];

  return (
    <div className="relative w-full overflow-hidden bg-[#ff3971e5] py-2">
      <motion.div
        className="flex gap-10 whitespace-nowrap text-black text-[11px] md:text-lg font-semibold"
        animate={{ x: ["0%", "-33.3333%"] }} // move only 1/3 of total since we tripled
        transition={{
          repeat: Infinity,
          duration: 25, // speed
          ease: "linear",
        }}
      >
        {repeatedOffers.map((offer, i) => (
          <span key={i} className="mx-4">
            {offer}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Offer;
