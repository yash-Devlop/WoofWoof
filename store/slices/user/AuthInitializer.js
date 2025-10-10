"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../authSlice";
import { resetAuthState } from "../authSlice";

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check auth-token cookie
    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
      const [name, value] = cookie.split("=");
      acc[name] = value;
      return acc;
    }, {});

    const token = cookies["auth-token"];

    // Check localStorage for user
    const storedUser = localStorage.getItem("WMPuser");
    let user = null;
    if (storedUser) {
      try {
        user = JSON.parse(storedUser);
      } catch (e) {
        user = null;
      }
    }

    if (token && user) {
      // User is logged in, update Redux manually
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
