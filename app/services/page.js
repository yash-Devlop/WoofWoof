import React from "react";
import ServiceHeroSec from "../components/services/ServiceHeroSec";
import ServicesSec from "../components/services/ServicesSec";
import Footer from "../components/Home/Footer";
import MoreServices from "../components/services/MoreServices";

const page = () => {
  return (
    <div className=" bg-[#EEEEEE]">
      <ServiceHeroSec />
      <ServicesSec />
      <MoreServices />
      <Footer />
    </div>
  );
};

export default page;
