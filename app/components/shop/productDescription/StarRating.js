import React from "react";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarHalfRoundedIcon from "@mui/icons-material/StarHalfRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";

const StarRating = ({ rating, totalReviews }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  return (
    <div className="flex items-center gap-2 mt-2 text-sm text-yellow-500">
      <div className="flex">
        {Array(fullStars)
          .fill()
          .map((_, i) => (
            <StarRoundedIcon key={`full-${i}`} fontSize="small" />
          ))}
        {hasHalfStar && <StarHalfRoundedIcon fontSize="small" />}
        {Array(emptyStars)
          .fill()
          .map((_, i) => (
            <StarOutlineRoundedIcon key={`empty-${i}`} fontSize="small" />
          ))}
      </div>
      <span className="text-gray-600 text-xs">({totalReviews} Reviews)</span>
      <span className="text-green-600 ml-2">In Stock</span>
    </div>
  );
};

export default StarRating;
