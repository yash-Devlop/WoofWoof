import React from "react";
import AboutHeroSection from "../components/Aboutus/AboutHeroSection";
import AboutOurStore from "../components/Aboutus/AboutOurStore";
import FounderSec from "../components/Aboutus/FounderSec";
import OurTeam from "../components/Aboutus/OurTeam";
import Testimonial from "../components/Aboutus/Testimonial";
import InstaPage from "../components/Aboutus/InstaPage";
import Footer from "../components/Home/Footer";
import VideoSec from "../components/Aboutus/VideoSec";
import TinTinSec from "../components/Aboutus/TinTinSec";

const page = () => {
  return (
    <div className="  bg-[#EEEEEE]">
      <AboutHeroSection />
      <AboutOurStore />
      <TinTinSec />
      <div id="thirdSection">
        <FounderSec />
      </div>
      <OurTeam />
      <Testimonial />
      <VideoSec />
      {/* <InstaPage /> */}
      <Footer />
    </div>
  );
};

export default page;
