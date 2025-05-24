"use client";
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import AOSWrapper from "./AosWrapper";
import { Provider } from "react-redux";
import store from "@/store/store";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import Offers from "./Home/Offers";
import IntroVideo from "./IntroVideo";

const ClientLayout = ({ children }) => {
  const path = usePathname();
  const isAdminRoute = path.startsWith("/admin");

  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    document.body.style.overflow = showIntro ? "hidden" : "auto";
  }, [showIntro]);

  const handleVideoFinish = () => {
    setShowIntro(false);
  };

  return (
    <>
      {showIntro ? (
        <IntroVideo onFinish={handleVideoFinish} />
      ) : (
        <Provider store={store}>
          <AOSWrapper />
          <Toaster position="top-right" reverseOrder={false} />
          {!isAdminRoute && <NavBar />}
          <Offers />
          {children}
          {!isAdminRoute && (
            <Image
              src="/images/whatsapp.png"
              alt="whatsapp"
              width={40}
              height={40}
              className=" z-40 fixed bottom-7 right-7 animate-bounce"
            />
          )}
        </Provider>
      )}
    </>
  );
};

export default ClientLayout;
