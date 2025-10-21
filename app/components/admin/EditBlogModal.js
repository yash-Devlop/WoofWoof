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
  const [coverPreview, setCoverPreview] = useState(null);
  const [innerPreview, setInnerPreview] = useState(null);
  const [selectedCoverFile, setSelectedCoverFile] = useState(null);
  const [selectedInnerFile, setSelectedInnerFile] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    innerImage: "",
    type: "",
  });

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        slug: blog.slug || "",
        excerpt: blog.excerpt || "",
        content: blog.content || "",
        coverImage: blog.coverImage || "",
        innerImage: blog.innerImage || "",
        type: blog.type || "",
      });
      setCoverPreview(blog.coverImage || null);
      setInnerPreview(blog.innerImage || null);
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
      const res = await axios.post("/api/upload", data);
      return res.data.url;
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

    if (type === "coverImage") {
      setSelectedCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
    if (type === "innerImage") {
      setSelectedInnerFile(file);
      setInnerPreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const requiredFields = ["title", "slug", "excerpt", "content", "type"];
    for (const key of requiredFields) {
      if (!formData[key] || formData[key].trim() === "") return false;
    }
    // Ensure both images are uploaded
    if (!formData.coverImage || !formData.innerImage) return false;
    return true;
  };

  const onSubmit = async () => {
    if (!validateForm()) {
      alert("Please fill all fields and upload both images before saving.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(`/api/admin/blogs/${blog._id}`, formData);

      if (res.data.success) {
        alert("✅ Blog updated successfully!");
        handleUpdate(res.data.data);
        handleClose();
      } else {
        alert("❌ Failed to update blog: " + res.data.message);
      }
    } catch (err) {
      console.error("Error updating blog:", err);
      alert("❌ Something went wrong while updating the blog.");
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
              style={{ display: "none" }}
              id="editCoverImageUpload"
              onChange={(e) => handleFileUpload(e, "coverImage")}
            />
            <label htmlFor="editCoverImageUpload">
              <Button variant="outlined" component="span">
                Change Cover
              </Button>
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
              style={{ display: "none" }}
              id="editInnerImageUpload"
              onChange={(e) => handleFileUpload(e, "innerImage")}
            />
            <label htmlFor="editInnerImageUpload">
              <Button variant="outlined" component="span">
                Change Inner
              </Button>
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
