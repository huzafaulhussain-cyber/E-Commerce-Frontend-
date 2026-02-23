import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating, Button, TextField } from "@mui/material";
// Apne folder structure ke hisaab se import check kar lena
import { createReview, getAllReviews } from "../../State/review/Action"; 
import ProductRatings from "./ProductRatings";
import ReviewCard from "./ReviewCard";

const ProductDetailReview = ({ productId }) => {
    const dispatch = useDispatch();
    
    // Redux Stores
    const { user } = useSelector((store) => store.auth); 
    const { review } = useSelector((store) => store);

    // Local State
    const [ratingValue, setRatingValue] = useState(0);
    const [reviewText, setReviewText] = useState("");

    useEffect(() => {
        if (productId) {
            dispatch(getAllReviews(productId));
        }
    }, [productId, dispatch]);

    const handleSubmit = () => {
        const data = {
            productId: productId, // Props se jo ID aayi hai
            rating: ratingValue,
            review: reviewText
        };
        
        console.log("Submitting Data:", data);
        dispatch(createReview(data));
        
        // Reset Form
        setReviewText("");
        setRatingValue(0);
    };

    return (
        <section className="bg-gray-50 py-10 px-4 md:px-10 lg:px-20">
            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                    Ratings & Reviews
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* LEFT COLUMN: Reviews List & Input Form (Span 7) */}
                    <div className="lg:col-span-7 space-y-10">

                        {/* 1. Review Input Box */}
                        <div className="bg-white p-6 rounded-2xl shadow-md border border-indigo-50">
                            <h3 className="text-lg font-semibold mb-4">Write a Review</h3>

                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">Your Rating:</span>
                                    <Rating
                                        value={ratingValue}
                                        onChange={(e, val) => setRatingValue(val)}
                                        size="large"
                                    />
                                </div>

                                <TextField
                                    placeholder="Share your thoughts about this product..."
                                    multiline
                                    rows={4}
                                    fullWidth
                                    variant="outlined"
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "12px",
                                            backgroundColor: "#f9fafb"
                                        }
                                    }}
                                />

                                <div className="flex justify-end">
                                    <Button
                                        variant="contained"
                                        onClick={handleSubmit}
                                        disabled={!ratingValue || !reviewText}
                                        sx={{
                                            bgcolor: "#4f46e5",
                                            textTransform: "none",
                                            borderRadius: "8px",
                                            px: 4,
                                            py: 1,
                                            "&:hover": { bgcolor: "#4338ca" }
                                        }}
                                    >
                                        Post Review
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* 2. Reviews List */}
                        <div className="space-y-5">
                            <h3 className="text-lg font-bold text-gray-800">
                                  Comments Reviews ({review.reviews?.length || 0})
                            </h3>

                            {Array.isArray(review.reviews) && review.reviews.length > 0 ? (
                                review.reviews.map((item, index) => (
                                    <ReviewCard key={index} review={item}    currentUser={user} />
                                ))
                            ) : (
                                <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
                                    <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Rating Summary (Span 5) */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-24">
                            {/* NOTE: Yahan reviews pass kiye hain taake chart update ho */}
                            <ProductRatings reviews={review.reviews || []} />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ProductDetailReview;