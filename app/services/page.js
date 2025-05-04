import React from "react";
import Offers from "../components/Home/Offers";
import ServiceHeroSec from "../components/services/ServiceHeroSec";
import ServicesSec from "../components/services/ServicesSec";
import Footer from "../components/Home/Footer";
import MoreServices from "../components/services/MoreServices";

const page = () => {
  return (
    <div className=" bg-[#EEEEEE]">
      <Offers />
      <ServiceHeroSec />
      <ServicesSec />
      <MoreServices />
      <Footer />
    </div>
  );
};

export default page;
