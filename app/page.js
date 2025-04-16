import Image from "next/image";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import HeroSection from "./components/Home/HeroSection";
import AboutSec from "./components/Home/AboutSec";
import BestSelling from "./components/Home/BestSelling";
import FeatureProfile from "./components/Home/FeatureProfile";
import NewsAndBlogs from "./components/Home/NewsAndBlogs";
import SmartWay from "./components/Home/SmartWay";
import Footer from "./components/Home/Footer";

export default function Home() {
  return (
    <div className="">
      <div className="hidden w-full md:flex justify-between px-24 py-2 ">
        <div className=" flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Image
              src="/icons/telephone.png"
              alt="telephone_icon"
              width={16}
              height={4}
              className=" object-fit h-5"
            />
            <p> +91-9999887030</p>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src="/icons/email.png"
              alt="telephone_icon"
              width={16}
              height={4}
              className=" object-fit h-5 w-6"
            />
            <p>info@wedmypet.com</p>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <Image
              src="/icons/location.png"
              alt="location_icon"
              width={16}
              height={4}
              className=" object-fit h-4 w-5"
            />
            <p> Faridabad, Haryana (india)</p>
          </div>
        </div>
      </div>
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
