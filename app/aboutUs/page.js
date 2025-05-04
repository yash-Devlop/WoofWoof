import React from "react";
import Offers from "../components/Home/Offers";
import AboutHeroSection from "../components/Aboutus/AboutHeroSection";
import AboutOurStore from "../components/Aboutus/AboutOurStore";
import FounderSec from "../components/Aboutus/FounderSec";
import OurTeam from "../components/Aboutus/OurTeam";
import Testimonial from "../components/Aboutus/Testimonial";
import InstaPage from "../components/Aboutus/InstaPage";
import Footer from "../components/Home/Footer";
import VideoSec from "../components/Aboutus/VideoSec";

const page = () => {
  return (
    <div className="  bg-[#EEEEEE]">
      <Offers />
      <AboutHeroSection />
      <AboutOurStore />
      <FounderSec />
      <OurTeam />
      <Testimonial />
      <VideoSec />
      <InstaPage />
      <Footer />
    </div>
  );
};

export default page;
