
"use client";
import React, { useState } from "react";
import RegisterPage from "./RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import SendOtp from "./SendOtp";
import VerifyOtp from "./VerifyOtp";

const Page = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    phoneNumber: "",
  });
  const dispatch = useDispatch();
  const { loading, error, otpVerified, otpSend } = useSelector(
    (state) => state.auth
  );
  return (
    <div>
      {!otpSend && <SendOtp formData={formData} setFormData={setFormData} />}
      {otpSend && !otpVerified && <VerifyOtp email={formData.email} />}
      {otpVerified && <RegisterPage email={formData.email} />}

      {/* <RegisterPage /> */}
    </div>
  );
};

export default Page;
