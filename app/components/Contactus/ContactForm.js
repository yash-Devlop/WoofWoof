"use client";
import { ArrowForward } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";

export default function ContactForm() {
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferredTeam: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferredTeam: "",
    message: "",
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First Name is required.";
    if (!formData.lastName.trim())
      newErrors.lastName = "Last Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required.";
    } else if (formData.phone.length < 10) {
      newErrors.phone = "Phone Number must be at least 10 digits.";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    if (!formData.preferredTeam) {
      newErrors.preferredTeam = "Choose a preferred team";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // ✅ Returns `true` if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log(formData);

    try {
      setIsLoading(true);
      const response = await axios.post("/api/contact", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // ✅ Show success notification
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "We will get back to you shortly.",
          confirmButtonColor: "#22c55e",
        });

        // ✅ Reset form data after successful submission
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          preferredTeam: "",
          message: "",
        });
        setIsLoading(false);
        setErrors({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          preferredTeam: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);

      // ❌ Show error notification
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to send message. Please try again later.",
        confirmButtonColor: "#ef4444",
      });

      setIsLoading(false);
    }
  };

  return (
    <div className="py-10 px-6 xl:mx-16 lg:py-none xl:px-10 bg-[#F8F9FA] rounded-3xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-md font-semibold text-black mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              className=" border-none bg-white w-full placeholder-gray-600 placeholder:font-normal border-gray-700 rounded-lg px-4 py-2 focus:outline-none placeholder:tracking-wider"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="LasttName"
              className="block text-md font-semibold text-black mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              className=" border-none bg-white w-full placeholder-gray-600 placeholder:font-normal border-gray-700 rounded-lg px-4 py-2 focus:outline-none placeholder:tracking-wider"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label
              htmlFor="Email Address"
              className="block text-md font-semibold text-black mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="Email Address"
              className=" border-none bg-white w-full placeholder-gray-600 placeholder:font-normal border-gray-700 rounded-lg px-4 py-2 focus:outline-none placeholder:tracking-wider"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          {/* <div>
            <input
              type="tel"
              placeholder="Phone Number"
              className="bg-transparent border placeholder-white placeholder:font-light w-full border-gray-700 rounded-xl p-3 focus:outline-none focus:border-green-500 transition focus:ring-2 focus:ring-green-500"
              value={formData.phone}
              onChange={(e) => {
                const onlyNumbers = e.target.value.replace(/\D/g, ""); // Allow only numbers
                if (onlyNumbers.length <= 10) {
                  setFormData({ ...formData, phone: onlyNumbers });
                }
              }}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div> */}
        </div>
        <div className="relative w-full">
          {/* <select
            className="appearance-none bg-transparent border placeholder-white placeholder:font-light w-full border-gray-700 rounded-xl p-3 pr-10 focus:outline-none focus:border-green-500 transition focus:ring-2 focus:ring-green-500"
            value={formData.preferredTeam}
            onChange={(e) =>
              setFormData({
                ...formData,
                preferredTeam: e.target.value,
              })
            }
          >
            <option value="" disabled>
              Preferred Team For Assistance
            </option>
            <option className="text-gray-400" value="sales">
              Sales
            </option>
            <option className="text-gray-400" value="procurement">
              Procurement
            </option>
            <option className="text-gray-400" value="vendorOnboarding">
              Vendor Onboarding
            </option>
            <option className="text-gray-400" value="ipOnboarding">
              Installation Partner Onboarding
            </option>
            <option className="text-gray-400" value="afterSales">
              After Sales
            </option>
            <option className="text-gray-400" value="hiring">
              Hiring
            </option>
            <option className="text-gray-400" value="affilationPartnership">
              Affiliation and Partnership
            </option>
            <option className="text-gray-400" value="other">
              Other
            </option>
          </select> */}

          {/* Custom dropdown arrow */}
          {/* <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div> */}
        </div>

        <div>
          <label
            htmlFor="Message"
            className="block text-md font-semibold text-black mb-1"
          >
            Message
          </label>
          <textarea
            placeholder="Write Message"
            rows={4}
            className=" border-none bg-white w-full placeholder-gray-600 placeholder:font-normal border-gray-700 rounded-lg px-4 py-2 focus:outline-none placeholder:tracking-wider"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message}</p>
          )}
        </div>
        <button
          type="submit"
          className=" relative bg-[#F91F54] text-white py-3 px-8 rounded-full hover:scale-105  transition-all duration-500 flex items-center justify-center group shadow-md cursor-pointer"
          disabled={isLoading}
        >
          <span className="text-lg font-normal tracking-wider">
            {isLoading ? "Sending..." : "Send Message"}
          </span>
          <ArrowForward className="pt-1 w-5 h-5 duration-500" />
          {isLoading && (
            <CircularProgress
              size={30}
              color="success"
              className="absolute top-2.5 right-3.5"
            />
          )}
        </button>
      </form>
    </div>
  );
}
