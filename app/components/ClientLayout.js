"use client";
import React from "react";
import NavBar from "./NavBar";
import AOSWrapper from "./AosWrapper";
import { Provider } from "react-redux";
import store from "@/store/store";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

const ClientLayout = ({ children }) => {
  const path = usePathname();
  const hideNavbar = path.startsWith("/adminPortal");
  return (
    <>
      <Provider store={store}>
        <AOSWrapper />
        <Toaster position="top-right" reverseOrder={false} />
        {!hideNavbar && <NavBar />}
        {children}
      </Provider>
    </>
  );
};

export default ClientLayout;
