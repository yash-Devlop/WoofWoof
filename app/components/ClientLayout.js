"use client";
import React from "react";
import NavBar from "./NavBar";
import AOSWrapper from "./AosWrapper";
import { Provider } from "react-redux";
import store from "@/store/store";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Image from "next/image";

const ClientLayout = ({ children }) => {
  const path = usePathname();
  const isAdminRoute = path.startsWith("/admin");
  return (
    <>
      <Provider store={store}>
        <AOSWrapper />
        <Toaster position="top-right" reverseOrder={false} />
        {!isAdminRoute && <NavBar />}
        {children}
        {!isAdminRoute && (
          <Image
            src="/images/whatsapp.png"
            alt="whatsapp"
            width={40}
            height={40}
            className=" fixed bottom-7 right-7 animate-bounce"
          />
        )}
      </Provider>
    </>
  );
};

export default ClientLayout;
