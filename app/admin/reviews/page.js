// "use client";
// import { useEffect, useState } from "react";
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
//   Modal,
//   Box,
//   Typography,
// } from "@mui/material";

// export default function AdminReviewsPage() {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedReview, setSelectedReview] = useState(null);

//   const fetchReviews = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("/api/admin/reviews");
//       setReviews(res.data.reviews || []);
//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this review?")) return;
//     try {
//       await axios.delete(`/api/admin/reviews?id=${id}`);
//       setReviews(reviews.filter((r) => r._id !== id));
//     } catch (error) {
//       console.error("Error deleting review:", error);
//     }
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   function formatDate(dateString) {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0"); // 08
//     const month = String(date.getMonth() + 1).padStart(2, "0"); // 08 (months are 0-indexed)
//     const year = String(date.getFullYear()).slice(-2); // 25

//     return `${day}/${month}/${year}`;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Manage Reviews</h1>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>
//                 <strong>Product Name</strong>
//               </TableCell>
//               <TableCell>
//                 <strong>User Name</strong>
//               </TableCell>
//               <TableCell>
//                 <strong>Review Post Date</strong>
//               </TableCell>
//               <TableCell align="center">
//                 <strong>Actions</strong>
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {reviews.map((review) => (
//               <TableRow key={review._id}>
//                 <TableCell>{review.product?.name || "Unknown"}</TableCell>
//                 <TableCell>{review.user?.username || "Anonymous"}</TableCell>
//                 <TableCell>
//                   Date:{" "}
//                   {new Date(review?.createdAt).toLocaleDateString("en-GB", {
//                     day: "2-digit",
//                     month: "short",
//                     year: "numeric",
//                   })}
//                 </TableCell>
//                 <TableCell align="center">
//                   <Button
//                     variant="contained"
//                     size="small"
//                     sx={{ mr: 1 }}
//                     onClick={() => setSelectedReview(review)}
//                   >
//                     View
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     size="small"
//                     color="error"
//                     onClick={() => handleDelete(review._id)}
//                   >
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Review Modal */}
//       <Modal
//         open={Boolean(selectedReview)}
//         onClose={() => setSelectedReview(null)}
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 400,
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 2,
//           }}
//         >
//           <Typography variant="h6" mb={2}>
//             Review Details
//           </Typography>
//           <Typography variant="subtitle1">
//             Product: {selectedReview?.product?.name || "Unknown"}
//           </Typography>
//           <Typography variant="subtitle1">
//             User: {selectedReview?.user?.username || "Anonymous"}
//           </Typography>
//           <Typography variant="subtitle1">
//             Email: {selectedReview?.user?.email || "Email not available"}
//           </Typography>
//           <Typography variant="subtitle2" mb={2}>
//             Date:{" "}
//             {new Date(selectedReview?.createdAt).toLocaleDateString("en-GB", {
//               day: "2-digit",
//               month: "short",
//               year: "numeric",
//             })}
//           </Typography>
//           <Typography variant="body1">
//             Review: {selectedReview?.comment}
//           </Typography>
//           <Button
//             variant="contained"
//             sx={{ mt: 2 }}
//             fullWidth
//             onClick={() => setSelectedReview(null)}
//           >
//             Close
//           </Button>
//         </Box>
//       </Modal>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
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
  Modal,
  Box,
  Typography,
  TextField,
} from "@mui/material";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [productFilter, setProductFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/admin/reviews", {
        params: {
          productName: productFilter,
          userName: userFilter,
        },
      });
      setReviews(res.data.reviews || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      await axios.delete(`/api/admin/reviews?id=${id}`);
      setReviews(reviews.filter((r) => r._id !== id));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productFilter, userFilter]); // refetch when filters change

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Reviews</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <TextField
          label="Search by Product Name"
          value={productFilter}
          onChange={(e) => setProductFilter(e.target.value)}
          size="small"
        />
        <TextField
          label="Search by User Name"
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
          size="small"
        />
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Product Name</strong>
              </TableCell>
              <TableCell>
                <strong>User Name</strong>
              </TableCell>
              <TableCell>
                <strong>Review Post Date</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review._id}>
                <TableCell>{review.product?.name || "Unknown"}</TableCell>
                <TableCell>{review.user?.username || "Anonymous"}</TableCell>
                <TableCell>{formatDate(review.createdAt)}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => setSelectedReview(review)}
                  >
                    View
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => handleDelete(review._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Review Modal */}
      <Modal
        open={Boolean(selectedReview)}
        onClose={() => setSelectedReview(null)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            Review Details
          </Typography>
          <Typography variant="subtitle1">
            Product: {selectedReview?.product?.name || "Unknown"}
          </Typography>
          <Typography variant="subtitle1">
            User: {selectedReview?.user?.username || "Anonymous"}
          </Typography>
          <Typography variant="subtitle1">
            Email: {selectedReview?.user?.email || "Email not available"}
          </Typography>
          <Typography variant="subtitle2" mb={2}>
            Date: {formatDate(selectedReview?.createdAt)}
          </Typography>
          <Typography variant="body1">
            Review: {selectedReview?.comment}
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            fullWidth
            onClick={() => setSelectedReview(null)}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
