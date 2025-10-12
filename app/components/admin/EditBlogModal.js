"use client";
import React, { useState, useEffect } from "react";
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

export default function EditBlogModal({
  open,
  handleClose,
  blog,
  handleUpdate,
}) {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    type: "", // ✅ added type field
  });

  // Pre-fill form when modal opens
  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        slug: blog.slug || "",
        excerpt: blog.excerpt || "",
        content: blog.content || "",
        coverImage: blog.coverImage || "",
        type: blog.type || "", // ✅ prefill type
      });
      setPreview(blog.coverImage || null);
    }
  }, [blog]);

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
      const result = response.data;
      return result.url; // e.g. /uploads/16930012345-myimg.png
    } catch (err) {
      console.error("Image upload failed", err);
      return null;
    }
  };

  const onSubmit = async () => {
    // Validate required fields
    if (
      !formData.title.trim() ||
      !formData.slug.trim() ||
      !formData.content.trim() ||
      !formData.excerpt.trim() ||
      !formData.coverImage.trim() ||
      !formData.type.trim()
    ) {
      alert("Please fill all required fields including Type.");
      return;
    }

    let imageUrl = formData.coverImage;

    if (selectedFile) {
      const uploadedUrl = await uploadImage(selectedFile);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      }
    }

    try {
      setLoading(true);
      const res = await axios.put(`/api/admin/blogs/${blog._id}`, {
        ...formData,
        coverImage: imageUrl,
      });

      if (res.data.success) {
        alert("✅ Blog updated successfully!");
        handleUpdate(res.data.data); // Update parent list
        handleClose();
      } else {
        alert("Failed to update blog: " + res.data.message);
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Something went wrong while updating the blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Blog</DialogTitle>
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

        {/* ✅ Select Type (Required) */}
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

        <div>
          <p className="text-sm font-medium mb-1">Cover Image</p>

          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            id="editCoverImageUpload"
            style={{ display: "none" }}
            onChange={async (e) => {
              const file = e.target.files[0];
              if (file) {
                setSelectedFile(file);
                setPreview(URL.createObjectURL(file));
                const uploadedUrl = await uploadImage(file);
                if (uploadedUrl) {
                  setFormData((prev) => ({ ...prev, coverImage: uploadedUrl }));
                }
              }
            }}
          />

          {/* Upload button */}
          <label htmlFor="editCoverImageUpload">
            <Button variant="outlined" component="span">
              Change Image
            </Button>
          </label>

          {/* Preview */}
          {preview && (
            <div className="mt-3">
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
        <Button
          onClick={onSubmit}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
