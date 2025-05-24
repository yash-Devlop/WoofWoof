import React, { useEffect } from "react";
import Image from "next/image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/store/slices/user/productSlice";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductGrid() {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Failed to load products.</p>;

  const fadeDown = {
    hidden: { opacity: 0, y: -30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: i * 0.2, // stagger based on index
      },
    }),
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <motion.div
          key={index}
          custom={index}
          variants={fadeDown}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Link href={`/shop/${product._id}`}>
            <div className="rounded-2xl cursor-pointer shadow-md hover:shadow-lg transition-transform hover:scale-[1.02]">
              <div className="bg-[#ececec] lg:min-h-[200px] overflow-hidden rounded-t-2xl">
                <Image
                  src={`/${product?.images?.[0]?.url || "placeholder.png"}`}
                  alt={product?.images?.[0]?.altText || product.name}
                  width={100}
                  height={100}
                  className="w-full h-32 object-contain mb-2"
                />
              </div>
              <div className="p-3 flex justify-between">
                <div>
                  <h3 className="text-sm font-medium">{product.name}</h3>
                  <p className="text-gray-600 text-sm">₹{product.price}</p>
                </div>
                <div>
                  <FavoriteBorderIcon
                    sx={{
                      color: "#ff4081",
                      fontSize: "22px",
                      cursor: "pointer",
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
