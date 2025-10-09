// "use client";
// import React, { useEffect, useState } from "react";
// import ColorPicker from "./colorPicker";
// import {
//   Modal,
//   Box,
//   Typography,
//   TextField,
//   Button,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import toast from "react-hot-toast";
// import {
//   updateProduct,
//   fetchAllProductsAdmin,
// } from "@/store/slices/admin/adminProductSlice";
// import ImageUploader from "../ImageUploader";

// const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];
// const stockOptions = ["In Stock", "Sold Out"]; // ✅ stock options

// const AdminEditProductModal = ({ open, onClose, product }) => {
//   const dispatch = useDispatch();
//   const categories = useSelector((state) => state.adminCategory.categories);

//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     markedPrice: "",
//     rating: "",
//     categoryName: "",
//     tags: "",
//     inStock: "In Stock", // ✅ default stock status
//     description: {
//       coreInstruction: "",
//       detailedInfo: "",
//       additionalDetails: "",
//     },
//   });

//   const [images, setImages] = useState([]);
//   const [colors, setColors] = useState([]);
//   const [sizes, setSizes] = useState([]);

//   useEffect(() => {
//     if (product) {
//       setFormData({
//         name: product.name || "",
//         price: product.price || "",
//         markedPrice: product.markedPrice || "",
//         rating: product.rating || "",
//         categoryName: product.Category?.name || "",
//         tags: product.tags?.join(", ") || "",
//         inStock: product.inStock ? "In Stock" : "Sold Out",
//         description: {
//           coreInstruction: product.description?.coreInstruction || "",
//           detailedInfo: product.description?.detailedInfo || "",
//           additionalDetails: product.description?.additionalDetails || "",
//         },
//       });
//       setColors(product.colors || [{ name: "", code: "" }]);
//       setSizes(product.sizes || []);
//       setImages([]);
//     }
//   }, [product]);

//   // Color handlers
//   const handleColorChange = (index, field, value) => {
//     const updated = [...colors];
//     updated[index][field] = value;
//     setColors(updated);
//   };

//   const handleAddColor = (color) => {
//     if (colors.length >= 5) return toast.error("Max 5 colors allowed");
//     if (colors.some((c) => c.name === color.name || c.code === color.code))
//       return toast.error("Duplicate color not allowed");
//     setColors((prev) => [...prev, color]);
//   };

