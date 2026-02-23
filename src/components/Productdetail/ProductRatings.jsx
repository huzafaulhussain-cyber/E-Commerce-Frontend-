import React from "react";
import { Rating, Box, LinearProgress } from "@mui/material";

const ProductRatings = ({ reviews = [] }) => {
  
  // 1. Total Count
  const totalRatings = reviews.length;

  // 2. Average Rating Calculation
  // Sab ratings ko jama karo aur total se divide karo
  const sumOfRatings = reviews.reduce((acc, curr) => acc + (curr.rating || 0), 0);
  const averageRating = totalRatings > 0 ? (sumOfRatings / totalRatings).toFixed(1) : 0;

  // 3. Distribution Calculation (Kitne 5 stars, kitne 4 stars...)
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  
  reviews.forEach((r) => {
      const rounded = Math.round(r.rating || 0);
      if (counts[rounded] !== undefined) counts[rounded]++;
  });

  // Chart Data Structure
  const ratingsBreakdown = [
    { label: "Excellent", value: 5, color: "success" },
    { label: "Very Good", value: 4, color: "success" },
    { label: "Good", value: 3, color: "warning" },
    { label: "Average", value: 2, color: "warning" },
    { label: "Poor", value: 1, color: "error" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Ratings</h3>
      
      {/* Average Display */}
      <div className="flex items-end gap-3 mb-6">
        <h1 className="text-5xl font-extrabold text-indigo-600">{averageRating}</h1>
        <div className="mb-1">
          <Rating value={Number(averageRating)} precision={0.5} readOnly />
          <p className="text-sm text-gray-500 font-medium">{totalRatings} Ratings</p>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-3">
        {ratingsBreakdown.map((item, index) => {
            const count = counts[item.value];
            // Percentage nikalo bar ki width ke liye
            const percent = totalRatings > 0 ? (count / totalRatings) * 100 : 0;

            return (
              <div key={index} className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-600 w-20">{item.label}</span>
                <Box sx={{ width: "100%", mr: 1 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={percent} 
                    color={item.color} 
                    sx={{ height: 8, borderRadius: 5, backgroundColor: "#f3f4f6" }}
                  />
                </Box>
                <span className="text-sm text-gray-400 font-bold w-6">{Math.round(percent)}%</span>
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default ProductRatings;