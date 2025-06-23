"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { registerUser, resetAuthState } from "@/store/slices/authSlice";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";

const RegisterPage = ({ email }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error, role } = useSelector((state) => state.auth);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateForm = () => {
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Password and Confirm-Password should be same.");

      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const result = await dispatch(
        registerUser({
          email,
          password,
          confirmPassword,
        })
      );

      if (registerUser.fulfilled.match(result)) {
        toast.success("Registered successfully! Please login.");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
        // dispatch(resetAuthState());
      } else {
        const errorMsg = result?.payload || "Registration failed.";
        toast.error(errorMsg);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again."); // ✅
    }
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
            <div
              onClick={() => {
                dispatch(resetAuthState());
                router.back();
              }}
              className=" cursor-pointer mb-2"
            >
              <ArrowBackIcon fontSize="large" sx={{}} />
            </div>
            <div className=" flex items-center justify-center">
              <div className="w-full">
                <h2 className="text-3xl font-black mb-6">Set Password</h2>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div className="flex items-center border-2 border-gray-300 rounded px-3 py-2">
                    <input
                      type="text"
                      name="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full outline-none"
                    />

                    <svg
                      width="28"
                      height="30"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16 5.5C16 8.53757 13.5376 11 10.5 11H7V13H5V15L4 16H0V12L5.16351 6.83649C5.0567 6.40863 5 5.96094 5 5.5C5 2.46243 7.46243 0 10.5 0C13.5376 0 16 2.46243 16 5.5ZM13 4C13 4.55228 12.5523 5 12 5C11.4477 5 11 4.55228 11 4C11 3.44772 11.4477 3 12 3C12.5523 3 13 3.44772 13 4Z"
                        fill="#5F6368"
                        fillOpacity="0.63"
                      />
                    </svg>
                  </div>

                  <div className="flex items-center border-2 border-gray-300 rounded px-3 py-2">
                    <input
                      type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target?.value)}
                      placeholder="Confirm Password"
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

                <div className="flex flex-col md:flex-row justify-center gap-4 text-sm mt-4">
                  <div className="text-center text-sm mt-2 md:mt-0">
                    Already have an account?{" "}
                    <a
                      href="/login"
                      className="text-blue-500 font-semibold hover:underline"
                    >
                      Sign In
                    </a>
                  </div>
                </div>

                {/* Sign In link */}

                {/* Create Account Button */}
                <div className=" flex justify-center">
                  <button
                    onClick={handleSubmit}
                    className=" mt-6 bg-[#F91F54] text-white font-semibold py-2 px-4 flex justify-center items-center gap-4 rounded hover:scale-105 duration-500 transition cursor-pointer"
                  >
                    <span>Confirm Password</span>

                    {loading && (
                      <span className="">
                        <CircularProgress size="15px" />
                      </span>
                    )}
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

export default RegisterPage;
