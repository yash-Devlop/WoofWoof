"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import Image from "next/image";

export default function AddBlogModal({ open, handleClose, handleSave }) {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    // check if any field is empty
    for (const key in formData) {
      if (!formData[key] || formData[key].trim() === "") {
        return false;
      }
    }
    return true;
  };

  const uploadImage = async (file) => {
    if (!file) return null;

    const data = new FormData();
    data.append("file", file);

    try {
      const response = await axios.post("/api/upload", data);
      const result = response.data;
      return result.url; // e.g. /uploads/16930012345-myimg.png
    } catch (err) {
      console.error("Image upload failed", err);
      return null;
    }
  };

  const onSubmit = async () => {
    if (!validateForm()) {
      alert("Please fill all the fields before submitting.");
      return;
    }

    const blog = {
      ...formData,
    };

    try {
      setLoading(true);
      const res = await axios.post("/api/admin/blogs", blog);

      if (res.data.success) {
        alert("✅ Blog created successfully!");
        handleSave(res.data.data); // optional: update state from API response
        handleClose();

        // reset state
        setFormData({
          title: "",
          slug: "",
          excerpt: "",
          content: "",
          coverImage: "",
        });
        setSelectedFile(null);
        setPreview(null);
      } else {
        alert("❌ Failed to create blog: " + res.data.message);
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("❌ Something went wrong while creating the blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Add New Blog</DialogTitle>
      <DialogContent className="flex flex-col gap-4 mt-2">
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Slug (URL-friendly)"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
        />
        <TextField
          label="Content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          fullWidth
          multiline
          rows={6}
        />
        <div>
          <p className="text-sm font-medium mb-1">Cover Image</p>

          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            id="coverImageUpload"
            style={{ display: "none" }}
            onChange={async (e) => {
              const file = e.target.files[0];
              if (file) {
                setSelectedFile(file);
                setPreview(URL.createObjectURL(file));

                // ✅ Upload immediately
                const uploadedUrl = await uploadImage(file);
                if (uploadedUrl) {
                  setFormData((prev) => ({ ...prev, coverImage: uploadedUrl }));
                }
              }
            }}
          />

          {/* Button to trigger file input */}
          <label htmlFor="coverImageUpload">
            <Button variant="outlined" component="span">
              Upload Image
            </Button>
          </label>

          {/* Preview */}
          {preview && (
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-1">Preview:</p>
              <Image
                src={preview}
                width={100}
                height={100}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-md border"
              />
            </div>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onSubmit} variant="contained" color="primary">
          Save Blog
        </Button>
      </DialogActions>
    </Dialog>
  );
}
