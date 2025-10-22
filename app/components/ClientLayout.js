"use client";
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import AOSWrapper from "./AosWrapper";
import { Provider } from "react-redux";
import store from "@/store/store";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import Offers from "./Home/Offers";
import IntroVideo from "./IntroVideo";
import BackToTopIcon from "@/public/icons/BackToTopIcon";
import Tooltip from "@mui/material/Tooltip";
import AuthInitializer from "@/store/slices/user/AuthInitializer";

const ClientLayout = ({ children }) => {
  const router = useRouter();
  const path = usePathname();
  const isAdminRoute = path.startsWith("/admin");
  const [showButton, setShowButton] = useState(false);
  const hideNavAndOffersRoutes = [
    "/terms-and-conditions",
    "/privacy-policy",
    "/login",
    "/register",
  ];
  const shouldHideNavAndOffers = hideNavAndOffersRoutes.some((route) =>
    path.startsWith(route)
  );

  // Initialize showIntro based on current path
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === "undefined") return false;
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
    return path === "/" && !hasSeenIntro;
  });

  useEffect(() => {
    // Only show intro on home page and only once per session
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
    if (path === "/" && !hasSeenIntro) {
      setShowIntro(true);
    } else {
      setShowIntro(false);
    }
  }, [path]);

  useEffect(() => {
    document.body.style.overflow = showIntro ? "hidden" : "auto";
  }, [showIntro]);

  const handleVideoFinish = () => {
    setShowIntro(false);
    sessionStorage.setItem("hasSeenIntro", "true");
  };

  useEffect(() => {
    const handleScroll = () => {
      const thirdSection = document.getElementById("thirdSection");
      if (!thirdSection) return;

      const secondSectionOffsetTop = thirdSection.offsetTop;
      const currentScroll = window.scrollY;

      setShowButton(currentScroll > secondSectionOffsetTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Provider store={store}>
      <AuthInitializer />
      <AOSWrapper />
      <Toaster position="top-right" reverseOrder={false} />

      {showIntro ? (
        <IntroVideo onFinish={handleVideoFinish} />
      ) : (
        <>
          {!isAdminRoute && !shouldHideNavAndOffers && <NavBar />}
          {!isAdminRoute && !shouldHideNavAndOffers && <Offers />}
          {children}

          {!isAdminRoute && !shouldHideNavAndOffers && (
            <div>
              {showButton && (
                <Tooltip title="Back to top">
                  <div
                    onClick={scrollToTop}
                    className="z-40 fixed bottom-33 right-7 cursor-pointer"
                  >
                    <BackToTopIcon />
                  </div>
                </Tooltip>
              )}

              <Image
                onClick={() => router.push("/cart")}
                src="/images/trolley.png"
                alt="cart"
                width={40}
                height={40}
                className="z-40 fixed bottom-20 right-7 cursor-pointer"
              />
              <a
                href="https://wa.me/+9193184 93050"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/whatsapp.png"
                  alt="whatsapp"
                  width={35}
                  height={35}
                  className="z-40 fixed bottom-7 right-7 cursor-pointer"
                />
              </a>
            </div>
          )}
        </>
      )}
    </Provider>
  );
};

export default ClientLayout;