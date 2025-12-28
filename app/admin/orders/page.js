"use client";

import React, { useEffect, useState } from "react";
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
  Chip,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, updateOrderStatus } from "@/store/slices/admin/adminOrderSlice";
import OrderDetailsModal from "@/app/components/admin/OrderDetailsModal";
import Spinner from "@/app/components/loader/Spinner";

export default function AdminOrdersPage() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [viewOrder, setViewOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const { orders, loading, updateLoading } = useSelector((state) => state.adminOrder);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Filter orders based on selected status
  const filteredOrders = statusFilter === "All"
    ? orders
    : orders.filter(order => order.status === statusFilter);

  // Sort orders: Pending first, then others, Delivered last
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const statusOrder = {
      Pending: 1,
      Processing: 2,
      Shipped: 3,
      Cancelled: 4,
      Delivered: 5,
    };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  const rowsPerPage = 10;
  const paginatedOrders = sortedOrders.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const totalPages = Math.ceil(sortedOrders.length / rowsPerPage);

  const handleViewOrder = (order) => {
    setViewOrder(order);
  };

  const handleCloseViewModal = () => {
    setViewOrder(null);
  };

  const handleUpdateStatus = async (orderId, Status) => {
    await dispatch(updateOrderStatus({ orderId, status: Status }));
  };

  const handleStatusFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setStatusFilter(newFilter);
      setPage(1); // Reset to first page when filter changes
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      Pending: {
        color: "#FF9800",
        bgColor: "#FFF3E0",
        icon: <HourglassEmptyIcon sx={{ fontSize: 16 }} />,
      },
      Shipped: {
        color: "#AB47BC",
        bgColor: "#F3E5F5",
        icon: <LocalShippingIcon sx={{ fontSize: 16 }} />,
      },
      Delivered: {
        color: "#66BB6A",
        bgColor: "#E8F5E9",
        icon: <CheckCircleIcon sx={{ fontSize: 16 }} />,
      },
      Cancelled: {
        color: "#EF5350",
        bgColor: "#FFEBEE",
        icon: <CancelIcon sx={{ fontSize: 16 }} />,
      },
    };
    return configs[status] || { color: "#9E9E9E", bgColor: "#F5F5F5", icon: null };
  };

  // Count orders by status
  const statusCounts = {
    All: orders.length,
    Pending: orders.filter(o => o.status === "Pending").length,
    Shipped: orders.filter(o => o.status === "Shipped").length,
    Delivered: orders.filter(o => o.status === "Delivered").length,
    Cancelled: orders.filter(o => o.status === "Cancelled").length,
  };

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>

      {/* Status Filter */}
      <Box sx={{ mb: 3 }}>
        <ToggleButtonGroup
          value={statusFilter}
          exclusive
          onChange={handleStatusFilterChange}
          aria-label="order status filter"
          sx={{ flexWrap: "wrap", gap: 1 }}
        >
          <ToggleButton value="All" aria-label="all orders">
            All ({statusCounts.All})
          </ToggleButton>
          <ToggleButton
            value="Pending"
            aria-label="pending orders"
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#FFF3E0",
                color: "#FF9800",
                "&:hover": { backgroundColor: "#FFE0B2" }
              }
            }}
          >
            <HourglassEmptyIcon sx={{ fontSize: 18, mr: 0.5 }} />
            Pending ({statusCounts.Pending})
          </ToggleButton>
          <ToggleButton
            value="Shipped"
            aria-label="shipped orders"
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#F3E5F5",
                color: "#AB47BC",
                "&:hover": { backgroundColor: "#E1BEE7" }
              }
            }}
          >
            <LocalShippingIcon sx={{ fontSize: 18, mr: 0.5 }} />
            Shipped ({statusCounts.Shipped})
          </ToggleButton>
          <ToggleButton
            value="Delivered"
            aria-label="delivered orders"
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#E8F5E9",
                color: "#66BB6A",
                "&:hover": { backgroundColor: "#C8E6C9" }
              }
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 18, mr: 0.5 }} />
            Delivered ({statusCounts.Delivered})
          </ToggleButton>
          <ToggleButton
            value="Cancelled"
            aria-label="cancelled orders"
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#FFEBEE",
                color: "#EF5350",
                "&:hover": { backgroundColor: "#FFCDD2" }
              }
            }}
          >
            <CancelIcon sx={{ fontSize: 18, mr: 0.5 }} />
            Cancelled ({statusCounts.Cancelled})
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Order ID</strong>
              </TableCell>
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
                <strong>Quantity</strong>
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
            {paginatedOrders.map((order) => {
              const totalQuantity = order?.items?.reduce(
                (sum, item) => sum + item.quantity,
                0
              );
              const statusConfig = getStatusConfig(order?.status);

              return (
                <TableRow key={order._id}>
                  <TableCell>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                      {order?.orderNumber}
                    </span>
                  </TableCell>
                  <TableCell>
                    {order?.user?.username || order?.customerInfo?.name}
                  </TableCell>
                  <TableCell>
                    {order?.user?.email || order?.customerInfo?.email}
                  </TableCell>
                  <TableCell>
                    {order?.user?.phone || order?.customerInfo?.phone}
                  </TableCell>
                  <TableCell>{order?.items?.length}</TableCell>
                  <TableCell>{totalQuantity}</TableCell>
                  <TableCell>₹{order?.amount}</TableCell>
                  <TableCell>
                    <Chip
                      label={order?.status}
                      icon={statusConfig.icon}
                      size="small"
                      sx={{
                        backgroundColor: statusConfig.bgColor,
                        color: statusConfig.color,
                        fontWeight: 600,
                        "& .MuiChip-icon": {
                          color: statusConfig.color,
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <div className="flex gap-2 justify-center">
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ gap: 1 }}
                        onClick={() => handleViewOrder(order)}
                      >
                        <VisibilityIcon fontSize="small" />
                        View
                      </Button>
                      {order?.status !== "Delivered" && order?.status !== "Cancelled" && order?.status !== "Shipped" && (
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            gap: 1,
                            bgcolor: "#AB47BC",
                            "&:hover": { bgcolor: "#9C27B0" },
                          }}
                          onClick={() => handleUpdateStatus(order._id, "Shipped")}
                          disabled={updateLoading}
                        >
                          <LocalShippingIcon fontSize="small" />
                          Ship
                        </Button>
                      )}

                      {order?.status !== "Delivered" && order?.status !== "Cancelled" && (
                        <Button
                          variant="contained"
                          size="small"
                          color="success"
                          sx={{ gap: 1 }}
                          onClick={() => handleUpdateStatus(order._id, "Delivered")}
                          disabled={updateLoading}
                        >
                          <CheckCircleIcon fontSize="small" />
                          Complete
                        </Button>
                      )}

                      {order?.status !== "Delivered" && order?.status !== "Cancelled" && (
                        <Button
                          variant="contained"
                          size="small"
                          color="error"
                          sx={{ gap: 1 }}
                          onClick={() => handleUpdateStatus(order._id, "Cancelled")}
                          disabled={updateLoading}
                        >
                          <CancelIcon fontSize="small" />
                          Cancel Order
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
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

      {viewOrder && (
        <OrderDetailsModal
          open={!!viewOrder}
          onClose={handleCloseViewModal}
          order={viewOrder}
        />
      )}
    </div>
  );
}