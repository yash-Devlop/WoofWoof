"use client";
import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ImageUploader from "../ImageUploader";
import {
  createProduct,
  fetchAllProductsAdmin,
} from "@/store/slices/admin/adminProductSlice";
import toast from "react-hot-toast";
import { fetchCategories } from "@/store/slices/admin/adminCategorySlice";
import ColorPicker from "./colorPicker";

const AdminAddProductModal = ({ open, onClose }) => {
  const [images, setImages] = useState([]);
  const [colors, setColors] = useState([]);
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.adminCategory.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    markedPrice: "",
    rating: "",
    categoryName: "",
    tags: "",
    description: {
      coreInstruction: "",
      detailedInfo: "",
      additionalDetails: "",
    },
    sizes: [],
  });

  const resetForm = () => {
    setProductData({
      name: "",
      price: "",
      markedPrice: "",
      rating: "",
      categoryName: "",
      tags: "",
      description: {
        coreInstruction: "",
        detailedInfo: "",
        additionalDetails: "",
      },
      sizes: [],
    });
    setImages([]);
    setColors([]);
  };

  const handleAddSize = (size) => {
    if (!productData.sizes.includes(size)) {
      setProductData((prev) => ({
        ...prev,
        sizes: [...prev.sizes, size],
      }));
    }
  };

  const handleRemoveSize = (size) => {
    setProductData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((s) => s !== size),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "rating") {
      if (value === "") {
        setProductData((prev) => ({ ...prev, rating: "" }));
        return;
      }

      const num = Number(value);
      if (!isNaN(num) && num >= 0 && num <= 5) {
        setProductData((prev) => ({ ...prev, rating: value }));
      }
    } else if (name.startsWith("description.")) {
      const field = name.split(".")[1];
      setProductData((prev) => ({
        ...prev,
        description: { ...prev.description, [field]: value },
      }));
    } else {
      setProductData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const { name, price, markedPrice, rating, categoryName, tags } =
      productData;

    if (
      !name ||
      !price ||
      !markedPrice ||
      rating === "" ||
      !categoryName ||
      images.length === 0
    ) {
      toast.error("All fields including rating and images are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("markedPrice", markedPrice);
    formData.append("rating", rating);
    formData.append("categoryName", categoryName);
    formData.append("tags", tags);

    productData.sizes.forEach((size) => {
      formData.append("sizes[]", size);
    });


    formData.append(
      "description.coreInstruction",
      productData.description.coreInstruction
    );
    formData.append(
      "description.detailedInfo",
      productData.description.detailedInfo
    );
    formData.append(
      "description.additionalDetails",
      productData.description.additionalDetails
    );

    images.forEach((image) => formData.append("images", image));
    colors.forEach((color, index) => {
      formData.append(`colors[${index}][name]`, color.name);
      formData.append(`colors[${index}][code]`, color.code);
    });

    try {
      await dispatch(createProduct(formData)).unwrap();
      toast.success("Product added successfully.");
      dispatch(fetchAllProductsAdmin());
      resetForm();
      onClose();
    } catch (error) {
      toast.error(error?.message || "Product creation failed.");
    }
  };

  const handleAddColor = (color) => {
    if (colors.length >= 5) return alert("Max 5 colors allowed");
    if (colors.some((c) => c.name.toLowerCase() === color.name.toLowerCase()))
      return alert("Duplicate color name");
    if (colors.some((c) => c.code.toLowerCase() === color.code.toLowerCase()))
      return alert("Duplicate color code");

    setColors((prev) => [...prev, color]);
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        resetForm();
        onClose();
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          height: 600,
          overflowY: "auto",
          bgcolor: "background.paper",
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" mb={2}>
          Add New Product
        </Typography>

        {/* Basic Fields */}
        <TextField
          fullWidth
          label="Product Name"
          name="name"
          value={productData.name}
          onChange={handleInputChange}
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Price"
          name="price"
          value={productData.price}
          onChange={handleInputChange}
          variant="outlined"
          margin="normal"
          type="number"
        />
        <TextField
          fullWidth
          label="Marked Price"
          name="markedPrice"
          value={productData.markedPrice}
          onChange={handleInputChange}
          variant="outlined"
          margin="normal"
          type="number"
        />
        <TextField
          fullWidth
          label="Rating (0-5)"
          name="rating"
          value={productData.rating}
          onChange={handleInputChange}
          variant="outlined"
          margin="normal"
          type="number"
          inputProps={{ min: 0, max: 5, step: 0.1 }}
        />

        {/* Category */}
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            value={productData.categoryName}
            onChange={handleInputChange}
            label="Category"
            name="categoryName"
          >
            {categories?.map((category) => (
              <MenuItem key={category._id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Tags */}
        <TextField
          fullWidth
          label="Tags (Comma separated)"
          name="tags"
          value={productData.tags}
          onChange={handleInputChange}
          variant="outlined"
          margin="normal"
        />

        {/* Colors */}
        <ColorPicker onAddColor={handleAddColor} />

        <div className="mt-3">
          <p className="font-semibold mb-2">Selected Colors:</p>
          {colors.length === 0 && (
            <p className="text-sm text-gray-500">No colors added yet.</p>
          )}
          <div className="flex flex-wrap gap-3">
            {colors.map((color, index) => (
              <div
                key={index}
                className="flex items-center gap-2 border rounded-md px-3 py-2"
              >
                <div
                  style={{
                    backgroundColor: color.code,
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    border: "1px solid #ccc",
                  }}
                ></div>
                <input
                  type="text"
                  value={color.name}
                  onChange={(e) => {
                    const newColors = [...colors];
                    newColors[index].name = e.target.value;
                    setColors(newColors);
                  }}
                  className="border rounded-md px-2 py-1 text-sm w-24"
                />
                <button
                  onClick={() => {
                    const newColors = colors.filter((_, i) => i !== index);
                    setColors(newColors);
                  }}
                  className="text-red-500 hover:text-red-700 text-sm font-semibold"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="mt-4">
          <label className="font-medium">Sizes:</label>
          <div className="flex gap-2 mt-2 flex-wrap">
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => handleAddSize(size)}
                className={`px-3 py-1 border rounded ${productData.sizes.includes(size)
                  ? "bg-[#ff0047] text-white"
                  : "bg-gray-100"
                  }`}
              >
                {size}
              </button>
            ))}
          </div>

          {productData.sizes.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {productData.sizes.map((s) => (
                <span
                  key={s}
                  className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
                  onClick={() => handleRemoveSize(s)}
                >
                  {s} ✕
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        <Typography variant="subtitle1" mt={3}>
          Description
        </Typography>
        <TextField
          fullWidth
          label="Additional Details"
          name="description.additionalDetails"
          value={productData.description.additionalDetails}
          onChange={handleInputChange}
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Core Instruction"
          name="description.coreInstruction"
          value={productData.description.coreInstruction}
          onChange={handleInputChange}
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Detailed Info"
          name="description.detailedInfo"
          value={productData.description.detailedInfo}
          onChange={handleInputChange}
          variant="outlined"
          margin="normal"
        />

        {/* Images */}
        <Typography variant="subtitle1" mt={2}>
          Upload up to 5 product images:
        </Typography>
        <ImageUploader images={images} setImages={setImages} />

        {/* Buttons */}
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button
            onClick={() => {
              resetForm();
              onClose();
            }}
            color="secondary"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add Product
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AdminAddProductModal;
