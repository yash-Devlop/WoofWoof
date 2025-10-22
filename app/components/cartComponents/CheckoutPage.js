"use client";
import Image from "next/image";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserAddress,
  fetchUserAddresses,
  editUserAddress,
} from "@/store/slices/user/addressSlice";
import toast from "react-hot-toast";
import { AddAddressModal, SelectAddressModal } from "../modals/AddressModal";

const CheckoutPage = ({ onNext, onBack, setGuestAddress }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.address.addresses);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [editingAddress, setEditingAddress] = useState(null);

  const [guestFormData, setGuestFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    state: "",
    pincode: "",
    city: "",
    contact: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserAddresses());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && Array.isArray(addresses) && addresses.length > 0) {
      const defaultIndex = addresses.findIndex((addr) => addr.isDefault === true);
      if (defaultIndex !== -1) {
        setSelectedAddressIndex(defaultIndex);
      } else {
        setSelectedAddressIndex(0);
      }
    }
  }, [addresses, isAuthenticated]);

  const handleGuestChange = (e) => {
    const { name, value } = e.target;

    if (name === "pincode") {
      if (!/^\d{0,6}$/.test(value)) return;
    }

    if (name === "contact") {
      if (!/^\d{0,10}$/.test(value)) return;
    }

    setGuestFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddAddress = (addressData) => {
    if (editingAddress !== null) {
      // Edit existing address
      dispatch(
        editUserAddress({
          addressId: editingAddress,
          updatedData: addressData,
        })
      ).then((res) => {
        if (!res.error) {
          setShowAddModal(false);
          setEditingAddress(null);
          toast.success("Address updated successfully!");
        }
      });
    } else {
      // Add new address
      dispatch(addUserAddress(addressData)).then((res) => {
        if (!res.error) {
          setShowAddModal(false);
          toast.success("Address added successfully!");
        }
      });
    }
  };

  const handleSelectAddress = (address, index) => {
    setSelectedAddressIndex(index);
    setShowSelectModal(false);
  };

  const handleEditSelectedAddress = () => {
    if (selectedAddressIndex !== null) {
      setEditingAddress(selectedAddressIndex);
      setShowAddModal(true);
    }
  };

  const handleGuestContinue = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, address, state, pincode, city, contact } =
      guestFormData;

    if (!firstName || !lastName || !address || !state || !pincode || !city || !contact) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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

    setGuestAddress({
      ...guestFormData,
      phone: contact,
    });
    onNext();
  };

  const handleAuthenticatedContinue = () => {
    if (selectedAddressIndex === null) {
      toast.error("Please select a delivery address.");
      return;
    }
    
    // ✅ FIXED: Pass the selected address to the payment page
    const selectedAddr = addresses[selectedAddressIndex];
    setGuestAddress({
      firstName: selectedAddr.firstName,
      lastName: selectedAddr.lastName,
      email: selectedAddr.email || "", // Will be fetched from user account in payment page
      address: selectedAddr.address,
      state: selectedAddr.state,
      pincode: selectedAddr.pincode,
      city: selectedAddr.city,
      contact: selectedAddr.contact,
      phone: selectedAddr.contact,
    });
    
    onNext();
  };

  const selectedAddress = selectedAddressIndex !== null ? addresses[selectedAddressIndex] : null;

  return (
    <div>
      {/* Address Modals */}
      <AddAddressModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingAddress(null);
        }}
        onSave={handleAddAddress}
        editData={editingAddress !== null ? addresses[editingAddress] : null}
      />

      <SelectAddressModal
        isOpen={showSelectModal}
        onClose={() => setShowSelectModal(false)}
        addresses={addresses}
        onSelect={handleSelectAddress}
        selectedAddressId={selectedAddressIndex}
      />

      {/* Main Checkout Section */}
      <div className="bg-white px-4 py-10 md:px-10 lg:px-20 flex items-center justify-center">
        <div className="w-full max-w-7xl bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row lg:gap-6">
          {/* Left: Form */}
          <div className="w-full md:w-1/2 p-6 lg:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">CHECKOUT</h2>

            {isAuthenticated ? (
              <>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Delivery Address
                </h3>

                {/* Show selected address or prompt to add */}
                {addresses.length === 0 ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4">
                    <p className="text-gray-600 mb-4">No saved addresses found</p>
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="bg-[#F91F54] text-white px-6 py-2 rounded-lg hover:bg-[#d20037] transition-colors flex items-center gap-2 mx-auto"
                    >
                      <AddIcon /> Add New Address
                    </button>
                  </div>
                ) : (
                  <>
                    {selectedAddress && (
                      <div className="border-2 border-pink-500 rounded-lg p-4 mb-4 bg-pink-50">
                        <div className="flex justify-between items-start mb-2">
                          <span className="px-2 py-1 bg-gray-100 text-xs font-semibold rounded">
                            {selectedAddress.label}
                          </span>
                          {selectedAddress.isDefault && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="font-semibold text-gray-900">
                          {selectedAddress.firstName} {selectedAddress.lastName}
                        </p>
                        <p className="text-gray-600 text-sm mt-1">
                          {selectedAddress.address}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {selectedAddress.city}, {selectedAddress.state} -{" "}
                          {selectedAddress.pincode}
                        </p>
                        <p className="text-gray-600 text-sm mt-1">
                          Contact: {selectedAddress.contact}
                        </p>
                      </div>
                    )}

                    <div className="flex gap-3 mb-6">
                      <button
                        onClick={() => setShowSelectModal(true)}
                        className="flex-1 border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:border-pink-500 transition-colors"
                      >
                        Change Address
                      </button>
                      <button
                        onClick={handleEditSelectedAddress}
                        className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-pink-500 transition-colors"
                      >
                        <EditIcon fontSize="small" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingAddress(null);
                          setShowAddModal(true);
                        }}
                        className="px-4 py-2 bg-[#F91F54] text-white rounded-lg hover:bg-[#d20037] transition-colors flex items-center gap-1"
                      >
                        <AddIcon fontSize="small" /> Add New
                      </button>
                    </div>
                  </>
                )}

                {/* Action Buttons */}
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
                    type="button"
                    onClick={handleAuthenticatedContinue}
                    disabled={addresses.length === 0}
                    className="bg-[#F91F54] gap-4 flex justify-center items-center px-1.5 pl-4 py-1 group scale-95 hover:scale-100 transition-all duration-300 text-white font-medium text-sm lg:text-lg rounded-full uppercase cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Continue
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
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Delivery Address
                </h3>

                <form className="space-y-4" onSubmit={handleGuestContinue}>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      name="firstName"
                      value={guestFormData.firstName}
                      onChange={handleGuestChange}
                      placeholder="First Name"
                      className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={guestFormData.lastName}
                      onChange={handleGuestChange}
                      placeholder="Last Name"
                      className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>

                  <input
                    type="email"
                    name="email"
                    value={guestFormData.email}
                    onChange={handleGuestChange}
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  />

                  <input
                    type="text"
                    name="address"
                    value={guestFormData.address}
                    onChange={handleGuestChange}
                    placeholder="Address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    value={guestFormData.state}
                    onChange={handleGuestChange}
                    placeholder="State"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  />
                  <div className="flex gap-4">
                    <input
                      type="text"
                      name="pincode"
                      value={guestFormData.pincode}
                      onChange={handleGuestChange}
                      placeholder="Pincode"
                      className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                    <input
                      type="text"
                      name="city"
                      value={guestFormData.city}
                      onChange={handleGuestChange}
                      placeholder="City"
                      className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    name="contact"
                    value={guestFormData.contact}
                    onChange={handleGuestChange}
                    placeholder="Contact Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  />

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
                          width={40}
                          height={40}
                          alt="logo"
                          className="transition-all duration-300"
                        />
                      </span>
                    </button>
                  </div>
                </form>
              </>
            )}
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