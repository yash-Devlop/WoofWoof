// app/admin/testimonials/page.js
"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Pagination,
  Chip,
  Box,
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import TestimonialModal from "@/app/components/admin/TestimonialModal";
import Image from "next/image";

export default function AdminTestimonialsPage() {
  const [page, setPage] = useState(1);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/testimonial?all=true");
      if (!response.ok) throw new Error("Failed to fetch testimonials");
      const data = await response.json();
      setTestimonials(data.testimonials || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      alert("Error fetching testimonials");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (mode, testimonial = null) => {
    setModalMode(mode);
    setSelectedTestimonial(testimonial);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTestimonial(null);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      setDeleting(id);
      const response = await fetch(`/api/admin/testimonial?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      setTestimonials(testimonials.filter((t) => t._id !== id));
      alert("Testimonial deleted successfully");
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      alert("Error deleting testimonial");
    } finally {
      setDeleting(null);
    }
  };

  const rowsPerPage = 10;
  const paginatedTestimonials = testimonials.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const totalPages = Math.ceil(testimonials.length / rowsPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-6">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Testimonials Management</h1>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenModal("add")}
        >
          Add Testimonial
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Image</strong>
              </TableCell>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Role</strong>
              </TableCell>
              <TableCell>
                <strong>Message</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Rating</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Status</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTestimonials.map((testimonial) => (
              <TableRow key={testimonial._id}>
                <TableCell>
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                </TableCell>
                <TableCell>{testimonial.name}</TableCell>
                <TableCell>{testimonial.role}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {testimonial.message}
                </TableCell>
                <TableCell align="center">
                  <Box className="flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-xl">
                        {i < testimonial.stars ? "⭐" : "☆"}
                      </span>
                    ))}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={testimonial.isActive ? "Active" : "Inactive"}
                    color={testimonial.isActive ? "success" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <div className="flex gap-2 justify-center">
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<VisibilityIcon />}
                      onClick={() => handleOpenModal("view", testimonial)}
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="warning"
                      startIcon={<EditIcon />}
                      onClick={() => handleOpenModal("edit", testimonial)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(testimonial._id)}
                      disabled={deleting === testimonial._id}
                    >
                      {deleting === testimonial._id ? "..." : "Delete"}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="flex justify-center mt-4">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, val) => setPage(val)}
          color="primary"
        />
      </div>

      <TestimonialModal
        open={openModal}
        onClose={handleCloseModal}
        mode={modalMode}
        testimonial={selectedTestimonial}
        onSuccess={fetchTestimonials}
      />
    </div>
  );
}