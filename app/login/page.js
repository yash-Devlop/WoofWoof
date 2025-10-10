"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { loginUser } from "@/store/slices/authSlice"; // adjust path
import toast from "react-hot-toast";
import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Page = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  const dispatch = useDispatch();
  const router = useRouter();

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      toast.error("Please fill in both email and password.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    const loadingToast = toast.loading("Logging in...");

    try {
      const resultAction = await dispatch(loginUser(formData));

      if (loginUser.fulfilled.match(resultAction)) {
        toast.success("Logged in successfully!");
        router.push("/");
      } else {
        toast.error(resultAction.payload || "Login failed.");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    router.push(isSignUp ? "/register" : "/login");
  };

  return (
    <div className="h-screen flex items-center px-4 justify-center">
      <div className="absolute inset-0">
        <Image
          src="/images/loginBg.jpg"
          alt="Login Background"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative">
        <div className="relative grid grid-cols-1 md:grid-cols-2">
          <div>
            <Image
              src="/images/login4.png"
              alt="login"
              width={400}
              height={300}
              className="hidden md:block xl:h-[85vh] w-full rounded-xl"
            />
          </div>

          <div className="bg-white text-black rounded-xl relative md:right-4 p-12">
            <div
              onClick={() => router.push("/")}
              className="cursor-pointer gap-2 flex items-center mb-2"
            >
              <ArrowBackIcon fontSize="large" />
              <span className="text-2xl font-bold">Back to home</span>
            </div>

            {/* Login / Sign Up toggle */}
            <div className="flex items-center justify-center space-x-8 mb-4">
              <h1
                className={`text-4xl font-bold cursor-pointer transition-colors ${
                  !isSignUp ? "text-black" : "text-gray-400"
                }`}
                onClick={() => {
                  setIsSignUp(false);
                  router.push("/register");
                }}
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

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="flex items-center border-2 border-gray-300 rounded px-3 py-2">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Email"
                  className="w-full outline-none"
                />
              </div>

              <div className="flex items-center border-2 border-gray-300 rounded px-3 py-2">
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Password"
                  className="w-full outline-none"
                />
              </div>
            </div>

            {/* Login Button */}
            <div className="flex justify-center">
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="mt-6 bg-[#F91F54] text-white font-semibold py-2 px-8 rounded hover:scale-105 duration-500 transition cursor-pointer"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
