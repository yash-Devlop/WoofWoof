import React, { useState } from "react";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

// const QuantitySelector = () => {
//   const [quantity, setQuantity] = useState(1);

//   const increment = () => {
//     setQuantity((prev) => prev + 1);
//   };

//   const decrement = () => {
//     if (quantity > 1) {
//       setQuantity((prev) => prev - 1);
//     }
//   };

//   return (
//     <div className="flex items-center border rounded w-fit">
//       <button
//         className="w-8 hover:bg-[#F91F54] hover:text-white  flex justify-center items-center border-r cursor-pointer"
//         onClick={decrement}
//       >
//         <RemoveOutlinedIcon fontSize="small" />
//       </button>

//       <span className="px-6 w-10 text-sm">{quantity}</span>

//       <button
//         className="w-8 hover:bg-[#F91F54] hover:text-white flex justify-center items-center border-l cursor-pointer"
//         onClick={increment}
//       >
//         <AddOutlinedIcon fontSize="small" />
//       </button>
//     </div>
//   );
// };

// export default QuantitySelector;

const QuantitySelector = ({ quantity, setQuantity }) => {
  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="flex items-center border rounded w-fit">
      <button
        className="w-8 hover:bg-[#F91F54] hover:text-white flex justify-center items-center border-r cursor-pointer"
        onClick={decrement}
      >
        <RemoveOutlinedIcon fontSize="small" />
      </button>

      <span className="px-6 w-10 text-sm">{quantity}</span>

      <button
        className="w-8 hover:bg-[#F91F54] hover:text-white flex justify-center items-center border-l cursor-pointer"
        onClick={increment}
      >
        <AddOutlinedIcon fontSize="small" />
      </button>
    </div>
  );
};

export default QuantitySelector;
