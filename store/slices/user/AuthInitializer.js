"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetAuthState } from "../authSlice";

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/check-auth", {
          method: "GET",
          credentials: "include", // ✅ send cookies with request
          cache: "no-store", // avoid stale cached responses
        });

        if (!res.ok) {
          throw new Error("Unauthorized");
        }

        const data = await res.json();

        if (data.isAuthenticated) {
          // ✅ Dispatch to Redux store
          dispatch({
            type: "auth/setAuthenticated",
            payload: {
              isAuthenticated: true,
              user: data.user, // includes id, email, role
            },
          })
        } else {
          dispatch(resetAuthState());
          console.log("❌ Not authenticated");
        }
      } catch (error) {
        console.warn("Auth check failed:", error.message);
        dispatch(resetAuthState());
      }
    };

    checkAuth();
  }, [dispatch]);

  return null;
}