//   const handleToggleSize = (size) => {
//     if (sizes.includes(size)) {
//       setSizes(sizes.filter((s) => s !== size));
//     } else {
//       setSizes([...sizes, size]);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "rating") {
//       if (value === "") {
//         setFormData((prev) => ({ ...prev, rating: "" }));
//         return;
//       }
//       const num = Number(value);
//       if (!isNaN(num) && num >= 0 && num <= 5) {
//         setFormData((prev) => ({ ...prev, rating: value }));
//       }
//     } else if (name.startsWith("description.")) {
//       const key = name.split(".")[1];
//       setFormData((prev) => ({
//         ...prev,
//         description: { ...prev.description, [key]: value },
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleUpdate = async () => {
//     const { name, price, markedPrice, rating, categoryName, tags, description, inStock } = formData;

//     if (!name || !price || !markedPrice || rating === "" || !categoryName || !tags) {
//       return toast.error("Please fill all required fields.");
//     }

//     if (rating < 0 || rating > 5) return toast.error("Rating must be between 0 and 5");

//     const updatedFormData = new FormData();
//     updatedFormData.append("id", product._id);
//     updatedFormData.append("name", name);
//     updatedFormData.append("price", price);
//     updatedFormData.append("markedPrice", markedPrice);
//     updatedFormData.append("rating", rating);
//     updatedFormData.append("categoryName", categoryName);
//     updatedFormData.append("tags", tags);
//     updatedFormData.append("inStock", inStock === "In Stock"); // ✅ convert to boolean
//     updatedFormData.append("description.coreInstruction", description.coreInstruction);
//     updatedFormData.append("description.detailedInfo", description.detailedInfo);
//     updatedFormData.append("description.additionalDetails", description.additionalDetails);

//     images.forEach((img) => updatedFormData.append("images", img));

//     colors.forEach((color, index) => {
//       updatedFormData.append(`colors[${index}][name]`, color.name);
//       updatedFormData.append(`colors[${index}][code]`, color.code);
//     });

//     if (sizes.length > 0) updatedFormData.append("sizes", JSON.stringify(sizes));

//     try {
//       await dispatch(updateProduct(updatedFormData)).unwrap();
//       toast.success("Product updated successfully");
//       dispatch(fetchAllProductsAdmin());
//       onClose();
//     } catch (err) {
//       toast.error(err?.message || "Failed to update product");
//     }
//   };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: 500,
//           maxHeight: "90vh",
//           overflowY: "auto",
//           bgcolor: "background.paper",
//           borderRadius: 4,
//           boxShadow: 24,
//           p: 4,
//         }}
//       >
//         <Typography variant="h6" mb={2}>Edit Product</Typography>

//         {/* Basic fields */}
//         <TextField fullWidth label="Product Name" name="name" value={formData.name} onChange={handleChange} margin="normal" />
//         <TextField fullWidth label="Price" name="price" type="number" value={formData.price} onChange={handleChange} margin="normal" />
//         <TextField fullWidth label="Marked Price" name="markedPrice" type="number" value={formData.markedPrice} onChange={handleChange} margin="normal" />
//         <TextField fullWidth label="Rating" name="rating" type="number" value={formData.rating} onChange={handleChange} inputProps={{ min: 0, max: 5, step: 0.1 }} margin="normal" />

//         <FormControl fullWidth margin="normal">
//           <InputLabel>Category</InputLabel>
//           <Select name="categoryName" value={formData.categoryName} onChange={handleChange} label="Category">
//             {categories?.map((cat) => (
//               <MenuItem key={cat._id} value={cat.name}>{cat.name}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <TextField fullWidth label="Tags (comma-separated)" name="tags" value={formData.tags} onChange={handleChange} margin="normal" />

//         {/* Stock Status */}
//         <FormControl fullWidth margin="normal">
//           <InputLabel>Stock Status</InputLabel>
//           <Select name="inStock" value={formData.inStock} onChange={handleChange} label="Stock Status">
//             {stockOptions.map((status) => (
//               <MenuItem key={status} value={status}>{status}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         {/* Colors */}
//         <Typography variant="subtitle1" mt={2}>Colors</Typography>
//         <ColorPicker onAddColor={handleAddColor} />
//         <div className="flex flex-wrap gap-2 mt-2">
//           {colors.map((color, i) => (
//             <div key={i} className="flex items-center gap-2 border rounded-md px-2 py-1">
//               <div style={{ backgroundColor: color.code, width: 24, height: 24, borderRadius: "50%", border: "1px solid #ccc" }}></div>
//               <input type="text" value={color.name} onChange={(e) => handleColorChange(i, "name", e.target.value)} className="border rounded px-1 py-0.5 text-sm w-24" />
//               <button onClick={() => setColors(colors.filter((_, idx) => idx !== i))} className="text-red-500 hover:text-red-700 text-sm font-semibold">✕</button>
//             </div>
//           ))}
//         </div>

//         {/* Sizes */}
//         <Typography variant="subtitle1" mt={3}>Sizes (optional)</Typography>
//         <div className="flex gap-2 mt-2 flex-wrap">
//           {sizeOptions.map((size) => {
//             const selected = sizes.includes(size);
//             return (
//               <button
//                 key={size}
//                 type="button"
//                 onClick={() => handleToggleSize(size)}
//                 className={`px-3 py-1 border rounded-full font-semibold transition-colors duration-200 ${selected
//                   ? "bg-[#ff0047] text-white border-[#ff0047]"
//                   : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
//                   }`}
//               >
//                 {size}
//               </button>
//             );
//           })}
//         </div>
//         {sizes.length > 0 && (
//           <div className="mt-2 flex gap-2 flex-wrap">
//             {sizes.map((s) => (
//               <span key={s} className="px-2 py-1 bg-gray-200 rounded-full cursor-pointer flex items-center gap-1" onClick={() => handleToggleSize(s)}>
//                 {s} ✕
//               </span>
//             ))}
//           </div>
//         )}

//         {/* Description */}
//         <Typography variant="subtitle1" mt={3}>Description</Typography>
//         <TextField fullWidth label="Description" name="description.additionalDetails" value={formData.description.additionalDetails} onChange={handleChange} margin="normal" />
//         <TextField fullWidth label="Core Instruction" name="description.coreInstruction" value={formData.description.coreInstruction} onChange={handleChange} margin="normal" />
//         <TextField fullWidth label="Detailed Info" name="description.detailedInfo" value={formData.description.detailedInfo} onChange={handleChange} margin="normal" />

//         {/* Images */}
//         {product?.images?.length > 0 && (
//           <>
//             <Typography variant="subtitle2" mt={1} mb={1}>Existing Images:</Typography>
//             <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
//               {product.images.map((img, idx) => (
//                 <Box key={idx} sx={{ width: 80, height: 80, borderRadius: 2, overflow: "hidden", border: "1px solid #ccc" }}>
//                   <img src={img.url.startsWith("/uploads") ? img.url : `/${img.url}`} alt={img.altText || `image-${idx}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//                 </Box>
//               ))}
//             </Box>
//           </>
//         )}
//         <Typography variant="subtitle1" mt={2}>Upload New Images (optional)</Typography>
//         <ImageUploader images={images} setImages={setImages} />

//         <Box mt={3} display="flex" justifyContent="space-between">
//           <Button onClick={onClose} color="secondary">Cancel</Button>
//           <Button onClick={handleUpdate} variant="contained" color="primary">Update Product</Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default AdminEditProductModal;











"use client";
import React, { useEffect, useState } from "react";
import ColorPicker from "./colorPicker";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  updateProduct,
  fetchAllProductsAdmin,
} from "@/store/slices/admin/adminProductSlice";
import ImageUploader from "../ImageUploader";

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];
const stockOptions = ["In Stock", "Sold Out"]; // ✅ stock options

