"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProductsAdmin,
  setSelectedProduct,
  clearSelectedProduct,
} from "@/store/slices/admin/adminProductSlice";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminProductViewModal from "@/app/components/admin/product/AdminProductViewModal";
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
import AdminAddProductModal from "@/app/components/admin/adminAddProductModal";
import { deleteProduct } from "@/store/slices/admin/adminProductSlice";
import Swal from "sweetalert2";
import AdminEditProductModal from "@/app/components/admin/AdminEditProductModal";

export default function AdminProductsPage() {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const dispatch = useDispatch();
  const {
    products = [],
    loading = false,
    selectedProduct,
  } = useSelector((state) => state.adminProduct || {});
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    dispatch(fetchAllProductsAdmin());
  }, [dispatch]);

  const paginatedProducts = products.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const totalPages = Math.ceil(products.length / rowsPerPage);

  const handleDeleteProduct = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(productId))
          .then(() => {
            Swal.fire("Deleted!", "The product has been deleted.", "success");
          })
          .catch(() => {
            Swal.fire(
              "Error!",
              "There was an error deleting the product.",
              "error"
            );
          });
        dispatch(fetchAllProductsAdmin());
      }
    });
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    dispatch(clearSelectedProduct());
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    dispatch(clearSelectedProduct());
  };

  return (
    <div className="p-6">
      <div className=" flex justify-between items-center mb-4 px-2">
        <h1 className="text-2xl font-bold">All Products</h1>
        <Button
          variant="contained"
          size="small"
          onClick={handleOpenModal}
          sx={{
            gap: 1,
          }}
        >
          <AddIcon />
          Add Product
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
                <TableCell>
                  <strong>Category</strong>
                </TableCell>
                <TableCell>
                  <strong>Price</strong>
                </TableCell>
                <TableCell>
                  <strong>Stock</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedProducts.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.Category?.name || "N/A"}</TableCell>
                  <TableCell>₹{product.price}</TableCell>
                  <TableCell>{product.popularity}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        dispatch(setSelectedProduct(product));
                        setViewModalOpen(true);
                      }}
                      sx={{ mr: 1, gap: 1 }}
                    >
                      <VisibilityIcon />
                      View
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        dispatch(setSelectedProduct(product));
                        setEditModalOpen(true);
                      }}
                      sx={{ mr: 1, gap: 1 }}
                    >
                      <EditIcon />
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteProduct(product._id)}
                      sx={{ mr: 1, gap: 1 }}
                    >
                      <DeleteIcon />
                      Delete
                    </Button>
                    {/* Add delete button later if needed */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <AdminAddProductModal open={openModal} onClose={handleCloseModal} />

      <div className="flex justify-center mt-4">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, val) => setPage(val)}
          color="primary"
        />
      </div>

      {selectedProduct && (
        <AdminEditProductModal
          open={editModalOpen}
          onClose={handleCloseEditModal}
          product={selectedProduct}
        />
      )}

      {selectedProduct && (
        <AdminProductViewModal
          open={viewModalOpen}
          onClose={handleCloseViewModal}
          product={selectedProduct}
        />
      )}
      <div></div>
    </div>
  );
}
