import Image from "next/image";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const productData = [
  {
    id: 1,
    title: "Carry Bag",
    image: "/images/product1.jpg",
    price: "300",
  },
  {
    id: 2,
    title: "Tent",
    image: "/images/product2.jpg",
    price: "300",
  },
  {
    id: 3,
    title: "Dog Leash",
    image: "/images/product3.jpg",
    price: "300",
  },
  {
    id: 4,
    title: "Toy",
    image: "/images/product4.jpg",
    price: "300",
  },
  {
    id: 5,
    title: "Dog Bowl",
    image: "/images/product5.jpg",
    price: "300",
  },
  {
    id: 6,
    title: "Dog Clothes",
    image: "/images/product6.jpg",
    price: "300",
  },
  {
    id: 7,
    title: "Dog Bed",
    image: "/images/product7.jpg",
    price: "300",
  },
  {
    id: 8,
    title: "Dog Food",
    image: "/images/product8.jpg",
    price: "300",
  },
];

const BestSelling = () => {
  return (
    <div className="w-full relative py-16">
      <div className=" px-4 md:px-24 xl:px-40">
        <div className="flex w-full justify-center">
          <h2 className=" text-4xl font-semibold">Best Selling Products</h2>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center gap-8 mt-10">
          {productData.map((product, index) => (
            <div key={index}>
              <div className=" flex justify-center">
                <Image
                  src={product.image}
                  alt="dogHut"
                  width={200}
                  height={200}
                  className=" rounded-t-2xl w-full object-cover h-[300px]"
                />
              </div>
              <div className=" flex flex-col gap-4 mt-4 px-6">
                <div className=" flex justify-between">
                  <span className=" text-xl font-semibold">
                    {product.title}
                  </span>
                  <FavoriteBorderIcon sx={{ color: "#ff0047" }} />
                </div>
                <div>
                  <span className=" text-md">Rs. </span>
                  <span className=" text-md">{product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSelling;
