import Image from "next/image";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import HeroSection from "./components/Home/HeroSection";
import AboutSec from "./components/Home/AboutSec";
import BestSelling from "./components/Home/BestSelling";
import FeatureProfile from "./components/Home/FeatureProfile";
import NewsAndBlogs from "./components/Home/NewsAndBlogs";
import SmartWay from "./components/Home/SmartWay";
import Footer from "./components/Home/Footer";
import Offers from "./components/Home/Offers";

export default function Home() {
  return (
    <div className=" bg-[#EEEEEE]">
      <Offers />
      <HeroSection />
      <AboutSec />
      <SmartWay />
      <BestSelling />
      <FeatureProfile />
      <NewsAndBlogs />
      <Footer />
    </div>
  );
}
