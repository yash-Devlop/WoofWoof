"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, resetAuthState } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Image from "next/image";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import SettingsIcon from "@mui/icons-material/Settings";

export default function SendOtp({ formData, setFormData }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((state) => state.auth);
  const [isSignUp, setIsSignUp] = useState(false);

  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { email, username, phoneNumber } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !username || !phoneNumber) {
      toast.error("Please fill all the fields."); // ✅
      return false;
    }

    if (!emailRegex.test(email.trim())) {
      toast.error("Please enter a valid email address."); // ✅
      return false;
    }

    if (username.trim().length < 3) {
      toast.error("Username must be at least 3 characters."); // ✅
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(phoneNumber)) {
      toast.error("Please enter valid 10-digit phone number."); // ✅
      return false;
    }

    if (!termsAccepted) {
      toast.error("You must accept the terms and conditions."); // ✅
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const { email, username, phoneNumber } = formData;
      const res = await dispatch(sendOtp({ email, username, phoneNumber }));
      if (sendOtp.fulfilled.match(res)) {
        toast.success("OTP sent successfully");
      } else {
        toast.error(res?.payload || "Failed to send OTP."); // Optional: show error message if any
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    router.push("/login");
  };

  return (
    <div className=" h-screen flex items-center px-4 justify-center z-50">
      <div className=" absolute inset-0 ">
        <Image
          src="/images/loginBg.jpg"
          alt="Loging Background"
          fill
          className=" object-cover "
        />
      </div>
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
              src="/images/login6.png"
              alt="login"
              width={400}
              height={300}
              className=" hidden md:block xl:h-[85vh] w-full rounded-xl  "
            />
          </div>
          <div className=" bg-white text-black rounded-xl relative md:right-4 p-6 md:px-12 md:py-8 shadow-2xl">
            <div
              onClick={() => {
                dispatch(resetAuthState());
                router.push("/");
              }}
              className=" cursor-pointer gap-2 flex items-center mb-2"
            >
              <ArrowBackIcon fontSize="large" sx={{}} />
              <span className=" text-2xl font-bold ">Back to home</span>
            </div>
            <div className=" flex items-center justify-center">
              <div className="flex flex-col justify-center"></div>
              <div className="w-full">
                <div className="flex items-center justify-center space-x-8 mb-4">
                  <h1
                    className={`text-4xl font-bold cursor-pointer transition-colors ${
                      !isSignUp ? "text-black" : "text-gray-400"
                    }`}
                    onClick={() => setIsSignUp(false)}
                  >
                    Sign Up
                  </h1>

                  <h1
                    className={`text-4xl font-bold cursor-pointer transition-colors ${
                      isSignUp ? "text-black" : "text-gray-400"
                    }`}
                    onClick={() => {
                      setIsSignUp(true);
                      router.push("/login");
                    }}
                  >
                    Log In
                  </h1>
                </div>
                <div className=" flex justify-center items-center mb-4">
                  <div
                    className="relative w-30 h-10 bg-black rounded-full cursor-pointer transition-all duration-300 ease-in-out"
                    onClick={handleToggle}
                  >
                    <div
                      className={`absolute top-1 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center transition-transform duration-300 ease-in-out ${
                        isSignUp ? "translate-x-21" : "translate-x-1"
                      }`}
                    >
                      <Image
                        src="/images/loginLogo.png"
                        alt="logoSwitch"
                        width={12}
                        height={12}
                        className="w-8 h-8 text-white"
                      />
                    </div>
                  </div>
                </div>
                {/* <h2 className="text-3xl font-black mb-6">Create Account</h2> */}

                {/* Social Sign-ins */}
                {/* <div className="flex justify-between gap-4 mb-4">
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
                </div> */}

                {/* Divider */}
                {/* <div className="text-center text-sm text-gray-400 my-4">
                  — OR —
                </div> */}

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
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="w-full outline-none"
                      maxLength="10"
                    />

                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 70 71"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M51.85 46.75C49.15 46.75 46.6 46.2625 44.275 45.35C43.05 44.875 41.675 45.2625 40.775 46.1625L37.1 49.8375C31.05 46.5875 24.9125 40.45 21.6625 34.4L25.3375 30.725C26.2375 29.825 26.625 28.45 26.15 27.225C25.2375 24.9 24.75 22.35 24.75 19.65C24.75 18.325 23.675 17.25 22.35 17.25H14.875C13.55 17.25 12.25 18.1625 12.25 19.4875C12.25 40.9875 30.0125 58.75 51.5125 58.75C52.8375 58.75 53.75 57.45 53.75 56.125V48.65C53.75 47.325 52.675 46.25 51.35 46.25C51.5167 46.25 51.6833 46.25 51.85 46.75Z"
                        fill="#5F6368"
                        fillOpacity="0.8"
                      />
                    </svg>
                  </div>
                </div>

                {/* Terms Checkbox & Link */}

                <div className="flex flex-col md:flex-row justify-between gap-4 text-sm mt-4">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-2 cursor-pointer accent-pink-500" // accent color
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                    />
                    <span className="text-xs md:max-w-[250px]">
                      I agree to the{" "}
                      <a
                        href="/terms-and-conditions"
                        className="text-blue-500 underline hover:text-blue-700"
                        target="_blank"
                      >
                        Terms & Conditions
                      </a>{" "}
                      and{" "}
                      <a
                        href="/terms-and-conditions"
                        className="text-blue-500 underline hover:text-blue-700"
                        target="_blank"
                      >
                        Privacy Policy
                      </a>
                      .
                    </span>
                  </label>

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
                <div className=" flex justify-center ">
                  <button
                    onClick={handleSubmit}
                    className=" mt-6 bg-[#F91F54] text-white flex justify-between items-center gap-4 font-semibold py-2 px-4 rounded hover:scale-105 duration-500 transition cursor-pointer"
                  >
                    <span>Create Account</span>

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
}
