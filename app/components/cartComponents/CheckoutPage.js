"use client";
import Image from "next/image";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserAddress,
  fetchUserAddresses,
} from "@/store/slices/user/addressSlice";
import toast from "react-hot-toast";

const CheckoutPage = ({ onNext, onBack, setGuestAddress }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserAddresses());
    }
  }, [dispatch, isAuthenticated]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "", // ✅ Added email field
    address: "",
    state: "",
    pincode: "",
    city: "",
    contact: "",
  });

  const addresses = useSelector((state) => state.address.addresses);

  useEffect(() => {
    if (!Array.isArray(addresses) || addresses.length === 0) return;
    const defaultAddress = addresses.find((addr) => addr.isDefault === true);
    if (defaultAddress) {
      setFormData({
        firstName: defaultAddress.firstName || "",
        lastName: defaultAddress.lastName || "",
        email: defaultAddress.email || "", // ✅ Load email if saved
        address: defaultAddress.address || "",
        city: defaultAddress.city || "",
        state: defaultAddress.state || "",
        pincode: defaultAddress.pincode || "",
        contact: defaultAddress.contact || "",
      });
    }
  }, [addresses]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict input for specific fields
    if (name === "pincode") {
      if (!/^\d{0,6}$/.test(value)) return;
    }

    if (name === "contact") {
      if (!/^\d{0,10}$/.test(value)) return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveAndContinue = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, address, state, pincode, city, contact } = formData;

    // ✅ Validation
    if (!firstName || !lastName || !address || !state || !pincode || !city || !contact) {
      toast.error("Please fill in all fields.");
      return;
    }

    // ✅ Email validation for guest users
    if (!isAuthenticated && !email) {
      toast.error("Please enter your email address.");
      return;
    }

    if (!isAuthenticated && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!/^\d{6}$/.test(pincode)) {
      toast.error("Please enter a valid 6-digit pincode.");
      return;
    }

    if (!/^\d{10}$/.test(contact)) {
      toast.error("Please enter a valid 10-digit contact number.");
      return;
    }

    // ✅ Guest user logic - include email
    // if (!isAuthenticated) {
      setGuestAddress({
        ...formData,
        phone: contact, // ✅ Also map contact to phone for consistency
      });
      onNext();
      return;
    // }

    // ✅ Authenticated user logic
    const existingDefault = Array.isArray(addresses)
      ? addresses.find((addr) => addr?.isDefault)
      : null;

    const isSame =
      existingDefault &&
      existingDefault.firstName === firstName &&
      existingDefault.lastName === lastName &&
      existingDefault.address === address &&
      existingDefault.city === city &&
      existingDefault.state === state &&
      existingDefault.pincode === pincode &&
      existingDefault.contact === contact;

    if (isSame) {
      onNext();
      return;
    }

    // Add or update address via API
    dispatch(addUserAddress(formData)).then((res) => {
      if (!res.error) {
        onNext();
      }
    });
  };

  return (
    <div>
      {/* Address Form */}
      <div className="bg-white px-4 py-10 md:px-10 lg:px-20 flex items-center justify-center">
        <div className="w-full max-w-7xl bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row lg:gap-6">
          {/* Left: Form */}
          <div className="w-full md:w-1/2 p-6 lg:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">CHECKOUT</h2>

            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Delivery Address
            </h3>

            <form className="space-y-4" onSubmit={handleSaveAndContinue}>
              <div className="flex gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>

              {/* ✅ Email Field - Show for all users, but only required for guests */}
              {!isAuthenticated && (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              )}

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Contact Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />

              {/* Buttons */}
              <div className="flex items-center justify-between pt-6">
                <button
                  type="button"
                  onClick={onBack}
                  className="text-lg text-gray-600 flex items-center gap-1 hover:text-pink-600 cursor-pointer"
                >
                  <ArrowBackIosIcon fontSize="small" />
                  Go back to cart
                </button>
                <button
                  type="submit"
                  className="bg-[#F91F54] gap-4 flex justify-center items-center px-1.5 pl-4 py-1 group scale-95 hover:scale-100 transition-all duration-300 text-white font-medium text-sm lg:text-lg rounded-full uppercase cursor-pointer"
                >
                  Save & Continue
                  <span>
                    <Image
                      src="/images/logo2.png"
                      width={33}
                      height={33}
                      alt="logo"
                      className="transition-all duration-300"
                    />
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* Right: Image */}
          <div className="w-full md:w-1/2 lg:p-6 flex items-center justify-center">
            <Image
              src="/images/thanksShopping1.jpg"
              width={500}
              height={500}
              alt="Thanks for shopping"
              className="rounded-2xl object-cover w-full h-auto max-h-[500px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;