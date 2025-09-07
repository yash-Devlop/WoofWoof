// components/WriteReviewModal.jsx
"use client";
import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Rating,
  Button,
} from "@mui/material";

export default function WriteReviewModal({
  open,
  onClose,
  rating,
  setRating,
  reviewText,
  setReviewText,
  onSubmit,
  isLoading,
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 350,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 4,
        }}
      >
        <div className=" flex flex-col justify-center items-center w-full">
          <Typography variant="h5" component="h2" mb={1}>
            Leave a Review for Product
          </Typography>
          <Typography>How would you rate the Product?</Typography>
          <Rating
            name="modal-rating"
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
          />
        </div>

        <TextField
          fullWidth
          multiline
          rows={4}
          margin="normal"
          label="Write a review..."
          variant="outlined"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={onSubmit}
          sx={{
            backgroundColor: "#F91F54",
            borderRadius: "18px",
          }}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit Review"}
        </Button>

        <div className=" mt-4 text-sm">
          All reviews on Wed My Pet are verified within 48 hours before posting
          to ensure authenticity and accuracy.
        </div>
      </Box>
    </Modal>
  );
}
