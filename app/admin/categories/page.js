"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  clearSelectedCategory,
  fetchCategories,
  setSelectedCategory,
} from "@/store/slices/admin/adminCategorySlice";

import {
  Table,
  TableBody,
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

  const handleDelete = (categoryId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategory(categoryId))
          .then(() =>
            Swal.fire("Deleted!", "Category has been deleted.", "success")
          )
          .catch(() =>
            Swal.fire("Error!", "Failed to delete category.", "error")
          );
      }
    });
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
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCategories.map((category) => (
                <TableRow key={category._id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        dispatch(setSelectedCategory(category));
                        setViewModalOpen(true);
                      }}
                      sx={{ mr: 1, gap: 1 }}
                    >
                      <VisibilityIcon /> View
                    </Button>
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
    </div>
  );
}
