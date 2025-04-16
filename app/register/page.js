"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form Data :", formData);
    // You can send this to backend later
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center px-4 justify-center z-50">
      <div className=" relative">
        <Image
          src="/images/bone1.png"
          alt="bone"
          width={150}
          height={150}
          className="hidden md:block absolute z-50 bottom-2 lg:left-[40%] md:left-[38%]"
        />
        <div className="relative grid grid-cols-1 md:grid-cols-2">
          <div>
            <Image
              src="/images/login4.png"
              alt="login"
              width={400}
              height={300}
              className=" hidden md:block xl:h-[85vh] w-full rounded-xl  "
            />
          </div>
          <div className=" bg-white text-black rounded-xl relative md:right-4 p-12">
            <div onClick={() => router.back()} className=" cursor-pointer mb-2">
              <ArrowBackIcon fontSize="large" sx={{}} />
            </div>
            <div className=" flex items-center justify-center">
              <div className="w-full">
                <h2 className="text-3xl font-black mb-6">Create Account</h2>

                {/* Social Sign-ins */}
                <div className="flex justify-between gap-4 mb-4">
                  <button className=" flex items-center gap-2 border-2 border-gray-300 rounded-md py-2 hover:bg-gray-100 transition cursor-pointer px-2 lg:px-8">
                    <Image
                      src="/images/google.png"
                      alt=" google logo"
                      width={20}
                      height={20}
                    />
                    <span className="text-sm font-medium">Sign in Google</span>
                  </button>
                  <button className="px-2 flex items-center justify-center gap-2 border-2 border-gray-300 rounded-md py-2 hover:bg-gray-100 transition cursor-pointer lg:px-8">
                    <Image
                      src="/images/facebook.png"
                      alt=" google logo"
                      width={20}
                      height={20}
                    />
                    <span className="text-sm font-medium">
                      Sign in Facebook
                    </span>
                  </button>
                </div>

                {/* Divider */}
                <div className="text-center text-sm text-gray-400 my-4">
                  — OR —
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div className="flex items-center border-2 border-gray-300 rounded px-3 py-2">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="w-full outline-none"
                    />

                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 70 72"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M55.4168 12.3333H14.5835C12.2629 12.3333 10.0373 13.2684 8.39631 14.9328C6.75537 16.5972 5.8335 18.8545 5.8335 21.2083V50.7917C5.8335 53.1455 6.75537 55.4029 8.39631 57.0672C10.0373 58.7316 12.2629 59.6667 14.5835 59.6667H55.4168C57.7375 59.6667 59.9631 58.7316 61.604 57.0672C63.245 55.4029 64.1668 53.1455 64.1668 50.7917V21.2083C64.1668 18.8545 63.245 16.5972 61.604 14.9328C59.9631 13.2684 57.7375 12.3333 55.4168 12.3333ZM53.4627 18.25L35.0002 32.3021L16.5377 18.25H53.4627ZM55.4168 53.75H14.5835C13.8099 53.75 13.0681 53.4383 12.5211 52.8835C11.9741 52.3287 11.6668 51.5763 11.6668 50.7917V21.9479L33.2502 38.3667C33.755 38.7507 34.3691 38.9583 35.0002 38.9583C35.6312 38.9583 36.2453 38.7507 36.7502 38.3667L58.3335 21.9479V50.7917C58.3335 51.5763 58.0262 52.3287 57.4792 52.8835C56.9322 53.4383 56.1904 53.75 55.4168 53.75Z"
                        fill="#5F6368"
                        fillOpacity="0.57"
                      />
                    </svg>
                  </div>
                  <div className="flex items-center border-2 border-gray-300 rounded px-3 py-2">
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Username"
                      className="w-full outline-none"
                    />

                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 70 71"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.125 61.75C13.125 61.75 8.75 61.75 8.75 57.375C8.75 53 13.125 39.875 35 39.875C56.875 39.875 61.25 53 61.25 57.375C61.25 61.75 56.875 61.75 56.875 61.75H13.125ZM35 35.5C38.481 35.5 41.8194 34.1172 44.2808 31.6558C46.7422 29.1944 48.125 25.856 48.125 22.375C48.125 18.894 46.7422 15.5556 44.2808 13.0942C41.8194 10.6328 38.481 9.25 35 9.25C31.519 9.25 28.1806 10.6328 25.7192 13.0942C23.2578 15.5556 21.875 18.894 21.875 22.375C21.875 25.856 23.2578 29.1944 25.7192 31.6558C28.1806 34.1172 31.519 35.5 35 35.5Z"
                        fill="#5F6368"
                        fillOpacity="0.63"
                      />
                    </svg>
                  </div>
                  <div className="flex items-center border-2 border-gray-300 rounded px-3 py-2">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      className="w-full outline-none"
                    />

                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 70 71"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M56.875 32.2188H52.2266V16.9062C52.2266 12.0732 48.3096 8.15625 43.4766 8.15625H26.5234C21.6904 8.15625 17.7734 12.0732 17.7734 16.9062V32.2188H13.125C11.915 32.2188 10.9375 33.1963 10.9375 34.4062V60.6562C10.9375 61.8662 11.915 62.8438 13.125 62.8438H56.875C58.085 62.8438 59.0625 61.8662 59.0625 60.6562V34.4062C59.0625 33.1963 58.085 32.2188 56.875 32.2188ZM36.9141 48.4199V52.043C36.9141 52.3438 36.668 52.5898 36.3672 52.5898H33.6328C33.332 52.5898 33.0859 52.3438 33.0859 52.043V48.4199C32.5217 48.0148 32.1005 47.4411 31.883 46.7813C31.6656 46.1216 31.6631 45.4098 31.8758 44.7486C32.0886 44.0873 32.5058 43.5106 33.0672 43.1015C33.6286 42.6924 34.3053 42.472 35 42.472C35.6947 42.472 36.3714 42.6924 36.9328 43.1015C37.4942 43.5106 37.9114 44.0873 38.1242 44.7486C38.337 45.4098 38.3344 46.1216 38.117 46.7813C37.8995 47.4411 37.4783 48.0148 36.9141 48.4199ZM47.3047 32.2188H22.6953V16.9062C22.6953 14.7939 24.4111 13.0781 26.5234 13.0781H43.4766C45.5889 13.0781 47.3047 14.7939 47.3047 16.9062V32.2188Z"
                        fill="#5F6368"
                        fillOpacity="0.67"
                      />
                    </svg>
                  </div>
                </div>

                {/* Terms Checkbox & Link */}
                <div className="flex flex-col md:flex-row  justify-between gap-4 text-sm mt-4">
                  <label className=" flex  items-start">
                    <input type="checkbox" className="mr-2 cursor-pointer" />
                    <span className=" md:max-w-[200px] text-[10px]">
                      I confirm that I have read and accept the terms and
                      conditions and privacy policy.
                    </span>
                  </label>
                  <div className=" text-center text-sm">
                    Already have account?{" "}
                    <a href="#" className="text-blue-500 font-semibold">
                      Sign in.
                    </a>
                  </div>
                </div>

                {/* Sign In link */}

                {/* Create Account Button */}
                <div className=" flex justify-center">
                  <button
                    onClick={handleSubmit}
                    className=" mt-6 bg-[#F91F54] text-white font-semibold py-2 px-8 rounded hover:scale-105 duration-500 transition cursor-pointer"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
