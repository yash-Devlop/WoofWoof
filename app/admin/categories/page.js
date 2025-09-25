"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import {
  clearSelectedCategory,
  fetchCategories,
  setSelectedCategory,
} from "@/store/slices/admin/adminCategorySlice";

import {
  Table,
  TableBody,
  FormHelperText,
  Modal,
  Box,
  Typography,
  TextField,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Pagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Swal from "sweetalert2";
import axios from "axios";
// import AdminAddCategoryModal from "@/app/components/admin/category/AdminAddCategoryModal";
// import AdminViewCategoryModal from "@/app/components/admin/category/AdminViewCategoryModal";

export default function AdminCategoriesPage() {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const {
    categories = [],
    loading = false,
    selectedCategory,
  } = useSelector((state) => state.adminCategory || {});

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(categories.length / rowsPerPage);
  const paginatedCategories = categories.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = async (categoryId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`/api/admin/category/${categoryId}`);

        if (res.data.status === 200) {
          Swal.fire("Deleted!", "Category has been deleted.", "success");
          dispatch(fetchCategories());
          // Optionally, refresh the category list here
        } else {
          Swal.fire(
            "Error!",
            res.data.message || "Failed to delete category.",
            "error"
          );
        }
      } catch (error) {
        Swal.fire(
          "Error!",
          error.response?.data?.message ||
            error.message ||
            "Failed to delete category.",
          "error"
        );
      }
    }
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    dispatch(clearSelectedCategory());
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4 px-2">
        <h1 className="text-2xl font-bold">All Categories</h1>
        <Button
          variant="contained"
          onClick={() => setOpenModal(true)}
          sx={{ gap: 1 }}
        >
          <AddIcon /> Add Category
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Product Count</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCategories.map((category) => (
                <TableRow key={category._id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell align="center">
                    {category?.productCount || 0}
                  </TableCell>
                  <TableCell align="center">
                    {/* <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        dispatch(setSelectedCategory(category));
                        setViewModalOpen(true);
                      }}
                      sx={{ mr: 1, gap: 1 }}
                    >
                      <VisibilityIcon /> View
                    </Button> */}
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(category._id)}
                      sx={{ gap: 1 }}
                    >
                      <DeleteIcon /> Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* <AdminAddCategoryModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      /> */}

      {/* {selectedCategory && (
        <AdminViewCategoryModal
          open={viewModalOpen}
          onClose={handleCloseViewModal}
          category={selectedCategory}
        />
      )} */}

      <div className="flex justify-center mt-4">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, val) => setPage(val)}
          color="primary"
        />
      </div>
      {/* Add Category Modal */}
      <AddCategoryModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={() => dispatch(fetchCategories())}
      />
    </div>
  );
}

function AddCategoryModal({ open, onClose, onSuccess }) {
  const [formData, setFormData] = useState({ coverImage: "", name: "" });
  const [submitting, setSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const uploadImage = async (file) => {
    if (!file) return null;

    const data = new FormData();
    data.append("file", file);

    try {
      const response = await axios.post("/api/upload", data);
      const result = response.data;
      return result.url; // e.g. /uploads/16930012345-myimg.png
    } catch (err) {
      console.error("Image upload failed", err);
      return null;
    }
  };

  const handleAddCategory = async () => {
    if (!formData.name.trim()) {
      Swal.fire({
        title: "Validation Error",
        text: "Category name cannot be empty.",
        icon: "warning",
        target: document.body, // 👈 ensures it renders above your MUI Modal
      });
      return;
    }

    if (!formData.coverImage.trim()) {
      Swal.fire({
        title: "Validation Error",
        text: "Cover image is required.",
        icon: "warning",
        target: document.body, // 👈 ensures it renders above your MUI Modal
      });
      return;
    }

    setSubmitting(true);

    try {
      const res = await axios.post("/api/admin/category", formData);

      if (res.data.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Category added successfully.",
          icon: "success",
          target: document.body,
        });
        setFormData({ coverImage: "", name: "" });
        onSuccess();
        onClose();
      } else {
        onClose();
        Swal.fire({
          title: "Error!",
          text: res.data.message || "Failed to add category.",
          icon: "error",
          target: document.body, // ✅ ensures it floats above the MUI modal
        });
      }
    } catch (error) {
      onClose();
      Swal.fire({
        title: "Error!",
        text: res.data.message || "Failed to add category.",
        icon: "error",
        target: document.body, // ✅ ensures it floats above the MUI modal
      });
    } finally {
      setSubmitting(false);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    p: 4,
    borderRadius: 2,
    boxShadow: 24,
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          Add New Category
        </Typography>
        <TextField
          fullWidth
          label="Category Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          margin="normal"
          disabled={submitting}
        />
        <FormHelperText sx={{ mb: 2 }}>
          Category name must be unique from the rest.
        </FormHelperText>
        <div>
          <p className="text-sm font-medium mb-1">Category Cover Image</p>

          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            id="coverImageUpload"
            style={{ display: "none" }}
            onChange={async (e) => {
              const file = e.target.files[0];
              if (file) {
                setSelectedFile(file);
                setPreview(URL.createObjectURL(file));

                // ✅ Upload immediately
                const uploadedUrl = await uploadImage(file);
                if (uploadedUrl) {
                  setFormData((prev) => ({ ...prev, coverImage: uploadedUrl }));
                }
              }
            }}
          />

          {/* Button to trigger file input */}
          <label htmlFor="coverImageUpload">
            <Button variant="outlined" component="span">
              Upload Image
            </Button>
          </label>

          {/* Preview */}
          {preview && (
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-1">Preview:</p>
              <Image
                src={preview}
                width={100}
                height={100}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-md border"
              />
            </div>
          )}
        </div>
        <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
          <Button variant="outlined" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddCategory}
            disabled={submitting}
          >
            {submitting ? "Adding..." : "Add"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
