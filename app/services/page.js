import React from "react";
import ServiceHeroSec from "../components/services/ServiceHeroSec";
import ServicesSec from "../components/services/ServicesSec";
import Footer from "../components/Home/Footer";
import MoreServices from "../components/services/MoreServices";
import PawPrints from "../components/services/PawPrints";

const page = () => {
  return (
    <div className=" bg-[#EEEEEE]">
      <ServiceHeroSec />
      {/* <PawPrints /> */}
      <ServicesSec />
      <MoreServices />
      <Footer />
    </div>
  );
};

export default page;
