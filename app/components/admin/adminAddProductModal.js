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
} from "@/store/slices/admin/adminProductSlice"; // Make sure to create this action
import toast from "react-hot-toast";
import { fetchCategories } from "@/store/slices/admin/adminCategorySlice";

const AdminAddProductModal = ({ open, onClose }) => {
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  //   const categories = useSelector((state) => state.categories);  //Assuming categories are fetched from the store
  const categories = useSelector((state) => state.adminCategory.categories);

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
    });
    setImages([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "rating") {
      // Allow empty string to let user delete and retype
      if (value === "") {
        setProductData((prevData) => ({ ...prevData, rating: "" }));
        return;
      }

      // Convert to number
      const numericValue = Number(value);

      // Only update if numeric and between 0 and 5
      if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 5) {
        setProductData((prevData) => ({ ...prevData, rating: value }));
      }
      // Else ignore input (don't update state)
    } else if (name.startsWith("description.")) {
      const field = name.split(".")[1];
      setProductData((prevData) => ({
        ...prevData,
        description: {
          ...prevData.description,
          [field]: value,
        },
      }));
    } else {
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    const { name, price, markedPrice, rating, categoryName, tags } =
      productData;
    if (
      !name ||
      !price ||
      !markedPrice ||
      rating === "" || // allow rating = 0
      !categoryName ||
      images.length === 0
    ) {
      toast.error(
        "All fields including marked price, rating, and at least one image are required."
      );
      return;
    }

    if (rating < 0 || rating > 5) {
      toast.error("Rating must be between 0 and 5.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("markedPrice", markedPrice);
    formData.append("rating", rating);
    formData.append("categoryName", categoryName);
    formData.append("tags", tags);
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

    images.forEach((image) => {
      formData.append("images", image);
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

  return (
    <Modal
      open={open}
      onClose={() => {
        resetForm();
        onClose();
      }}
      aria-labelledby="add-product-modal"
      aria-describedby="add-product-form"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          height: 600, // fixed height, adjust as needed
          overflowY: "auto", // vertical scroll when content overflows
          bgcolor: "background.paper",
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="add-product-modal" variant="h6" component="h2" mb={2}>
          Add New Product
        </Typography>
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
        <TextField
          fullWidth
          label="Tags (Comma separated)"
          name="tags"
          value={productData.tags}
          onChange={handleInputChange}
          variant="outlined"
          margin="normal"
        />
        <Typography variant="subtitle1" mt={3}>
          Description
        </Typography>
        <TextField
          fullWidth
          label="Description"
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

        <Typography variant="subtitle1" mt={2}>
          Upload up to 5 product images:
        </Typography>

        <ImageUploader images={images} setImages={setImages} />
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
