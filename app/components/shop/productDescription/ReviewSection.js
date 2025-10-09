// "use client";
// import React, { useState, useEffect } from "react";
// import WriteReviewModal from "./WriteReviewModal";
// import Image from "next/image";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { useParams } from "next/navigation";

// export default function ReviewSection() {
//   const { productId } = useParams();
//   const [open, setOpen] = useState(false);
//   const [rating, setRating] = useState(0);
//   const [reviewText, setReviewText] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const [reviews, setReviews] = useState([]);
//   const [loadingReviews, setLoadingReviews] = useState(true);

//   // Pagination states
//   const [page, setPage] = useState(1);
//   const [limit] = useState(4);
//   const [totalPages, setTotalPages] = useState(1);

//   // ✅ Fetch reviews
//   const fetchReviews = async (pageNum = 1) => {
//     try {
//       setLoadingReviews(true);
//       const res = await axios.get(
//         `/api/user/review/${productId}?page=${pageNum}&limit=${limit}`
//       );
//       setReviews(res.data.reviews || []);
//       setTotalPages(res.data.pagination.pages);
//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//       toast.error("Failed to load reviews.");
//     } finally {
//       setLoadingReviews(false);
//     }
//   };

//   useEffect(() => {
//     if (productId) fetchReviews(page);
//   }, [productId, page]);

//   // ✅ Submit new review
//   const handleSubmitReview = async () => {
//     const userEmail = localStorage.getItem("WMPuser");
//     if (!userEmail) {
//       toast.error("Please log in to submit a review.");
//       return;
//     }

//     const wordCount = reviewText.trim().split(/\s+/).length;
//     if (wordCount < 10) {
//       toast.error("Your review must be at least 10 words long.");
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const res = await axios.post("/api/admin/reviews", {
//         productId,
//         rating,
//         comment: reviewText,
//       });

//       toast.success(res.data.message || "Review submitted successfully!");
//       setOpen(false);
//       setRating(0);
//       setReviewText("");

//       // Refresh reviews after submit
//       fetchReviews(1);
//       setPage(1);
//     } catch (error) {
//       const errorMsg =
//         error.response?.data?.error || error.message || "Something went wrong";
//       toast.error(errorMsg);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="relative bg-white m-4 rounded-2xl py-8 md:mx-12 md:py-16">
//       <div className="h-full w-full absolute inset-0 opacity-30">
//         <Image
//           src="/images/bgPaws1.png"
//           alt="bgpaws"
//           fill
//           className="h-full w-full"
//         />
//       </div>

//       <div className="px-4 md:px-12 bg-white">
//         <h2 className="text-2xl font-semibold text-center text-pink-600 mb-6">
//           Reviews and Rating
//         </h2>

//         {/* Rating + Write Review */}
//         <div className="bg-gray-100 p-4 rounded-xl max-w-lg mx-auto gap-8 mb-6 relative">
//           <p className="text-gray-700">
//             Rate this Product and tell others what you think
//           </p>
//           <div className="flex w-full justify-between items-center gap-8">
//             <div className="flex items-center gap-1 text-xl">
//               {[1, 2, 3, 4, 5].map((i) => (
//                 <span
//                   key={i}
//                   onClick={() => setRating(i)}
//                   className={`cursor-pointer ${
//                     rating >= i ? "text-yellow-400" : "text-gray-400"
//                   }`}
//                 >
//                   ★
//                 </span>
//               ))}
//             </div>
//             <button
//               onClick={() => setOpen(true)}
//               className="text-pink-600 text-sm font-medium hover:underline cursor-pointer"
//             >
//               Write A Review
//             </button>
//           </div>
//         </div>

//         <div className="border-t my-6 border-gray-200"></div>

//         {/* Reviews List */}
//         {loadingReviews ? (
//           <p className="text-center text-gray-500">Loading reviews...</p>
//         ) : reviews.length === 0 ? (
//           <p className="text-center text-gray-500">
//             No reviews yet. Be the first!
//           </p>
//         ) : (
//           <div className="grid md:grid-cols-2 gap-6">
//             {reviews.map((review, idx) => (
//               <div
//                 key={idx}
//                 className="bg-white p-4 rounded-xl border border-gray-100 shadow-xl relative"
//               >
//                 {/* User Info */}
//                 <div className="flex items-center gap-3 mb-2">
//                   <Image
//                     src={"/images/maleEmoji2.webp"}
//                     alt={review.user?.username || "User"}
//                     width={40}
//                     height={40}
//                     className="w-10 h-10 rounded-full object-cover"
//                   />
//                   <div>
//                     <div className="text-sm font-medium text-gray-800">
//                       {review.user?.username || "Anonymous"}
//                     </div>
//                     <div className="text-xs text-gray-500 flex items-center gap-2">
//                       {new Date(review.createdAt).toLocaleDateString()}
//                       <span className="bg-pink-100 text-pink-600 text-[10px] px-2 py-0.5 rounded-full">
//                         Verified
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Rating */}
//                 <div className="text-yellow-500 text-sm mb-2">
//                   {"★".repeat(review.rating)}
//                 </div>

//                 {/* Review Text */}
//                 <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center items-center gap-1 mt-8">
//             <button
//               disabled={page === 1}
//               onClick={() => setPage((p) => Math.max(1, p - 1))}
//               className="px-2 py-1 text-sm text-gray-500 hover:text-pink-500 disabled:opacity-40"
//             >
//               &laquo;
//             </button>
//             {[...Array(totalPages)].map((_, i) => {
//               const pageNum = i + 1;
//               return (
//                 <button
//                   key={pageNum}
//                   onClick={() => setPage(pageNum)}
//                   className={`px-3 py-1 text-sm rounded-full ${
//                     page === pageNum
//                       ? "bg-pink-500 text-white"
//                       : "text-gray-700 hover:bg-gray-100"
//                   }`}
//                 >
//                   {pageNum}
//                 </button>
//               );
//             })}
//             <button
//               disabled={page === totalPages}
//               onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//               className="px-2 py-1 text-sm text-gray-500 hover:text-pink-500 disabled:opacity-40"
//             >
//               &raquo;
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Review Modal */}
//       <WriteReviewModal
//         open={open}
//         onClose={() => setOpen(false)}
//         rating={rating}
//         setRating={setRating}
//         reviewText={reviewText}
//         setReviewText={setReviewText}
//         onSubmit={handleSubmitReview}
//         isLoading={isLoading}
//       />
//     </div>
//   );
// }









