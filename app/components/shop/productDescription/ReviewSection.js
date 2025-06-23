"use client";
import React, { useState } from "react";
import WriteReviewModal from "./WriteReviewModal";
import Image from "next/image";

export default function ReviewSection() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const reviews = [
    {
      name: "Varun",
      date: "22 Jul",
      rating: 4,
      avatar: "/avatars/varun.jpg",
      text: "My dog absolutely loves this ball! The sounds keep him entertained for hours. Great quality and fun design.",
    },
    {
      name: "Arjun K.",
      date: "22 Jul",
      rating: 2,
      avatar: "/avatars/arjun.jpg",
      text: "Fun and engaging! It rolls around with cute noises and my cat goes crazy chasing it. Just wish the battery lasted a bit longer.",
    },
    {
      name: "Rahul D.",
      date: "22 Jul",
      rating: 3,
      avatar: "/avatars/rahul.jpg",
      text: "Really good toy — sturdy and safe. My pet enjoys it a lot. It's a bit loud at times, but overall a great buy.",
    },
    {
      name: "Sneha R.",
      date: "22 Jul",
      rating: 5,
      avatar: "/avatars/sneha.jpg",
      text: "Perfect for indoor play! My puppy used to get bored easily, but now he’s always running after this ball. Highly recommended!",
    },
  ];

  const handleSubmitReview = () => {
    setOpen(false);
    setRating(0);
    setReviewText("");
  };

  return (
    <div className="relative  bg-white m-4 rounded-2xl py-8  md:mx-12 md:py-16">
      <div className="h-full w-full absolute inset-0 opacity-30">
        <Image
          src="/images/bgPaws1.png"
          alt="bgpaws"
          fill
          className=" h-full w-full"
        />
      </div>
      {/* <Image
        src="/images/bgPaws1.png"
        alt="bgpaws"
        fill
        className=" h-full w-full absolute inset-0 opacity-30"
      /> */}
      <div className="px-4 md:px-12 bg-white ">
        {/* Section Header */}
        <h2 className="text-2xl font-semibold text-center text-pink-600 mb-6">
          Reviews and Rating
        </h2>

        {/* Rating Stars Input */}
        <div className="bg-gray-100 p-4 rounded-xl max-w-lg mx-auto gap-8 mb-6 relative">
          <p className="text-gray-700">
            Rate this Product and tell others what you think
          </p>
          <div className=" flex w-full justify-between items-center gap-8">
            <div className="flex items-center gap-1 text-xl text-gray-400">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="hover:text-yellow-400 cursor-pointer">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.3065 4.68026L20.6532 9.3736C20.9732 10.0269 21.8265 10.6536 22.5465 10.7736L26.7999 11.4803C29.5199 11.9336 30.1599 13.9069 28.1999 15.8536L24.8932 19.1603C24.3332 19.7203 24.0265 20.8003 24.1999 21.5736L25.1465 25.6669C25.8932 28.9069 24.1732 30.1603 21.3065 28.4669L17.3199 26.1069C16.5999 25.6803 15.4132 25.6803 14.6799 26.1069L10.6932 28.4669C7.83988 30.1603 6.10655 28.8936 6.85321 25.6669L7.79988 21.5736C7.97321 20.8003 7.66655 19.7203 7.10655 19.1603L3.79988 15.8536C1.85321 13.9069 2.47988 11.9336 5.19988 11.4803L9.45321 10.7736C10.1599 10.6536 11.0132 10.0269 11.3332 9.3736L13.6799 4.68026C14.9599 2.1336 17.0399 2.1336 18.3065 4.68026Z"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              ))}
            </div>
            <button
              onClick={() => setOpen(true)}
              className="text-pink-600 text-sm font-medium hover:underline  cursor-pointer"
            >
              Write A Review
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t my-6 border-gray-200"></div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-xl border border-gray-100 shadow-xl relative"
            >
              {/* User Info */}
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    {review.name}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-2">
                    {review.date}
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
              <p className="text-sm text-gray-700 mb-2">{review.text}</p>

              <button className="text-sm text-pink-500 hover:underline font-medium">
                Read More
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-1 mt-8">
          <button className="px-2 py-1 text-sm text-gray-500 hover:text-pink-500">
            &laquo;
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 text-sm rounded-full ${
                page === 1
                  ? "bg-pink-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button className="px-2 py-1 text-sm text-gray-500 hover:text-pink-500">
            &raquo;
          </button>
        </div>
      </div>
      <WriteReviewModal
        open={open}
        onClose={() => setOpen(false)}
        rating={rating}
        setRating={setRating}
        reviewText={reviewText}
        setReviewText={setReviewText}
        onSubmit={handleSubmitReview}
      />
    </div>
  );
}
