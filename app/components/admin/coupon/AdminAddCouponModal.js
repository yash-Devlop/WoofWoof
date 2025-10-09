// Backend model fields:
// name, discount, thresholdAmount, usageLimit, validFrom, validTill, isActive

"use client";
import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { createCoupon, updateCoupon, fetchAllCoupons } from "@/store/slices/admin/adminCouponSlice";

const AdminCouponModal = ({ open, onClose, coupon }) => {
  const dispatch = useDispatch();

  const [couponData, setCouponData] = useState({
    name: "",
    discount: "",
    thresholdAmount: "",
    usageLimit: "",
    validFrom: "",
    validTill: "",
    isActive: true,
  });

  // Preload coupon data for edit
  useEffect(() => {
    if (coupon) {
      setCouponData({
        name: coupon.name || "",
        discount: coupon.discount || "",
        thresholdAmount: coupon.thresholdAmount || "",
        usageLimit: coupon.usageLimit || "",
        validFrom: coupon.validFrom ? new Date(coupon.validFrom).toISOString().split("T")[0] : "",
        validTill: coupon.validTill ? new Date(coupon.validTill).toISOString().split("T")[0] : "",
        isActive: coupon.isActive ?? true,
      });
    }
  }, [coupon]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCouponData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { name, discount, thresholdAmount, usageLimit, validFrom, validTill } = couponData;

    if (!name || !discount || !thresholdAmount || !usageLimit || !validFrom || !validTill) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      if (coupon?._id) {
        // Edit coupon
        await dispatch(updateCoupon({ ...couponData, _id: coupon._id })).unwrap();
        toast.success("Coupon updated successfully!");
      } else {
        // Add coupon
        await dispatch(createCoupon(couponData)).unwrap();
        toast.success("Coupon created successfully!");
      }
      dispatch(fetchAllCoupons());
      onClose();
    } catch (error) {
      toast.error(error?.message || "Failed to save coupon.");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
          bgcolor: "background.paper",
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" mb={2}>
          {coupon ? "Edit Coupon" : "Create Coupon"}
        </Typography>

        <TextField
          fullWidth
          label="Coupon Name"
          name="name"
          value={couponData.name}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Discount (%)"
          name="discount"
          value={couponData.discount}
          onChange={handleInputChange}
          type="number"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Threshold Amount (₹)"
          name="thresholdAmount"
          value={couponData.thresholdAmount}
          onChange={handleInputChange}
          type="number"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Usage Limit"
          name="usageLimit"
          value={couponData.usageLimit}
          onChange={handleInputChange}
          type="number"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Valid From"
          name="validFrom"
          value={couponData.validFrom}
          onChange={handleInputChange}
          type="date"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          fullWidth
          label="Valid Till"
          name="validTill"
          value={couponData.validTill}
          onChange={handleInputChange}
          type="date"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            name="isActive"
            value={couponData.isActive ? "active" : "inactive"}
            onChange={(e) => setCouponData(prev => ({ ...prev, isActive: e.target.value === "active" }))}
            label="Status"
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>

        <Box mt={3} display="flex" justifyContent="space-between">
          <Button color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {coupon ? "Update Coupon" : "Create Coupon"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AdminCouponModal;
