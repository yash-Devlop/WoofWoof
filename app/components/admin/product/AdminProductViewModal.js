"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { useState } from "react";

export default function AdminProductViewModal({ open, onClose, product }) {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!product) return null;

  return (
    <>
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
            <strong>Stock:</strong>{" "}
            <span
              className={
                product?.inStock ? "text-green-600" : "text-red-400"
              }
            >
              {product?.inStock ? "IN STOCK" : "OUT"}
            </span>
          </Typography>
          <Typography variant="subtitle1">
            <strong>Best selling:</strong>{" "}
            <span
              className={
                product?.isBestSelling ? "text-green-600" : "text-red-400"
              }
            >
              {product?.isBestSelling ? "IN" : "OUT"}
            </span>
          </Typography>
          <Divider sx={{ my: 1 }} />

          <Typography variant="subtitle1">
            <strong>Description:</strong>
          </Typography>
          {product.description ? (
            <>
              <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                <strong>Additional Details:</strong>{" "}
                {product.description.additionalDetails || "N/A"}
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                <strong>Core Instruction:</strong>{" "}
                {product.description.coreInstruction || "N/A"}
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                <strong>Detailed Info:</strong>{" "}
                {product.description.detailedInfo || "N/A"}
              </Typography>
            </>
          ) : (
            <Typography variant="body2">No description</Typography>
          )}

          {/* Colors */}
          {product.colors?.length > 0 && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1">
                <strong>Colors:</strong>
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                {product.colors.map((color, idx) => (
                  <Box
                    key={idx}
                    display="flex"
                    alignItems="center"
                    gap={0.5}
                    px={1}
                    py={0.5}
                    border="1px solid #ccc"
                    borderRadius={1}
                  >
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        backgroundColor: color.code || "#000",
                        border: "1px solid #ccc",
                      }}
                    />
                    <Typography variant="body2">{color.name}</Typography>
                  </Box>
                ))}
              </Box>
            </>
          )}

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1">
                <strong>Sizes:</strong>
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                {product.sizes.map((size, idx) => (
                  <Box
                    key={idx}
                    px={1.5}
                    py={0.5}
                    bgcolor="#f0f0f0"
                    borderRadius={1}
                    border="1px solid #ccc"
                  >
                    <Typography variant="body2">{size}</Typography>
                  </Box>
                ))}
              </Box>
            </>
          )}

          {/* Images */}
          {product.images?.length > 0 && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1">
                <strong>Images:</strong>
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                {product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.url}
                    alt={img.altText || "Product Image"}
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      borderRadius: 6,
                      border: "1px solid #ccc",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedImage(`/${img.url}`)}
                  />
                ))}
              </Box>
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Preview Dialog */}
      <Dialog
        open={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Image Preview</DialogTitle>
        <DialogContent dividers sx={{ textAlign: "center" }}>
          <img
            src={selectedImage}
            alt="Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "80vh",
              objectFit: "contain",
              borderRadius: 8,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedImage(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
