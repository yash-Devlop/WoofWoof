import React, { useEffect } from "react";
import Image from "next/image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/store/slices/user/productSlice";

export default function ProductGrid() {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Failed to load products.</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="rounded-2xl cursor-pointer shadow-md hover:shadow-lg transition-transform hover:scale-[1.02]"
        >
          <div className="bg-[#ececec] lg:min-h-[200px] overflow-hidden rounded-t-2xl">
            <Image
              src={product?.image}
              alt={product.name}
              width={100}
              height={100}
              className="w-full h-32 object-contain mb-2"
            />
          </div>
          <div className="p-3 flex justify-between">
            <div>
              <h3 className="text-sm font-medium">{product.name}</h3>
              <p className="text-gray-600 text-sm">₹{product.price}</p>
            </div>
            <div>
              <FavoriteBorderIcon
                sx={{
                  color: "#ff4081",
                  fontSize: "22px",
                  cursor: "pointer",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
