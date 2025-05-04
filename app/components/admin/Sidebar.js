"use client";

import { useState } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar({ links }) {
  const [collapsed, setCollapsed] = useState(true);
  const toggleSidebar = () => setCollapsed(!collapsed);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside
      className={`bg-[#ff3971e5] text-white min-h-screen p-4 transition-all duration-300 ${
        collapsed ? "w-20" : "w-50"
      }`}
    >
      <nav className="space-y-2">
        <div className="flex justify-between items-center mb-6">
          <button
            className="flex items-center gap-3 hover:bg-[#cc2c5a] px-3 py-2 rounded"
            onClick={toggleSidebar}
          >
            {!collapsed && <h2 className="text-xl font-bold">Admin Panel</h2>}
            {collapsed && (
              <span>
                <MenuIcon />
              </span>
            )}
          </button>
          <button className=" cursor-pointer" onClick={toggleSidebar}>
            {!collapsed && <CloseIcon />}
          </button>
        </div>

        {links.map((link) => {
          const isActiveTab = pathname === link.href;
          return (
            <Tooltip key={link.href} title={link.label}>
              <Link
                href={link.href}
                className={`flex items-center gap-3 hover:bg-[#cc2c5a] px-3 py-2 rounded ${
                  isActiveTab ? "bg-[#b0254d]" : "hover:bg-[#cc2c5a]"
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                {!collapsed && <span>{link.label}</span>}
              </Link>
            </Tooltip>
          );
        })}
      </nav>
    </aside>
  );
}
