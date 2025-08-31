// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   IconButton,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Switch,
//   Pagination,
// } from "@mui/material";
// import { Edit, Delete } from "@mui/icons-material";
// import AddBlogModal from "@/app/components/admin/AddBlog";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import ViewBlogModal from "@/app/components/admin/ViewBlogModal";
// import EditBlogModal from "@/app/components/admin/EditBlogModal";

// export default function BlogsPage() {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openAdd, setOpenAdd] = useState(false);
//   const [openView, setOpenView] = useState(false);
//   const [selectedBlog, setSelectedBlog] = useState(null);

//   // Pagination state
//   const [page, setPage] = useState(1);
//   const rowsPerPage = 5;

//   // Modal states
//   const [open, setOpen] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({
//     id: "",
//     title: "",
//     author: "",
//     published: true,
//   });

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get("/api/admin/blogs");
//         setBlogs(response.data.data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this blog?")) return;

//     try {
//       const res = await axios.delete(`/api/admin/blogs/${id}`);

//       if (res.data.success) {
//         setBlogs((prev) => prev.filter((b) => b._id !== id));
//         alert("Blog deleted successfully ✅");
//       } else {
//         alert(res.data.message || "Failed to delete blog");
//       }
//     } catch (error) {
//       console.error("Delete error:", error);
//       alert("Something went wrong while deleting");
//     }
//   };

//   const handleOpen = (blog) => {
//     if (blog) {
//       setEditMode(true);
//       setFormData(blog);
//     } else {
//       setEditMode(false);
//       setFormData({ id: "", title: "", author: "", published: true });
//     }
//     setOpen(true);
//   };

//   const handleClose = () => setOpen(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleTogglePublished = () => {
//     setFormData((prev) => ({ ...prev, published: !prev.published }));
//   };

//   const handleSubmit = () => {
//     if (editMode) {
//       // Update blog
//       setBlogs((prev) =>
//         prev.map((b) => (b.id === formData.id ? formData : b))
//       );
//     } else {
//       // Add new blog
//       const newBlog = { ...formData, id: Date.now().toString() };
//       setBlogs((prev) => [newBlog, ...prev]);
//     }
//     handleClose();
//   };

//   // Pagination logic
//   const totalPages = Math.ceil(blogs.length / rowsPerPage);
//   const paginatedBlogs = blogs.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );

//   const handleSaveBlog = (newBlog) => {
//     setBlogs((prev) => [{ ...newBlog, id: Date.now().toString() }, ...prev]);
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Blogs</h1>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => setOpenAdd(true)}
//         >
//           Add Blog
//         </Button>
//       </div>

//       {loading ? (
//         <div>Loading...</div>
//       ) : blogs.length === 0 ? (
//         <div>No blogs found.</div>
//       ) : (
//         <>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>
//                     <strong>Title</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>Published Date</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>Actions</strong>
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {paginatedBlogs.map((blog) => (
//                   <TableRow key={blog._id}>
//                     <TableCell>{blog.title}</TableCell>
//                     <TableCell align="center">
//                       {new Date(blog.createdAt).toLocaleDateString("en-GB", {
//                         day: "2-digit",
//                         month: "2-digit",
//                         year: "2-digit",
//                       })}
//                     </TableCell>
//                     <TableCell align="center">
//                       <IconButton
//                         color="primary"
//                         onClick={() => {
//                           setSelectedBlog(blog);
//                           setOpenView(true);
//                         }}
//                       >
//                         <VisibilityIcon />
//                       </IconButton>
//                       <IconButton
//                         color="primary"
//                         onClick={() => handleOpen(blog)}
//                       >
//                         <Edit />
//                       </IconButton>
//                       <IconButton
//                         color="error"
//                         onClick={() => handleDelete(blog._id)}
//                       >
//                         <Delete />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* Pagination */}
//           <div className="flex justify-center mt-4">
//             <Pagination
//               count={totalPages}
//               page={page}
//               onChange={(_, value) => setPage(value)}
//               color="primary"
//             />
//           </div>
//         </>
//       )}

//       {/* Add/Edit Blog Dialog */}
//       <Dialog open={open} onClose={handleClose} fullWidth>
//         <DialogTitle>{editMode ? "Edit Blog" : "Add Blog"}</DialogTitle>
//         <DialogContent className="flex flex-col gap-4 mt-2">
//           <TextField
//             label="Title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             label="Author"
//             name="author"
//             value={formData.author}
//             onChange={handleChange}
//             fullWidth
//           />
//           <div className="flex items-center gap-2 mt-3">
//             <span>Published:</span>
//             <Switch
//               checked={formData.published}
//               onChange={handleTogglePublished}
//             />
//           </div>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleSubmit} variant="contained" color="primary">
//             {editMode ? "Update" : "Add"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <AddBlogModal
//         open={openAdd}
//         handleClose={() => setOpenAdd(false)}
//         handleSave={handleSaveBlog}
//       />
//       {selectedBlog && (
//         <ViewBlogModal
//           open={openView}
//           handleClose={() => {
//             setOpenView(false);
//             setSelectedBlog(null);
//           }}
//           blog={selectedBlog}
//         />
//       )}
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Pagination,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import AddBlogModal from "@/app/components/admin/AddBlog";
import EditBlogModal from "@/app/components/admin/EditBlogModal";
import ViewBlogModal from "@/app/components/admin/ViewBlogModal";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);

  const [selectedBlog, setSelectedBlog] = useState(null);

  // Pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/admin/blogs");
        setBlogs(response.data.data || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await axios.delete(`/api/admin/blogs/${id}`);

      if (res.data.success) {
        setBlogs((prev) => prev.filter((b) => b._id !== id));
        alert("Blog deleted successfully ✅");
      } else {
        alert(res.data.message || "Failed to delete blog");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong while deleting");
    }
  };

  const handleSaveBlog = (newBlog) => {
    setBlogs((prev) => [newBlog, ...prev]);
  };

  const handleUpdateBlog = (updatedBlog) => {
    setBlogs((prev) =>
      prev.map((b) => (b._id === updatedBlog._id ? updatedBlog : b))
    );
  };

  // Pagination logic
  const totalPages = Math.ceil(blogs.length / rowsPerPage);
  const paginatedBlogs = blogs.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blogs</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenAdd(true)}
        >
          Add Blog
        </Button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : blogs.length === 0 ? (
        <div>No blogs found.</div>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Title</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Published Date</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Actions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedBlogs.map((blog) => (
                  <TableRow key={blog._id}>
                    <TableCell>{blog.title}</TableCell>
                    <TableCell align="center">
                      {new Date(blog.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      })}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setSelectedBlog(blog);
                          setOpenView(true);
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setSelectedBlog(blog);
                          setOpenEdit(true);
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(blog._id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
            />
          </div>
        </>
      )}

      {/* Add Blog */}
      <AddBlogModal
        open={openAdd}
        handleClose={() => setOpenAdd(false)}
        handleSave={handleSaveBlog}
      />

      {/* Edit Blog */}
      {selectedBlog && (
        <EditBlogModal
          open={openEdit}
          handleClose={() => {
            setOpenEdit(false);
            setSelectedBlog(null);
          }}
          blog={selectedBlog}
          handleUpdate={handleUpdateBlog}
        />
      )}

      {/* View Blog */}
      {selectedBlog && (
        <ViewBlogModal
          open={openView}
          handleClose={() => {
            setOpenView(false);
            setSelectedBlog(null);
          }}
          blog={selectedBlog}
        />
      )}
    </div>
  );
}
