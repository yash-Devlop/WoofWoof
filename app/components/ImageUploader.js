"use client";
import React from "react";
import { Box, Button, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

const ImageUploader = ({ images, setImages }) => {
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.slice(0, 6 - images.length);

    if (images.length + validFiles.length > 6) {
      alert("You can upload a maximum of 6 images.");
      return;
    }

    setImages([...images, ...validFiles]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <Box mt={2}>
      <Button
        component="label"
        variant="outlined"
        startIcon={<CloudUploadIcon />}
      >
        Upload Images
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
      </Button>

      <Box display="flex" gap={2} mt={2} overflow="auto">
        {images.map((img, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              width: 100,
              height: 100,
              border: "1px solid #ccc",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <img
              src={URL.createObjectURL(img)}
              alt={`img-${index}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <IconButton
              size="small"
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                background: "#fff",
              }}
              onClick={() => handleRemoveImage(index)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ImageUploader;
