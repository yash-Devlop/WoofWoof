"use client";
import Image from "next/image";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // Convert pathname to the correct format
    let page =
      pathname === "/"
        ? "Home"
        : pathname
            .replace(/^\//, "") // Remove leading slash
            .split(/(?=[A-Z])/) // Optional capital-split
            .map((word, index) =>
              index === 0
                ? word.toLowerCase()
                : word.charAt(0).toUpperCase() + word.slice(1)
            )[0] // Take first segment
            .split("/")[0]; // Extract first "folder" like "work"

    // Map route names to menu labels
    const tabMap = {
      shop: "Shop",
      about: "About Us",
      products: "Products",
      services: "Services",
      contact: "Contact Us",
    };

    setActiveTab(tabMap[page] || "Home");
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 10) {
        setShowNavbar(false); // scroll down
      } else {
        setShowNavbar(true); // scroll up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="w-full shadow-md mx-auto flex justify-center">
      {/* Main Nav Bar */}
      <nav
        className={` fixed z-50   gap-28 ${
          showNavbar ? "translate-y-0 top-8 md:top-11" : "-translate-y-full"
        } md:gap-[8rem] xl:gap-[10rem] transition-all duration-300 flex items-center justify-between px-4 py-2 md:px-6 bg-white shadow-lg rounded-full`}
      >
        {/* Left - Logo */}
        {/* <div className="flex items-center lg:gap-6">
          <Image
            onClick={() => router.push("/")}
            src="/images/logo.png"
            alt="logo"
            width={200}
            height={200}
            className="md:h-12 md:w-12 h-10 w-10 object-cover cursor-pointer rounded-full"
          ></Image>
          <h1 className="font-bold text-xl hidden lg:block">Wed My Pet</h1>
        </div> */}
        <div className="flex items-center lg:gap-6">
          <video
            onClick={() => router.push("/")}
            src="/video/animatedLogo.mp4"
            width={96} // equal to 12 tailwind units
            height={96}
            className="md:h-12 md:w-12 h-10 w-10 object-cover cursor-pointer"
            autoPlay
            loop
            muted
            playsInline
          />
          <h1 className="font-bold text-xl hidden lg:block">Wed My Pet</h1>
        </div>

        {/* Center - Nav Links */}

        <ul className="hidden xl:flex gap-6 text-black font-semibold">
          {["Home", "Shop", "About Us", "Contact Us", "Services"].map(
            (item, index) => {
              return (
                <li
                  key={index}
                  className=" hover:scale-105 transition-all duration-300"
                >
                  <Link
                    key={item}
                    href={
                      item === "Home"
                        ? "/"
                        : `/${item
                            .split(" ") // Split into words
                            .map(
                              (word, index) =>
                                index === 0
                                  ? word.toLowerCase() // First word lowercase
                                  : word.charAt(0).toUpperCase() +
                                    word.slice(1).toLowerCase() // Capitalize following words
                            )
                            .join("")}`
                    }
                    onClick={() => {
                      setActiveTab(item);
                      setIsOpen(false);
                    }}
                    className={`  px-2 pb-1 ${
                      item === activeTab
                        ? " text-pink-600 border-b-2 font-semibold border-pink-600"
                        : "font-normal"
                    }`}
                  >
                    {item}
                  </Link>
                </li>
              );
            }
          )}
        </ul>

        {/* Right - Search and Icons */}
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search products..."
              className="px-3 py-1.5 rounded-full border bg-gray-300 border-none"
            />
            <div className=" absolute top-1 right-1.5 bg-black px-0.5 text-white rounded-full">
              <SearchIcon className=" cursor-pointer" />
            </div>
          </div>

          {/* for mobile search icon*/}
          <div className="md:hidden top-1 right-1.5 bg-black px-0.5 text-white rounded-full">
            <SearchIcon className=" cursor-pointer" />
          </div>

          <Badge
            badgeContent={4}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#ff4081", // custom badge background
                color: "#fff", // text color
                fontSize: "0.75rem", // smaller/larger text
                minWidth: "18px",
                height: "18px",
                padding: "0 6px",
              },
            }}
          >
            <FavoriteBorderIcon className=" cursor-pointer" />
          </Badge>
          <Badge
            badgeContent={`0`}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#ff4081", // custom badge background
                color: "#fff", // text color
                fontSize: "0.75rem", // smaller/larger text
                minWidth: "18px",
                height: "18px",
                padding: "0 6px",
              },
            }}
          >
            <ShoppingCartOutlinedIcon
              onClick={() => router.push("/cart")}
              className=" cursor-pointer"
            />
          </Badge>
          {/* <FaHeart className="text-black text-lg cursor-pointer" />
          <FaShoppingCart className="text-black text-lg cursor-pointer" /> */}
          <button
            className="xl:hidden text-black focus:outline-none ml-auto cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </nav>
      <div
        className={`fixed z-50 w-[70%] md:w-[50%] h-full bg-[#EEEEEE] top-0 right-0 rounded-l-2xl transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className=" flex justify-between p-4">
          <div className=" flex gap-4 justify-center items-center">
            <Image src="/images/logo.png" alt="logo" width={40} height={40} />

            <h1 className=" text-2xl font-bold">WED MY PET</h1>
          </div>

          <CloseIcon fontSize="large" onClick={() => setIsOpen(!isOpen)} />
        </div>
        <ul className=" flex flex-col justify-center items-center gap-4 px-2  text-black font-semibold">
          {["Home", "Shop", "About Us", "Contact Us", "Services"].map(
            (item, index) => {
              return (
                <li
                  key={index}
                  className={` w-full flex py-0.5 justify-center ${
                    item === activeTab
                      ? " text-white bg-[#ed115a] text-xl rounded-2xl font-semibold"
                      : "font-normal"
                  }`}
                >
                  <Link
                    key={item}
                    href={
                      item === "Home"
                        ? "/"
                        : `/${item
                            .split(" ") // Split into words
                            .map(
                              (word, index) =>
                                index === 0
                                  ? word.toLowerCase() // First word lowercase
                                  : word.charAt(0).toUpperCase() +
                                    word.slice(1).toLowerCase() // Capitalize following words
                            )
                            .join("")}`
                    }
                    onClick={() => {
                      setActiveTab(item);
                      setIsOpen(false);
                    }}
                    className=""
                  >
                    {item}
                  </Link>
                </li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
