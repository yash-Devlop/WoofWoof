// "use client";
// import React, { useEffect, useState } from "react";
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

//   const reviews = [
//     {
//       name: "Varun",
//       date: "22 Jul",
//       rating: 4,
//       avatar: "/avatars/varun.jpg",
//       text: "My dog absolutely loves this ball! The sounds keep him entertained for hours. Great quality and fun design.",
//     },
//     {
//       name: "Arjun K.",
//       date: "22 Jul",
//       rating: 2,
//       avatar: "/avatars/arjun.jpg",
//       text: "Fun and engaging! It rolls around with cute noises and my cat goes crazy chasing it. Just wish the battery lasted a bit longer.",
//     },
//     {
//       name: "Rahul D.",
//       date: "22 Jul",
//       rating: 3,
//       avatar: "/avatars/rahul.jpg",
//       text: "Really good toy — sturdy and safe. My pet enjoys it a lot. It's a bit loud at times, but overall a great buy.",
//     },
//     {
//       name: "Sneha R.",
//       date: "22 Jul",
//       rating: 5,
//       avatar: "/avatars/sneha.jpg",
//       text: "Perfect for indoor play! My puppy used to get bored easily, but now he’s always running after this ball. Highly recommended!",
//     },
//   ];

//   const handleSubmitReview = async () => {
//     const userEmail = localStorage.getItem("WMPuser");

//     // ✅ Authentication check
//     if (!userEmail) {
//       toast.error("Please log in to submit a review.");
//       return;
//     }
//     // ✅ Word count validation
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
//     } catch (error) {
//       const errorMsg =
//         error.response?.data?.error || error.message || "Something went wrong";
//       toast.error(errorMsg);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="relative  bg-white m-4 rounded-2xl py-8  md:mx-12 md:py-16">
//       <div className="h-full w-full absolute inset-0 opacity-30">
//         <Image
//           src="/images/bgPaws1.png"
//           alt="bgpaws"
//           fill
//           className=" h-full w-full"
//         />
//       </div>
//       {/* <Image
//         src="/images/bgPaws1.png"
//         alt="bgpaws"
//         fill
//         className=" h-full w-full absolute inset-0 opacity-30"
//       /> */}
//       <div className="px-4 md:px-12 bg-white ">
//         {/* Section Header */}
//         <h2 className="text-2xl font-semibold text-center text-pink-600 mb-6">
//           Reviews and Rating
//         </h2>

//         {/* Rating Stars Input */}
//         <div className="bg-gray-100 p-4 rounded-xl max-w-lg mx-auto gap-8 mb-6 relative">
//           <p className="text-gray-700">
//             Rate this Product and tell others what you think
//           </p>
//           <div className=" flex w-full justify-between items-center gap-8">
//             <div className="flex items-center gap-1 text-xl text-gray-400">
//               {[1, 2, 3, 4, 5].map((i) => (
//                 <span key={i} className="hover:text-yellow-400 cursor-pointer">
//                   <svg
//                     width="24"
//                     height="24"
//                     viewBox="0 0 32 32"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M18.3065 4.68026L20.6532 9.3736C20.9732 10.0269 21.8265 10.6536 22.5465 10.7736L26.7999 11.4803C29.5199 11.9336 30.1599 13.9069 28.1999 15.8536L24.8932 19.1603C24.3332 19.7203 24.0265 20.8003 24.1999 21.5736L25.1465 25.6669C25.8932 28.9069 24.1732 30.1603 21.3065 28.4669L17.3199 26.1069C16.5999 25.6803 15.4132 25.6803 14.6799 26.1069L10.6932 28.4669C7.83988 30.1603 6.10655 28.8936 6.85321 25.6669L7.79988 21.5736C7.97321 20.8003 7.66655 19.7203 7.10655 19.1603L3.79988 15.8536C1.85321 13.9069 2.47988 11.9336 5.19988 11.4803L9.45321 10.7736C10.1599 10.6536 11.0132 10.0269 11.3332 9.3736L13.6799 4.68026C14.9599 2.1336 17.0399 2.1336 18.3065 4.68026Z"
//                       stroke="#292D32"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </span>
//               ))}
//             </div>
//             <button
//               onClick={() => setOpen(true)}
//               className="text-pink-600 text-sm font-medium hover:underline  cursor-pointer"
//             >
//               Write A Review
//             </button>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="border-t my-6 border-gray-200"></div>

//         {/* Reviews Grid */}
//         <div className="grid md:grid-cols-2 gap-6">
//           {reviews.map((review, idx) => (
//             <div
//               key={idx}
//               className="bg-white p-4 rounded-xl border border-gray-100 shadow-xl relative"
//             >
//               {/* User Info */}
//               <div className="flex items-center gap-3 mb-2">
//                 <img
//                   src={review.avatar}
//                   alt={review.name}
//                   className="w-10 h-10 rounded-full object-cover"
//                 />
//                 <div>
//                   <div className="text-sm font-medium text-gray-800">
//                     {review.name}
//                   </div>
//                   <div className="text-xs text-gray-500 flex items-center gap-2">
//                     {review.date}
//                     <span className="bg-pink-100 text-pink-600 text-[10px] px-2 py-0.5 rounded-full">
//                       Verified
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Rating */}
//               <div className="text-yellow-500 text-sm mb-2">
//                 {"★".repeat(review.rating)}
//               </div>

//               {/* Review Text */}
//               <p className="text-sm text-gray-700 mb-2">{review.text}</p>

//               <button className="text-sm text-pink-500 hover:underline font-medium">
//                 Read More
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-center items-center gap-1 mt-8">
//           <button className="px-2 py-1 text-sm text-gray-500 hover:text-pink-500">
//             &laquo;
//           </button>
//           {[1, 2, 3, 4, 5].map((page) => (
//             <button
//               key={page}
//               className={`px-3 py-1 text-sm rounded-full ${
//                 page === 1
//                   ? "bg-pink-500 text-white"
//                   : "text-gray-700 hover:bg-gray-100"
//               }`}
//             >
//               {page}
//             </button>
//           ))}
//           <button className="px-2 py-1 text-sm text-gray-500 hover:text-pink-500">
//             &raquo;
//           </button>
//         </div>
//       </div>
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
  const fetchReviews = async (pageNum = 1) => {
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
  };

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

    const wordCount = reviewText.trim().split(/\s+/).length;
    if (wordCount < 10) {
      toast.error("Your review must be at least 10 words long.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post("/api/admin/reviews", {
        productId,
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
                {/* User Info */}
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

                {/* Rating */}
                <div className="text-yellow-500 text-sm mb-2">
                  {"★".repeat(review.rating)}
                </div>

                {/* Review Text */}
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

      {/* Review Modal */}
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
