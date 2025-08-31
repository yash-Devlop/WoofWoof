"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Typography,
  Button,
  Box,
  Divider,
} from "@mui/material";
import Image from "next/image";

export default function ViewBlogModal({ open, handleClose, blog }) {
  if (!blog) return null; // prevent rendering if no blog

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        <strong>Blog Details</strong>
      </DialogTitle>

      <DialogContent dividers>
        {/* Cover Image */}
        {blog.coverImage && (
          <Box display="flex" justifyContent="center" mb={3}>
            <Image
              src={blog.coverImage}
              alt={blog.title}
              width={500}
              height={300}
              style={{
                borderRadius: "8px",
                objectFit: "cover",
                border: "1px solid #e0e0e0",
              }}
            />
          </Box>
        )}

        {/* Title + Slug */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {blog.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Slug:</strong> {blog.slug}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Excerpt */}
        <Typography variant="subtitle1" fontWeight="500">
          <strong>Excerpt:</strong>
        </Typography>
        <Typography variant="body1" paragraph>
          {blog.excerpt}
        </Typography>

        {/* Content */}
        <Typography variant="subtitle1" fontWeight="500">
          <strong>Content:</strong>
        </Typography>
        <Typography variant="body1" sx={{ whiteSpace: "pre-line" }} paragraph>
          {blog.content}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Meta Info */}
        <Typography variant="caption" color="text.secondary" display="block">
          <strong>Created At:</strong>{" "}
          {new Date(blog.createdAt).toLocaleString()}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block">
          <strong>Updated At:</strong>{" "}
          {new Date(blog.updatedAt).toLocaleString()}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
