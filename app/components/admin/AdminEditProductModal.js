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
import { useDispatch } from "react-redux";
// import { updateProduct } from "@/store/slices/admin/adminProductSlice";
import toast from "react-hot-toast";
import { updateProduct } from "@/store/slices/admin/adminProductSlice";

const AdminEditProductModal = ({ open, onClose, product }) => {
  const dispatch = useDispatch();

  const categories = [
    { _id: "1", name: "Pet Toy" },
    { _id: "2", name: "Pet Accessories" },
    { _id: "3", name: "Birthday Gift" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    categoryName: "",
    tags: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        categoryName: product.Category?.name || "",
        tags: product.tags?.join(", ") || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    if (
      !formData.name ||
      !formData.price ||
      !formData.categoryName ||
      !formData.tags
    ) {
      toast.error("All fields are required");
      return;
    }

    const updatedData = {
      id: product._id,
      updatedFields: {
        name: formData.name,
        price: formData.price,
        categoryName: formData.categoryName,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
      },
    };

    dispatch(updateProduct(updatedData))
      .unwrap()
      .then(() => {
        toast.success("Product updated successfully!");
      })
      .catch(() => {
        toast.error("Failed to update product");
      });
  };

  return (
    <Modal open={open} onClose={onClose}>
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
        <Typography variant="h6" mb={2}>
          Edit Product
        </Typography>
        <TextField
          fullWidth
          label="Product Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          type="number"
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            name="categoryName"
            value={formData.categoryName}
            onChange={handleChange}
            label="Category"
          >
            {categories.map((cat) => (
              <MenuItem key={cat._id} value={cat.name}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Tags (comma-separated)"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          margin="normal"
        />

        <Box mt={2} display="flex" justifyContent="space-between">
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update Product
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AdminEditProductModal;
