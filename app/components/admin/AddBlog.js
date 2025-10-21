"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import Image from "next/image";

export default function AddBlogModal({ open, handleClose, handleSave }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    innerImage: "",
    type: "", // News or Blogs
  });
  const [coverPreview, setCoverPreview] = useState(null);
  const [innerPreview, setInnerPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const uploadImage = async (file) => {
    if (!file) return null;
    const data = new FormData();
    data.append("file", file);
    try {
      const response = await axios.post("/api/upload", data);
      return response.data.url;
    } catch (err) {
      console.error("Image upload failed", err);
      return null;
    }
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadedUrl = await uploadImage(file);
    if (!uploadedUrl) return;

    setFormData((prev) => ({ ...prev, [type]: uploadedUrl }));

    if (type === "coverImage") setCoverPreview(URL.createObjectURL(file));
    if (type === "innerImage") setInnerPreview(URL.createObjectURL(file));
  };

  const validateForm = () => {
    const requiredFields = ["title", "slug", "excerpt", "content", "type"];
    for (const key of requiredFields) {
      if (!formData[key] || formData[key].trim() === "") return false;
    }
    // Exactly 2 images required
    if (!formData.coverImage || !formData.innerImage) return false;
    return true;
  };

  const onSubmit = async () => {
    if (!validateForm()) {
      alert("Please fill all fields and upload both images before submitting.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/admin/blogs", formData);

      if (res.data.success) {
        alert("Blog created successfully!");
        handleSave(res.data.data);
        handleClose();
        setFormData({
          title: "",
          slug: "",
          excerpt: "",
          content: "",
          coverImage: "",
          innerImage: "",
          type: "",
        });
        setCoverPreview(null);
        setInnerPreview(null);
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

        <FormControl fullWidth required>
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            name="type"
            value={formData.type}
            onChange={handleChange}
            label="Type"
          >
            <MenuItem value="News">News</MenuItem>
            <MenuItem value="Blogs">Blogs</MenuItem>
          </Select>
        </FormControl>

        <div className="flex gap-4">
          {/* Cover Image */}
          <div>
            <p className="text-sm font-medium mb-1">Cover Image</p>
            <input
              type="file"
              accept="image/*"
              id="coverImageUpload"
              style={{ display: "none" }}
              onChange={(e) => handleFileUpload(e, "coverImage")}
            />
            <label htmlFor="coverImageUpload">
              <Button variant="outlined" component="span">Upload Cover</Button>
            </label>
            {coverPreview && (
              <div className="mt-2">
                <Image
                  src={coverPreview}
                  width={100}
                  height={100}
                  alt="Cover Preview"
                  className="w-40 h-40 object-cover rounded-md border"
                />
              </div>
            )}
          </div>

          {/* Inner Image */}
          <div>
            <p className="text-sm font-medium mb-1">Inner Image</p>
            <input
              type="file"
              accept="image/*"
              id="innerImageUpload"
              style={{ display: "none" }}
              onChange={(e) => handleFileUpload(e, "innerImage")}
            />
            <label htmlFor="innerImageUpload">
              <Button variant="outlined" component="span">Upload Inner</Button>
            </label>
            {innerPreview && (
              <div className="mt-2">
                <Image
                  src={innerPreview}
                  width={100}
                  height={100}
                  alt="Inner Preview"
                  className="w-40 h-40 object-cover rounded-md border"
                />
              </div>
            )}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onSubmit} variant="contained" color="primary" disabled={loading}>
          {loading ? "Saving..." : "Save Blog"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
