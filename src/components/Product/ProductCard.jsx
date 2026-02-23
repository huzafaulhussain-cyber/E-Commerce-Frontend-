import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Star, ShoppingCart } from 'lucide-react';
import { addItemToCart } from '../../State/cart/Action';
import { api } from '../../config/apiConfig';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [averageRating, setAverageRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);

    useEffect(() => {
        const fetchReviewsForProduct = async () => {
            if (product._id) {
                try {
                    const { data } = await api.get(`/api/reviews/product/${product._id}`);
                    if (data && data.length > 0) {
                        const total = data.reduce((sum, review) => sum + review.rating, 0);
                        setAverageRating((total / data.length).toFixed(1));
                        setTotalReviews(data.length);
                    }
                } catch (error) {
                    console.error("Reviews fetch error", error);
                }
            }
        };
        fetchReviewsForProduct();
    }, [product._id]);

    const handleNavigate = () => navigate(`/product/${product._id}`);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        const data = { productId: product._id, size: "M" };
        dispatch(addItemToCart(data));
    };

    return (
        <div 
            onClick={handleNavigate} 
            // CHANGE 1: Fixed Width 'w-[280px]' use ki hai 'w-75' ki jagah
            className="group relative cursor-pointer w-[280px] bg-white m-5 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
        >
            
            {/* CHANGE 2: Image Container ki height 'h-72' set ki hai */}
            <div className="relative h-72 w-full overflow-hidden bg-gray-50">
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                    <span className="bg-emerald-500 text-white text-[12px] font-bold px-2 py-1 rounded-md">
                        -{product.discountPercent}% OFF
                    </span>
                </div>

                <img
                    src={product.imageUrl}
                    alt={product.title}
                    // CHANGE 3: 'object-cover' use kiya hai taake image stretch na ho
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
            </div>

            <div className="p-4 bg-white">
                <p className="text-[10px] font-bold text-gray-400 tracking-widest mb-1 uppercase">
                    {product.brand}
                </p>
                
                <h3 className="text-sm font-bold text-gray-800 mb-1 truncate">
                    {product.title}
                </h3>

                <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center text-yellow-400">
                        <Star size={14} fill="currentColor" />
                        <span className="text-xs font-bold text-gray-600 ml-1">
                            {averageRating}
                        </span>
                    </div>
                    <span className="text-gray-300">|</span>
                    <p className="text-xs font-medium text-gray-500">
                        {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
                    </p>
                </div>

                <p className="text-xs font-medium text-gray-400 italic mb-3">
                    {product.color}
                </p>

                <div className="flex items-center justify-between mt-2">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-black text-gray-900">
                                ${product.discountedPrice}
                            </span>
                            <span className="text-xs text-gray-400 line-through">
                                ${product.price}
                            </span>
                        </div>
                    </div>

                    <button 
                        className="bg-gray-900 cursor-pointer text-white p-2.5 rounded-lg hover:bg-emerald-600 transition-all active:scale-90 shadow-md flex items-center justify-center"
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;