import React from "react";
import Offers from "../components/Home/Offers";
import ShopHero from "../components/shop/ShopHero";
import Footer from "../components/Home/Footer";
import ProductPage from "../components/shop/productComponents/ProductPage";

const page = () => {
  return (
    <div className=" bg-[#EEEEEE]">
      <Offers />
      <ShopHero />
      <ProductPage />
      <Footer />
    </div>
  );
};

export default page;
