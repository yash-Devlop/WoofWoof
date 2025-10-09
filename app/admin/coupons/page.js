"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCoupons, deleteCoupon } from "@/store/slices/admin/adminCouponSlice";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
import Swal from "sweetalert2";
import AdminAddCouponModal from "@/app/components/admin/coupon/AdminAddCouponModal";
import EditCouponModal from "@/app/components/admin/coupon/AdminEditCouponModal";

export default function AdminCouponsPage() {
  const dispatch = useDispatch();
  const { coupons = [], loading = false } = useSelector(
    (state) => state.adminCoupons || {}
  );

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    dispatch(fetchAllCoupons());
  }, [dispatch]);

  const paginatedCoupons = coupons.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const totalPages = Math.ceil(coupons.length / rowsPerPage);

  const handleDeleteCoupon = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the coupon permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCoupon(id))
          .then(() => {
            Swal.fire("Deleted!", "Coupon has been deleted.", "success");
            dispatch(fetchAllCoupons());
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete coupon.", "error");
          });
      }
    });
  };

  const handleOpenEditModal = (coupon) => {
    console.log("Opening modal for coupon:", coupon._id); // debug
    console.log(coupon)
    setSelectedCoupon(coupon);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedCoupon(null);
    setEditModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4 px-2">
        <h1 className="text-2xl font-bold">All Coupons</h1>
        <Button
          variant="contained"
          size="small"
          onClick={() => setAddModalOpen(true)}
          sx={{ gap: 1 }}
        >
          <AddIcon />
          Add Coupon
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Discount</strong></TableCell>
                <TableCell><strong>Threshold</strong></TableCell>
                <TableCell><strong>Usage Limit</strong></TableCell>
                <TableCell><strong>Valid From</strong></TableCell>
                <TableCell><strong>Valid Till</strong></TableCell>
                <TableCell><strong>Active</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCoupons.map((coupon) => (
                <TableRow key={coupon._id}>
                  <TableCell>{coupon.name}</TableCell>
                  <TableCell>{coupon.discount}</TableCell>
                  <TableCell>₹{coupon.thresholdAmount}</TableCell>
                  <TableCell>{coupon.usageLimit}</TableCell>
                  <TableCell>{new Date(coupon.validFrom).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(coupon.validTill).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <p className={coupon.isActive ? "text-green-600 font-bold" : "text-red-400 font-bold"}>
                      {coupon.isActive ? "YES" : "NO"}
                    </p>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleOpenEditModal(coupon)}
                      sx={{ mr: 1, gap: 1 }}
                    >
                      <EditIcon />
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteCoupon(coupon._id)}
                      sx={{ mr: 1, gap: 1 }}
                    >
                      <DeleteIcon />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <div className="flex justify-center mt-4">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, val) => setPage(val)}
          color="primary"
        />
      </div>

      {/* Modals */}
      <AdminAddCouponModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
      />
      {selectedCoupon && (
        <EditCouponModal
          open={editModalOpen}
          onClose={handleCloseEditModal}
          coupon={selectedCoupon}
        />

      )}
    </div>
  );
}
