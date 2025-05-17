"use client";
import React, { useState } from "react";
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

const AdminAddProductModal = ({ open, onClose }) => {
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();
  //   const categories = useSelector((state) => state.categories);  //Assuming categories are fetched from the store
  const categories = [
    { _id: "1", name: "Pet Toy" },
    { _id: "2", name: "Pet Accessories" },
    { _id: "3", name: "Birthday Gift" },
  ];

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    categoryName: "",
    tags: "",
  });

  const resetForm = () => {
    setProductData({ name: "", price: "", categoryName: "", tags: "" });
    setImages([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    const { name, price, categoryName, tags } = productData;
    if (
      !productData.name ||
      !productData.price ||
      !productData.categoryName ||
      images.length === 0
    ) {
      toast.error("All fields including at least one image are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("categoryName", categoryName);
    formData.append("tags", tags);

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
          width: 600,
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
