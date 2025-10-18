// "use client";

// import React, { use, useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Pagination,
// } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchOrders } from "@/store/slices/admin/adminOrderSlice";
// import OrderDetailsModal from "@/app/components/admin/OrderDetailsModal";

// // 🔧 Hardcoded data

// export default function AdminOrdersPage() {
//   const dispatch = useDispatch();
//   const [page, setPage] = useState(1);
//   const [viewProduct, setViewProduct] = useState(null);
//   const { orders, loading } = useSelector((state) => state.adminOrder);

//   useEffect(() => {
//     dispatch(fetchOrders());
//   }, [dispatch]);

//   const rowsPerPage = 10;
//   const paginatedOrders = orders.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );
//   const totalPages = Math.ceil(orders.length / rowsPerPage);

//   const handleViewProduct = (product) => {
//     setViewProduct(product);
//   };

//   const handleCloseViewModal = () => {
//     setViewProduct(null);
//   };

//   if (loading) {
//     return <div>loading...</div>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">All Orders</h1>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>
//                 <strong>User Name</strong>
//               </TableCell>
//               <TableCell>
//                 <strong>Email</strong>
//               </TableCell>
//               <TableCell>
//                 <strong>Phone</strong>
//               </TableCell>
//               <TableCell>
//                 <strong>Products</strong>
//               </TableCell>
//               <TableCell>
//                 <strong>Price</strong>
//               </TableCell>
//               <TableCell>
//                 <strong>Status</strong>
//               </TableCell>
//               <TableCell align="center">
//                 <strong>Actions</strong>
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedOrders.map((order) => (
//               <TableRow key={order._id}>
//                 <TableCell>{order?.user?.username}</TableCell>
//                 <TableCell>{order?.user?.email}</TableCell>
//                 <TableCell>{order?.user?.phone}</TableCell>
//                 <TableCell>{order?.items?.length}</TableCell>
//                 <TableCell>₹{order?.amount}</TableCell>
//                 <TableCell>{order?.status}</TableCell>
//                 <TableCell align="center">
//                   <Button
//                     variant="contained"
//                     size="small"
//                     sx={{ gap: 1 }}
//                     onClick={() => handleViewProduct(order?.items)}
//                   >
//                     <VisibilityIcon />
//                     View
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <div className="flex justify-center mt-4">
//         <Pagination
//           count={totalPages}
//           page={page}
//           onChange={(e, val) => setPage(val)}
//           color="primary"
//         />
//       </div>

//       {viewProduct && (
//         <OrderDetailsModal
//           open={!!viewProduct}
//           onClose={handleCloseViewModal}
//           items={viewProduct}
//         />
//       )}
//     </div>
//   );
// }





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
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, updateOrderStatus } from "@/store/slices/admin/adminOrderSlice";
import OrderDetailsModal from "@/app/components/admin/OrderDetailsModal";

export default function AdminOrdersPage() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [viewOrder, setViewOrder] = useState(null);
  const { orders, loading, updateLoading } = useSelector((state) => state.adminOrder);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Sort orders: Pending first, then others, Delivered last
  const sortedOrders = [...orders].sort((a, b) => {
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

  const handleMarkAsCompleted = async (orderId) => {
    await dispatch(updateOrderStatus({ orderId, status: "Delivered" }));
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: "warning",
      Processing: "info",
      Shipped: "primary",
      Delivered: "success",
      Cancelled: "error",
    };
    return colors[status] || "default";
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

              return (
                <TableRow key={order._id}>
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
                      color={getStatusColor(order?.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <div className="flex gap-2 justify-center">
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ gap: 1 }}
                        onClick={() => handleViewOrder(order)}
                      >
                        <VisibilityIcon />
                        View
                      </Button>
                      {order?.status !== "Delivered" && order?.status !== "Cancelled" && (
                        <Button
                          variant="contained"
                          size="small"
                          color="success"
                          sx={{ gap: 1 }}
                          onClick={() => handleMarkAsCompleted(order._id)}
                          disabled={updateLoading}
                        >
                          <CheckCircleIcon />
                          Mark Complete
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