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
    "/blog",
  ];
  const shouldHideNavAndOffers = hideNavAndOffersRoutes.some((route) =>
    path.startsWith(route)
  );

  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    document.body.style.overflow = showIntro ? "hidden" : "auto";
  }, [showIntro]);

  const handleVideoFinish = () => {
    setShowIntro(false);
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
    <>
      {showIntro ? (
        <IntroVideo onFinish={handleVideoFinish} />
      ) : (
        <Provider store={store}>
          <AuthInitializer />
          <AOSWrapper />
          <Toaster position="top-right" reverseOrder={false} />
          {!isAdminRoute && !shouldHideNavAndOffers && <NavBar />}
          {!isAdminRoute && !shouldHideNavAndOffers && <Offers />}
          {children}
          {!isAdminRoute && !shouldHideNavAndOffers && (
            <div>
              {showButton && (
                <Tooltip title="Back to top">
                  <div
                    onClick={scrollToTop}
                    className=" z-40 fixed bottom-33 right-7 cursor-pointer "
                  >
                    <BackToTopIcon />
                  </div>
                </Tooltip>
              )}
              <Image
                onClick={() => router.push("/cart")}
                src="/images/trolley.png"
                alt="whatsapp"
                width={40}
                height={40}
                className=" z-40 fixed bottom-20 right-7 cursor-pointer"
              />
              <Image
                src="/images/whatsapp.png"
                alt="whatsapp"
                width={35}
                height={35}
                className=" z-40 fixed bottom-7 right-7 cursor-pointer"
              />
            </div>
          )}
        </Provider>
      )}
    </>
  );
};

export default ClientLayout;
