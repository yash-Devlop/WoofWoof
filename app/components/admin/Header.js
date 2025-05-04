"use client";

import Badge from "@mui/material/Badge";
import AccountMenu from "./AccountMenu";

export default function Header({ activeTab }) {
  return (
    <header className="bg-[#ff3971e5] text-white flex justify-between items-center p-3">
      <div className="flex items-center gap-4"></div>
      <div className=" text-2xl font-semibold text-white">{activeTab}</div>
      <div className="flex items-center gap-4 cursor-pointer pr-4">
        <Badge
          badgeContent=""
          color="primary"
          variant="dot"
          sx={{
            ".MuiBadge-dot": {
              width: 8, // Adjust size here
              height: 8, // Adjust size here
            },
          }}
        >
          <AccountMenu />
        </Badge>
      </div>
    </header>
  );
}
