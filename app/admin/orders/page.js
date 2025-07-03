"use client";

import React, { use, useEffect, useState } from "react";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "@/store/slices/admin/adminOrderSlice";
import OrderDetailsModal from "@/app/components/admin/OrderDetailsModal";

// 🔧 Hardcoded data

export default function AdminOrdersPage() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [viewProduct, setViewProduct] = useState(null);
  const { orders, loading } = useSelector((state) => state.adminOrder);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const rowsPerPage = 10;
  const paginatedOrders = orders.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const totalPages = Math.ceil(orders.length / rowsPerPage);

  const handleViewProduct = (product) => {
    setViewProduct(product);
  };

  const handleCloseViewModal = () => {
    setViewProduct(null);
  };

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>User Name</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Phone</strong>
              </TableCell>
              <TableCell>
                <strong>Products</strong>
              </TableCell>
              <TableCell>
                <strong>Price</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order?.user?.username}</TableCell>
                <TableCell>{order?.user?.email}</TableCell>
                <TableCell>{order?.user?.phone}</TableCell>
                <TableCell>{order?.items?.length}</TableCell>
                <TableCell>₹{order?.amount}</TableCell>
                <TableCell>{order?.status}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ gap: 1 }}
                    onClick={() => handleViewProduct(order?.items)}
                  >
                    <VisibilityIcon />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="flex justify-center mt-4">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, val) => setPage(val)}
          color="primary"
        />
      </div>

      {viewProduct && (
        <OrderDetailsModal
          open={!!viewProduct}
          onClose={handleCloseViewModal}
          items={viewProduct}
        />
      )}
    </div>
  );
}
