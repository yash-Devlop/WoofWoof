"use client";
import HeroSection from "./components/Home/HeroSection";
import AboutSec from "./components/Home/AboutSec";
import BestSelling from "./components/Home/BestSelling";
import NewsAndBlogs from "./components/Home/NewsAndBlogs";
import SmartWay from "./components/Home/SmartWay";
import Footer from "./components/Home/Footer";
import { useEffect } from "react";

export default function Home() {
  // Razorpay script load
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // ✅ Scroll to hash on mount or when hash changes
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth" });
          }, 300);
        }
      }
    };

    // Run once on mount
    scrollToHash();

    // Run again whenever hash changes (client-side navigation)
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return (
    <div className="bg-[#EEEEEE]">
      <HeroSection />
      <AboutSec />
      <div id="thirdSection">
        <SmartWay />
      </div>
      {/* 👇 Make sure this matches the hash name */}
      <BestSelling id="bestseller" />
      <NewsAndBlogs />
      <Footer />
    </div>
  );
}
