"use client";
import Image from "next/image";

import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import HeroSection from "./components/Home/HeroSection";
import AboutSec from "./components/Home/AboutSec";
import BestSelling from "./components/Home/BestSelling";
import FeatureProfile from "./components/Home/FeatureProfile";
import NewsAndBlogs from "./components/Home/NewsAndBlogs";
import SmartWay from "./components/Home/SmartWay";
import Footer from "./components/Home/Footer";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  return (
    <div className=" bg-[#EEEEEE]">
      <HeroSection />
      <AboutSec />
      <div id="thirdSection">
        <SmartWay />
      </div>
      <BestSelling />
      {/* <FeatureProfile /> */}
      <NewsAndBlogs />
      <Footer />
    </div>
  );
}
