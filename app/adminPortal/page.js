"use client";

import Image from "next/image";
import { useRouter } from "next/navigation"; // ✅ added this
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Page = () => {
  const router = useRouter(); // ✅ initialized here

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (!email || !password) {
        setError("All fields are required.");
        toast.error(error);
        return;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        setError("Please enter a valid email address.");
        toast.error(error);
        return;
      }

      const res = await axios.post(
        "/api/auth/login",
        { email, password },
        {
          withCredentials: true,
        }
      );

      if (res.status !== 200) {
        toast.error("Something went wrong!!");
        return;
      }

      if (res?.data?.user?.role === "admin") {
        router.push("/admin"); // ✅ better redirect to dashboard, not login page
        toast.success("Loging successfull");
      } else {
        toast.success("You are unauthorized to access this page");
        router.push("/"); // if you have a normal user dashboard
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      setError("Login failed. Please try again.");
      toast.error("You are unauthorized to access this page");
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center bg-cover bg-center">
      <Image
        src="/images/Group1.png"
        fill
        alt="bgimage"
        className="absolute object-cover"
      />
      <div className="bg-white relative bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Admin Portal Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-1 font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full border rounded p-2"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-semibold">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full border rounded p-2"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
