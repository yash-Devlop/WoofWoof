"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser, resetAuthState } from "../authSlice";

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Parse cookies safely
    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
      const [name, ...rest] = cookie.split("=");
      acc[name.trim()] = rest.join("=");
      return acc;
    }, {});

    const token = cookies["auth-token"];

    if (token) {
      dispatch(loginUser());
    } else {
      // Not logged in
      dispatch(resetAuthState());
    }
  }, [dispatch]);

  return null;
}
