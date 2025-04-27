"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/check-auth");
        const data = await res.json();

        if (data.user.role !== "admin") {
          router.replace("/adminPortal");
        } else {
          setAuthChecked(true);
        }
      } catch (error) {
        router.replace("/adminPortal");
      }
    };

    checkAuth();
  }, [router]);

  if (!authChecked) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
