"use client";

import ProtectedRoute from "@/app/components/AdminPortal/ProtectedRoute";
import React from "react";


const Page = () => {
  return (
    <ProtectedRoute>
      <div>Admin Dashboard</div>
    </ProtectedRoute>
  );
};

export default Page;
