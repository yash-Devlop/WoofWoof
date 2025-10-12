"use client";
import Image from "next/image";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import MiscellaneousServicesOutlinedIcon from "@mui/icons-material/MiscellaneousServicesOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/slices/authSlice";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogin = () => {
    router.push("/login")
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/")
  };

  const menuItems = [
    {
      label: "Home",
      icon: <HomeOutlinedIcon fontSize="small" />,
      href: "/",
    },
    {
      label: "Shop",
      icon: <LocalGroceryStoreOutlinedIcon fontSize="small" />,
      href: "/shop",
    },
    {
      label: "Services",
      icon: <MiscellaneousServicesOutlinedIcon fontSize="small" />,
      href: "/services",
    },
    {
      label: "Philanthrophy",
      icon: <VolunteerActivismOutlinedIcon fontSize="small" />,
      href: "/philanthrophy",
    },
    {
      label: "About Us",
      icon: <DescriptionOutlinedIcon fontSize="small" />,
      href: "/aboutUs",
    },
    {
      label: "Contact Us",
      icon: <ForwardToInboxOutlinedIcon fontSize="small" />,
      href: "/contactUs",
    },
    {
      label: "Wishlist",
      icon: <FavoriteBorderOutlinedIcon fontSize="small" />,
      href: "/wishlist",
    },
    {
      label: "Cart",
      icon: <LocalMallOutlinedIcon fontSize="small" />,
      href: "/cart",
    },
  ];

  const suggestions = ["Dog Toys", "Pet Accessories", "Birthday Gifts"];
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentWord = suggestions[wordIndex];
    if (charIndex < currentWord.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentWord[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 120);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedText("");
        setCharIndex(0);
        setWordIndex((prev) => (prev + 1) % suggestions.length);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, wordIndex]);

  useEffect(() => {
    let page =
      pathname === "/"
        ? "Home"
        : pathname
          .replace(/^\//, "")
          .split(/(?=[A-Z])/)
          .map((word, index) =>
            index === 0
              ? word.toLowerCase()
              : word.charAt(0).toUpperCase() + word.slice(1)
          )[0]
          .split("/")[0];

    const tabMap = {
      shop: "Shop",
      about: "About Us",
      products: "Products",
      philanthrophy: "Philanthrophy",
      services: "Services",
      contact: "Contact Us",
    };

    setActiveTab(tabMap[page] || "Home");
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 5) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
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
        className={`fixed z-50 w-[90%] gap-4 sm:gap-10 md:gap-28 ${showNavbar
          ? `${lastScrollY > 44 ? "top-2" : "top-8 md:top-11"} translate-y-0`
          : "-translate-y-full"
          } md:gap-[8rem] xl:gap-[10rem] transition-all duration-300 flex items-center justify-between px-3 sm:px-4 py-2 md:px-6 bg-white shadow-lg rounded-full`}
      >
        {/* Left - Logo */}
        <div className="flex items-center lg:gap-6 flex-shrink-0">
          <Image
            onClick={() => router.push("/")}
            src="/images/woof.png"
            alt="logo"
            width={120}
            height={36}
            className="h-7 w-auto sm:h-8 md:h-10 lg:h-12 object-contain cursor-pointer"
            priority
          />
        </div>

        {/* Center - Nav Links */}
        <ul className="hidden xl:flex gap-6 text-black font-semibold">
          {["Home", "Shop", "About Us", "Philanthrophy", "Contact Us", "Services"].map(
            (item, index) => {
              return (
                <li
                  key={index}
                  className="hover:scale-105 transition-all duration-300"
                >
                  <Link
                    key={item}
                    href={
                      item === "Home"
                        ? "/"
                        : `/${item
                          .split(" ")
                          .map(
                            (word, index) =>
                              index === 0
                                ? word.toLowerCase()
                                : word.charAt(0).toUpperCase() +
                                word.slice(1).toLowerCase()
                          )
                          .join("")}`
                    }
                    onClick={() => {
                      setActiveTab(item);
                      setIsOpen(false);
                    }}
                    className={`px-2 pb-1 ${item === activeTab
                      ? "text-pink-600 border-b-2 font-semibold border-pink-600"
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
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder={displayedText}
              className="px-3 py-1.5 rounded-full border bg-gray-300 border-none"
            />
            <div className="absolute top-1 right-1 bg-[#ff3971e5] py-0.5 px-0.75 text-white rounded-full">
              <SearchIcon className="cursor-pointer" />
            </div>
          </div>

          {/* Mobile Search Icon */}
          <div className="relative md:hidden">
            <SearchIcon
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="bg-[#ff3971e5] p-1 text-white rounded-full cursor-pointer z-40 relative"
            />

            <input
              type="text"
              autoFocus
              placeholder="Search products..."
              onBlur={() => setMobileSearchOpen(false)}
              className={`absolute top-[0.75px] -right-[1px] h-6.5 transform transition-all duration-300 ease-in-out px-4 pr-10 rounded-full border bg-gray-100 shadow-md text-sm ${mobileSearchOpen
                ? "translate-x-0 opacity-100 w-[140px]"
                : "translate-x-0 opacity-0 w-0"
                }`}
            />
          </div>

          <button
            className="xl:hidden text-black focus:outline-none ml-auto cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7"
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

      {/* Sidebar */}
      <div
        className={`fixed z-50 w-[70%] md:w-[50%] h-full bg-white top-0 right-0 rounded-l-2xl transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex mt-3.5 justify-between p-4">
          <div className="flex gap-4 justify-center items-center">
            <Image 
              src="/images/woof.png" 
              alt="logo" 
              width={80} 
              height={32}
              className="h-8 w-auto object-contain"
            />
          </div>

          <CloseIcon fontSize="large" onClick={() => setIsOpen(!isOpen)} />
        </div>

        <div className="relative h-[400px] mt-10">
          <div className="absolute inset-0 flex justify-end right-0">
            <div className="absolute inset-0 border-b mx-8 border-gray-500 top-[360px]"></div>
          </div>

          <ul className="relative flex flex-col justify-center items-center gap-4 px-4 pb-8 space-y-1 text-black font-semibold">
            {menuItems.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`w-full flex py-0.5 justify-start items-center mx-8 pr-4 ${item.label === activeTab
                    ? "text-black border-2 border-[#FE0050] text-xl rounded-lg font-semibold"
                    : "font-medium"
                    }`}
                >
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => {
                      setActiveTab(item.label);
                      setIsOpen(false);
                    }}
                    className="px-4"
                  >
                    <div className="flex text-xl justify-center items-center gap-4">
                      <div>{item.icon}</div>
                      <span>{item.label}</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mx-4 mt-8 space-y-2 px-4">
          {isAuthenticated ? (
            <button onClick={handleLogout}>
              <div className="flex items-center gap-4 text-[#FE0050]">
                <div>
                  <DeleteOutlineOutlinedIcon />
                </div>
                <span className="font-medium text-xl">Logout</span>
              </div>
            </button>
          ) : (
            <button onClick={handleLogin}>
              <div className="flex items-center gap-4 text-[#FE0050]">
                <div>
                  <PersonOutlineOutlinedIcon />
                </div>
                <span className="font-medium text-xl">Login</span>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;