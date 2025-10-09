"use client";
import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { updateCoupon } from "@/store/slices/admin/adminCouponSlice";
import toast from "react-hot-toast";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const EditCouponModal = ({ open, onClose, coupon }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    discount: "",
    thresholdAmount: "",
    usageLimit: "",
    validFrom: null,
    validTill: null,
    isActive: true,
  });

  // Populate form when coupon changes
  useEffect(() => {
    if (coupon) {
      setFormData({
        name: coupon.name || "",
        discount: coupon.discount || "",
        thresholdAmount: coupon.thresholdAmount || "",
        usageLimit: coupon.usageLimit || "",
        validFrom: coupon.validFrom ? dayjs(coupon.validFrom) : null,
        validTill: coupon.validTill ? dayjs(coupon.validTill) : null,
        isActive: coupon.isActive ?? true,
      });
    }
  }, [coupon]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convert ACTIVE/INACTIVE to true/false for isActive
    if (name === "isActive") {
      setFormData((prev) => ({ ...prev, isActive: value === "ACTIVE" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      _id: coupon._id,
      validFrom: formData.validFrom?.toISOString(),
      validTill: formData.validTill?.toISOString(),
    };

    try {
      await dispatch(updateCoupon(payload)).unwrap();
      toast.success("Coupon updated successfully");
      onClose();
    } catch (err) {
      toast.error(err?.message || "Failed to update coupon");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 4,
        }}
      >
        <Typography variant="h6" mb={2}>
          Edit Coupon
        </Typography>

        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Discount (%)"
          name="discount"
          type="number"
          value={formData.discount}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Threshold Amount"
          name="thresholdAmount"
          type="number"
          value={formData.thresholdAmount}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Usage Limit"
          name="usageLimit"
          type="number"
          value={formData.usageLimit}
          onChange={handleChange}
          margin="normal"
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Valid From"
            value={formData.validFrom}
            onChange={(date) => handleDateChange("validFrom", date)}
            slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
          />
          <DatePicker
            label="Valid Till"
            value={formData.validTill}
            onChange={(date) => handleDateChange("validTill", date)}
            slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
          />
        </LocalizationProvider>

        {/* Active select dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="active-label">Active</InputLabel>
          <Select
            labelId="active-label"
            name="isActive"
            value={formData.isActive ? "ACTIVE" : "INACTIVE"}
            label="Active"
            onChange={handleChange}
          >
            <MenuItem value="ACTIVE">ACTIVE</MenuItem>
            <MenuItem value="INACTIVE">INACTIVE</MenuItem>
          </Select>
        </FormControl>

        <Box mt={2} display="flex" justifyContent="space-between">
          <Button color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Update Coupon
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditCouponModal;
