"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp, resetAuthState } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Image from "next/image";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";

export default function VerifyOtp({ email }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error("Please enter valid 6-digit OTP.");
      return;
    }
    try {
      const res = await dispatch(verifyOtp({ email, otp }));
      if (verifyOtp.fulfilled.match(res)) {
        toast.success("OTP verified successfully");
      } else {
        toast.error(res?.payload || "Failed to verify OTP."); // Optional: show error message if any
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
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
                <h2 className="text-3xl font-black mb-6">Verify OTP</h2>
                <h4 className=" mb-2">
                  Otp is sent at{" "}
                  <span className="  text-blue-600">{email}</span>{" "}
                </h4>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div className="flex items-center border-2 border-gray-300 rounded px-3 py-2">
                    <input
                      type="text"
                      name="email"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                      className="w-full outline-none"
                      maxLength={6}
                    />

                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 64 64"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="16"
                        y="28"
                        width="32"
                        height="28"
                        rx="4"
                        stroke="#5F6368"
                        strokeOpacity="0.8"
                        strokeWidth="5"
                        fill="none"
                      />
                      <path
                        d="M24 28V20C24 15.5817 27.5817 12 32 12C36.4183 12 40 15.5817 40 20V28"
                        stroke="#5F6368"
                        strokeOpacity="0.8"
                        strokeWidth="5"
                        fill="none"
                      />
                      <circle
                        cx="32"
                        cy="42"
                        r="5"
                        fill="#5F6368"
                        fillOpacity="0.8"
                      />
                    </svg>
                  </div>

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
                      className=" mt-2 bg-[#F91F54] text-white font-semibold py-2 flex justify-center items-center gap-4 px-4 rounded hover:scale-105 duration-500 transition cursor-pointer"
                    >
                      <span>Verify OTP</span>
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
    </div>
  );
}
