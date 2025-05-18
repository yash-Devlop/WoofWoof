import React from "react";
import Image from "next/image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const ProductDescriptionHeader = () => {
  return (
    <div className=" p-4 border-b-2 bg-white border-[#ff3971e5]">
      <div className=" w-full flex items-center">
        <div className=" w-full flex justify-center items-center gap-2">
          <Image src="/images/logo.png" alt="logo" width={40} height={40} />
          <span className=" font-bold text-xl">Wed My Pet</span>
        </div>
        <div>
          <div className=" flex gap-4 cursor-pointer ">
            <FavoriteBorderIcon />
            <ShoppingCartOutlinedIcon />
            <PersonOutlineOutlinedIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescriptionHeader;