const AdminEditProductModal = ({ open, onClose, product }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.adminCategory.categories);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    markedPrice: "",
    rating: "",
    categoryName: "",
    tags: "",
    inStock: "In Stock", // ✅ default stock status
    isBestSelling: false, // ✅ default toggle
    description: {
      coreInstruction: "",
      detailedInfo: "",
      additionalDetails: "",
    },
  });

  const [images, setImages] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        markedPrice: product.markedPrice || "",
        rating: product.rating || "",
        categoryName: product.Category?.name || "",
        tags: product.tags?.join(", ") || "",
        inStock: product.inStock ? "In Stock" : "Sold Out",
        isBestSelling: product.isBestSelling || false,
        description: {
          coreInstruction: product.description?.coreInstruction || "",
          detailedInfo: product.description?.detailedInfo || "",
          additionalDetails: product.description?.additionalDetails || "",
        },
      });
      setColors(product.colors || [{ name: "", code: "" }]);
      setSizes(product.sizes || []);
      setImages([]);
    }
  }, [product]);

  // Color handlers
  const handleColorChange = (index, field, value) => {
    const updated = [...colors];
    updated[index][field] = value;
    setColors(updated);
  };

  const handleAddColor = (color) => {
    if (colors.length >= 5) return toast.error("Max 5 colors allowed");
    if (colors.some((c) => c.name === color.name || c.code === color.code))
      return toast.error("Duplicate color not allowed");
    setColors((prev) => [...prev, color]);
  };

  const handleToggleSize = (size) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter((s) => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "rating") {
      if (value === "") {
        setFormData((prev) => ({ ...prev, rating: "" }));
        return;
      }
      const num = Number(value);
      if (!isNaN(num) && num >= 0 && num <= 5) {
        setFormData((prev) => ({ ...prev, rating: value }));
      }
    } else if (name.startsWith("description.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        description: { ...prev.description, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    const { name, price, markedPrice, rating, categoryName, tags, description, inStock, isBestSelling } = formData;

    if (!name || !price || !markedPrice || rating === "" || !categoryName || !tags) {
      return toast.error("Please fill all required fields.");
    }

    if (rating < 0 || rating > 5) return toast.error("Rating must be between 0 and 5");

    const updatedFormData = new FormData();
    updatedFormData.append("id", product._id);
    updatedFormData.append("name", name);
    updatedFormData.append("price", price);
    updatedFormData.append("markedPrice", markedPrice);
    updatedFormData.append("rating", rating);
    updatedFormData.append("categoryName", categoryName);
    updatedFormData.append("tags", tags);
    updatedFormData.append("inStock", inStock === "In Stock");
    updatedFormData.append("isBestSelling", isBestSelling); // ✅ toggle switch

    updatedFormData.append("description.coreInstruction", description.coreInstruction);
    updatedFormData.append("description.detailedInfo", description.detailedInfo);
    updatedFormData.append("description.additionalDetails", description.additionalDetails);

    images.forEach((img) => updatedFormData.append("images", img));

    colors.forEach((color, index) => {
      updatedFormData.append(`colors[${index}][name]`, color.name);
      updatedFormData.append(`colors[${index}][code]`, color.code);
    });

    if (sizes.length > 0) updatedFormData.append("sizes", JSON.stringify(sizes));

    try {
      await dispatch(updateProduct(updatedFormData)).unwrap();
      toast.success("Product updated successfully");
      dispatch(fetchAllProductsAdmin());
      onClose();
    } catch (err) {
      toast.error(err?.message || "Failed to update product");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          maxHeight: "90vh",
          overflowY: "auto",
          bgcolor: "background.paper",
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" mb={2}>Edit Product</Typography>

        {/* Basic fields */}
        <TextField fullWidth label="Product Name" name="name" value={formData.name} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Price" name="price" type="number" value={formData.price} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Marked Price" name="markedPrice" type="number" value={formData.markedPrice} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Rating" name="rating" type="number" value={formData.rating} onChange={handleChange} inputProps={{ min: 0, max: 5, step: 0.1 }} margin="normal" />

        {/* Category */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select name="categoryName" value={formData.categoryName} onChange={handleChange} label="Category">
            {categories?.map((cat) => (
              <MenuItem key={cat._id} value={cat.name}>{cat.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Tags */}
        <TextField fullWidth label="Tags (comma-separated)" name="tags" value={formData.tags} onChange={handleChange} margin="normal" />

        {/* Stock Status */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Stock Status</InputLabel>
          <Select name="inStock" value={formData.inStock} onChange={handleChange} label="Stock Status">
            {stockOptions.map((status) => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Toggle Best Selling */}
        <FormControlLabel
          control={
            <Switch
              checked={formData.isBestSelling}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, isBestSelling: e.target.checked }))
              }
              color="primary"
            />
          }
          label="Mark as Best Selling"
          sx={{ mt: 2 }}
        />

        {/* Colors */}
        <Typography variant="subtitle1" mt={2}>Colors</Typography>
        <ColorPicker onAddColor={handleAddColor} />
        <div className="flex flex-wrap gap-2 mt-2">
          {colors.map((color, i) => (
            <div key={i} className="flex items-center gap-2 border rounded-md px-2 py-1">
              <div style={{ backgroundColor: color.code, width: 24, height: 24, borderRadius: "50%", border: "1px solid #ccc" }}></div>
              <input type="text" value={color.name} onChange={(e) => handleColorChange(i, "name", e.target.value)} className="border rounded px-1 py-0.5 text-sm w-24" />
              <button onClick={() => setColors(colors.filter((_, idx) => idx !== i))} className="text-red-500 hover:text-red-700 text-sm font-semibold">✕</button>
            </div>
          ))}
        </div>

        {/* Sizes */}
        <Typography variant="subtitle1" mt={3}>Sizes (optional)</Typography>
        <div className="flex gap-2 mt-2 flex-wrap">
          {sizeOptions.map((size) => {
            const selected = sizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => handleToggleSize(size)}
                className={`px-3 py-1 border rounded-full font-semibold transition-colors duration-200 ${selected
                  ? "bg-[#ff0047] text-white border-[#ff0047]"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                  }`}
              >
                {size}
              </button>
            );
          })}
        </div>
        {sizes.length > 0 && (
          <div className="mt-2 flex gap-2 flex-wrap">
            {sizes.map((s) => (
              <span key={s} className="px-2 py-1 bg-gray-200 rounded-full cursor-pointer flex items-center gap-1" onClick={() => handleToggleSize(s)}>
                {s} ✕
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        <Typography variant="subtitle1" mt={3}>Description</Typography>
        <TextField fullWidth label="Description" name="description.additionalDetails" value={formData.description.additionalDetails} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Core Instruction" name="description.coreInstruction" value={formData.description.coreInstruction} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Detailed Info" name="description.detailedInfo" value={formData.description.detailedInfo} onChange={handleChange} margin="normal" />

        {/* Images */}
        {product?.images?.length > 0 && (
          <>
            <Typography variant="subtitle2" mt={1} mb={1}>Existing Images:</Typography>
            <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
              {product.images.map((img, idx) => (
                <Box key={idx} sx={{ width: 80, height: 80, borderRadius: 2, overflow: "hidden", border: "1px solid #ccc" }}>
                  <img src={img.url.startsWith("/uploads") ? img.url : `/${img.url}`} alt={img.altText || `image-${idx}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </Box>
              ))}
            </Box>
          </>
        )}
        <Typography variant="subtitle1" mt={2}>Upload New Images (optional)</Typography>
        <ImageUploader images={images} setImages={setImages} />

        <Box mt={3} display="flex" justifyContent="space-between">
          <Button onClick={onClose} color="secondary">Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">Update Product</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AdminEditProductModal;
