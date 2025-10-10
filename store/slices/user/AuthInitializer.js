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

    // Check localStorage
    let user = null;
    const storedUser = localStorage.getItem("WMPuser");
    if (storedUser) {
      try {
        user = JSON.parse(storedUser);
      } catch (e) {
        user = null;
      }
    }

    if (token && user) {
      // Logged in
      dispatch({
        type: loginUser.fulfilled.type,
        payload: user,
      });
    } else {
      // Not logged in
      dispatch(resetAuthState());
      localStorage.removeItem("WMPuser");
    }
  }, [dispatch]);

  return null;
}
