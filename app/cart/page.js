import React from "react";
import CheckoutStepper from "../components/cartComponents/CheckoutStepper";
import ProductDescriptionHeader from "../components/shop/productDescription/ProductDescriptionHeader";
import Footer from "../components/Home/Footer";

const Page = () => {
  return (
    <div className=" ">
      <ProductDescriptionHeader />
      <CheckoutStepper />
      <Footer />
    </div>
  );
};

export default Page;
