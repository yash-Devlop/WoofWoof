"use client";
import React, { useRef } from "react";
import ShopHero from "../components/shop/ShopHero";
import Footer from "../components/Home/Footer";
import ProductPage from "../components/shop/productComponents/ProductPage";

const page = () => {
  const productRef = useRef(null);
  return (
    <div className=" bg-[#EEEEEE]">
      <ShopHero
        scrollToProduct={() =>
          productRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      />
      <ProductPage innerRef={productRef} />
      <Footer />
    </div>
  );
};

export default page;
