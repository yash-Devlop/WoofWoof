"use client";

import React from "react";
import PeopleIcon from "@mui/icons-material/People";
import ArticleIcon from "@mui/icons-material/Article";
import CategoryIcon from "@mui/icons-material/Category";
import ImageIcon from "@mui/icons-material/Image";
import InventoryIcon from "@mui/icons-material/Inventory";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DashboardIcon from "@mui/icons-material/Dashboard";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";

const AdminLayoutComponent = ({ children }) => {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard", icon: <DashboardIcon /> },
    { href: "/admin/users", label: "Users", icon: <PeopleIcon /> },
    // { href: "/admin/blogs", label: "Blogs", icon: <ArticleIcon /> },
    { href: "/admin/categories", label: "Categories", icon: <CategoryIcon /> },
    // { href: "/admin/banners", label: "Banners", icon: <ImageIcon /> },
    { href: "/admin/products", label: "Products", icon: <InventoryIcon /> },
    { href: "/admin/orders", label: "Orders", icon: <AssignmentIcon /> },
    { href: "/admin/payments", label: "Payments", icon: <CurrencyRupeeIcon /> },
  ];

  const activeTab = links.find((link) => pathname === link.href) // Exact match
    ? links.find((link) => pathname === link.href).label
    : links.find((link) => pathname.startsWith(link.href))?.label ||
      "Dashboard";


  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar links={links} />

      {/* Main content */}
      <main className="flex-1 bg-gray-100">
        <Header activeTab={activeTab} />
        {children}
      </main>
    </div>
  );
};

export default AdminLayoutComponent;