"use client";
import React, { useState, useEffect } from "react";
import WriteReviewModal from "./WriteReviewModal";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams } from "next/navigation";

export default function ReviewSection() {
  const { productId } = useParams();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  // Pagination states
  const [page, setPage] = useState(1);
  const [limit] = useState(4);
  const [totalPages, setTotalPages] = useState(1);

  // ✅ Fetch reviews
const fetchReviews = useCallback(
  async (pageNum = 1) => {
    try {
      setLoadingReviews(true);
      const res = await axios.get(
        `/api/user/review/${productId}?page=${pageNum}&limit=${limit}`
      );
      setReviews(res.data.reviews || []);
      setTotalPages(res.data.pagination.pages);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews.");
    } finally {
      setLoadingReviews(false);
    }
  },
  [productId, limit] // dependencies that affect the function
);


  useEffect(() => {
    if (productId) fetchReviews(page);
  }, [productId, page]);

  // ✅ Submit new review
  const handleSubmitReview = async () => {
    const userEmail = localStorage.getItem("WMPuser");
    if (!userEmail) {
      toast.error("Please log in to submit a review.");
      return;
    }

    if (!rating) {
      toast.error("Please select a rating before submitting.");
      return;
    }

    const wordCount = reviewText.trim().split(/\s+/).length;
    if (wordCount < 10) {
      toast.error("Your review must be at least 10 words long.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post("/api/admin/reviews", {
        productId,
        userEmail,
        rating,
        comment: reviewText,
      });

      toast.success(res.data.message || "Review submitted successfully!");
      setOpen(false);
      setRating(0);
      setReviewText("");

      // Refresh reviews after submit
      fetchReviews(1);
      setPage(1);
    } catch (error) {
      const errorMsg =
        error.response?.data?.error || error.message || "Something went wrong";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-white m-4 rounded-2xl py-8 md:mx-12 md:py-16">
      <div className="h-full w-full absolute inset-0 opacity-30">
        <Image
          src="/images/bgPaws1.png"
          alt="bgpaws"
          fill
          className="h-full w-full"
        />
      </div>

      <div className="px-4 md:px-12 bg-white">
        <h2 className="text-2xl font-semibold text-center text-pink-600 mb-6">
          Reviews and Rating
        </h2>

        {/* Rating + Write Review */}
        <div className="bg-gray-100 p-4 rounded-xl max-w-lg mx-auto gap-8 mb-6 relative">
          <p className="text-gray-700">
            Rate this Product and tell others what you think
          </p>
          <div className="flex w-full justify-between items-center gap-8">
            <div className="flex items-center gap-1 text-xl">
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  onClick={() => setRating(i)}
                  className={`cursor-pointer ${
                    rating >= i ? "text-yellow-400" : "text-gray-400"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <button
              onClick={() => setOpen(true)}
              className="text-pink-600 text-sm font-medium hover:underline cursor-pointer"
            >
              Write A Review
            </button>
          </div>
        </div>

        <div className="border-t my-6 border-gray-200"></div>

        {/* Reviews List */}
        {loadingReviews ? (
          <p className="text-center text-gray-500">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-center text-gray-500">
            No reviews yet. Be the first!
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl border border-gray-100 shadow-xl relative"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Image
                    src={"/images/maleEmoji2.webp"}
                    alt={review.user?.username || "User"}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-800">
                      {review.user?.username || "Anonymous"}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-2">
                      {new Date(review.createdAt).toLocaleDateString()}
                      <span className="bg-pink-100 text-pink-600 text-[10px] px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-yellow-500 text-sm mb-2">
                  {"★".repeat(review.rating)}
                </div>

                <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-1 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-2 py-1 text-sm text-gray-500 hover:text-pink-500 disabled:opacity-40"
            >
              &laquo;
            </button>
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-3 py-1 text-sm rounded-full ${
                    page === pageNum
                      ? "bg-pink-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-2 py-1 text-sm text-gray-500 hover:text-pink-500 disabled:opacity-40"
            >
              &raquo;
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <WriteReviewModal
        open={open}
        onClose={() => setOpen(false)}
        rating={rating}
        setRating={setRating}
        reviewText={reviewText}
        setReviewText={setReviewText}
        onSubmit={handleSubmitReview}
        isLoading={isLoading}
      />
    </div>
  );
}
