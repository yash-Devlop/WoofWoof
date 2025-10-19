// @/components/admin/TestimonialModal.js
"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Alert,
  CircularProgress,
  Stack,
  Paper,
} from "@mui/material";
import Image from "next/image";

export default function TestimonialModal({
  open,
  onClose,
  mode = "add", // "add", "edit", "view"
  testimonial = null,
  onSuccess = () => {},
}) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    message: "",
    image: "",
    stars: 5,
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (open) {
      if (mode === "edit" || mode === "view") {
        setFormData({
          name: testimonial?.name || "",
          role: testimonial?.role || "",
          message: testimonial?.message || "",
          image: testimonial?.image || "",
          stars: testimonial?.stars || 5,
          isActive: testimonial?.isActive !== false,
        });
        setImagePreview(testimonial?.image || null);
      } else {
        setFormData({
          name: "",
          role: "",
          message: "",
          image: "",
          stars: 5,
          isActive: true,
        });
        setImagePreview(null);
      }
      setError(null);
    }
  }, [open, mode, testimonial]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleStarChange = (event, newValue) => {
    setFormData({ ...formData, stars: newValue });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!formData.role.trim()) {
      setError("Role is required");
      return false;
    }
    if (!formData.message.trim()) {
      setError("Message is required");
      return false;
    }
    if (!formData.image) {
      setError("Image is required");
      return false;
    }
    if (formData.stars < 1 || formData.stars > 5) {
      setError("Stars must be between 1 and 5");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const method = mode === "edit" ? "PATCH" : "POST";
      const body =
        mode === "edit"
          ? { id: testimonial._id, ...formData }
          : formData;

      const response = await fetch("/api/admin/testimonial", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save testimonial");
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error saving testimonial:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isViewMode = mode === "view";
  const isEditMode = mode === "edit";
  const isAddMode = mode === "add";

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "12px",
        }
      }}
    >
      <DialogTitle 
        sx={{
          fontSize: "1.5rem",
          fontWeight: "600",
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        {isAddMode && "➕ Add New Testimonial"}
        {isEditMode && "✏️ Edit Testimonial"}
        {isViewMode && "👁️ View Testimonial"}
      </DialogTitle>

      <DialogContent 
        sx={{
          padding: "28px",
          backgroundColor: "#ffffff",
        }}
      >
        <Stack spacing={3} sx={{ mt: 1 }}>
          {error && (
            <Alert 
              severity="error"
              sx={{
                borderRadius: "8px",
              }}
            >
              {error}
            </Alert>
          )}

          {/* Image Preview & Upload Section */}
          <Paper
            elevation={0}
            sx={{
              padding: "16px",
              backgroundColor: "#fafafa",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            {imagePreview && (
              <Box
                sx={{
                  position: "relative",
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "3px solid #e0e0e0",
                }}
              >
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={120}
                  height={120}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            )}

            {!isViewMode && (
              <TextField
                type="file"
                inputProps={{ accept: "image/*" }}
                fullWidth
                disabled={isViewMode}
                onChange={handleImageChange}
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#fff",
                  }
                }}
              />
            )}
          </Paper>

          {/* Name & Role Row */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              disabled={isViewMode}
              variant="outlined"
              size="small"
              placeholder="Enter name"
            />

            <TextField
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              fullWidth
              disabled={isViewMode}
              variant="outlined"
              size="small"
              placeholder="e.g., Pet Parent, Customer"
            />
          </Box>

          {/* Message */}
          <TextField
            label="Testimonial Message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            fullWidth
            disabled={isViewMode}
            variant="outlined"
            multiline
            rows={4}
            placeholder="Enter the testimonial message..."
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: isViewMode ? "#f5f5f5" : "#fff",
              }
            }}
          />

          {/* Rating & Active Status Row */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
              alignItems: "center",
            }}
          >
            {/* Stars Rating */}
            <Paper
              elevation={0}
              sx={{
                padding: "12px 16px",
                backgroundColor: "#fafafa",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <span 
                style={{ 
                  fontWeight: "500", 
                  fontSize: "0.95rem",
                  whiteSpace: "nowrap",
                }}
              >
                Rating:
              </span>
              <Rating
                value={formData.stars}
                onChange={handleStarChange}
                disabled={isViewMode}
                size="medium"
              />
              <span 
                style={{ 
                  fontSize: "0.85rem",
                  color: "#666",
                  marginLeft: "auto",
                }}
              >
                {formData.stars}/5
              </span>
            </Paper>

            {/* Active Status */}
            <Paper
              elevation={0}
              sx={{
                padding: "12px 16px",
                backgroundColor: "#fafafa",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    disabled={isViewMode}
                    size="small"
                  />
                }
                label={
                  <span style={{ fontSize: "0.95rem", fontWeight: "500" }}>
                    Active
                  </span>
                }
              />
            </Paper>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          padding: "16px 28px",
          backgroundColor: "#f5f5f5",
          borderTop: "1px solid #e0e0e0",
          gap: 1,
        }}
      >
        <Button 
          onClick={onClose} 
          disabled={loading}
          variant="outlined"
          sx={{
            textTransform: "none",
            fontWeight: "500",
          }}
        >
          {isViewMode ? "Close" : "Cancel"}
        </Button>
        {!isViewMode && (
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading}
            color="primary"
            sx={{
              textTransform: "none",
              fontWeight: "600",
              px: 3,
            }}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : isEditMode ? (
              "Update Testimonial"
            ) : (
              "Add Testimonial"
            )}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}