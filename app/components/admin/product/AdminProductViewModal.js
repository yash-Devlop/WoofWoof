"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
} from "@mui/material";

export default function AdminProductViewModal({ open, onClose, product }) {
  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>View Product Details</DialogTitle>
      <DialogContent dividers>
        <Typography variant="subtitle1">
          <strong>Name:</strong> {product.name}
        </Typography>
        <Divider sx={{ my: 1 }} />

        <Typography variant="subtitle1">
          <strong>Category:</strong> {product.Category?.name || "N/A"}
        </Typography>
        <Divider sx={{ my: 1 }} />

        <Typography variant="subtitle1">
          <strong>Price:</strong> ₹{product.price}
        </Typography>
        <Divider sx={{ my: 1 }} />

        <Typography variant="subtitle1">
          <strong>Stock:</strong> {product.popularity}
        </Typography>
        <Divider sx={{ my: 1 }} />

        <Typography variant="subtitle1">
          <strong>Description:</strong>
        </Typography>
        <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
          {product.description || "No description"}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
