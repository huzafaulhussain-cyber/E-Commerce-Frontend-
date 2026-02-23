import React from "react";
import { Avatar, Rating, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";

// 👇 YEH LINE MISSING THI, ISAY ZAROOR LAGAO
import { deleteReview } from "../../State/review/Action"; 

const ReviewCard = ({ review, currentUser }) => {
  const dispatch = useDispatch();

  // Avatar Letter Logic
  const avatarLetter = review.user?.firstName 
    ? review.user.firstName[0].toUpperCase() 
    : "U";

  // Check: Kya ye review usi user ka hai jo login hai?
  const isOwnReview = currentUser?._id === review.user?._id;

  const handleDelete = () => {
      // Ab ye chalega kyunki humne upar import kar liya hai
      if(window.confirm("Are you sure you want to delete this review?")) {
          dispatch(deleteReview(review._id));
      }
  };

  return (
    <div className="flex gap-4 p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 relative">
      
      {/* Avatar */}
      <Avatar
        sx={{ width: 50, height: 50, bgcolor: "#9155fd", fontSize: "1.2rem", fontWeight: "bold" }}
      >
        {avatarLetter}
      </Avatar>

      {/* Content */}
      <div className="flex-1">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-xs text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                </p>
                <h4 className="font-bold text-gray-900 text-md">
                   {review.user?.firstName} {review.user?.lastName}
                </h4>
            </div>
            
            <div className="flex items-center gap-2">
                <Rating value={review.rating} readOnly size="small" />
                
                {/* DELETE BUTTON - Sirf tab dikhega agar user owner hai */}
                {isOwnReview && (
                    <IconButton 
                        onClick={handleDelete} 
                        aria-label="delete" 
                        size="small" 
                        sx={{ color: "red" }}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                )}
            </div>
        </div>

        <p className="mt-3 text-gray-700 text-sm leading-relaxed">
          {review.review}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;