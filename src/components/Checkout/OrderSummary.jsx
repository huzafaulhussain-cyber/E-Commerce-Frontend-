import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getOrderById } from '../../State/Order/Action';
import { Button } from '@mui/material';

const OrderSummary = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    // Redux se Order Data nikala
    const { order, loading } = useSelector(store => store.order);

    const search = new URLSearchParams(location.search);
    const orderId = search.get('order_id');

    useEffect(() => {
        if (orderId) {
            dispatch(getOrderById(orderId));
        }
    }, [orderId, dispatch]);

    // 👇 DEBUGGING: Console mein check karo data aa kaisa raha hai
    console.log("Order Summary Data:", order);

    const handleCheckout = () => {
        // 👇 YAHAN GHALTI THI: orderId URL mein bhejna zaroori hai
        navigate(`/checkout?step=3&order_id=${orderId}`);
    }

    if (loading) {
        return <div className="flex justify-center items-center h-[70vh] text-xl font-medium text-gray-500">Loading Order Summary...</div>;
    }

    if (!order) {
        return <div className="flex justify-center items-center h-[70vh] text-red-500 font-bold">Order Details Not Found</div>;
    }

    return (
        <div className="p-4 lg:p-10 bg-gray-50 min-h-screen">

            <div className="max-w-7xl mx-auto">

                {/* 1. DELIVERY ADDRESS CARD */}
                <div className="p-6 bg-white shadow-md rounded-lg border border-gray-200 mb-8">
                    <h3 className="font-bold text-lg text-gray-800 border-b border-gray-200 pb-3 mb-4">Delivery Address</h3>
                    <div className="text-gray-700">
                        <div className='flex justify-between items-start'>
                            <div>
                                <p className="font-bold text-lg text-black">
                                    {order?.shippingAddress?.firstName} {order?.shippingAddress?.lastName}
                                </p>
                                <p className="mt-2 text-sm">
                                    {order?.shippingAddress?.streetAddress}, {order?.shippingAddress?.city}
                                </p>
                                <p className="text-sm">
                                    {order?.shippingAddress?.state}  {order?.shippingAddress?.zipCode}
                                </p>
                                <p className="mt-3 font-medium">
                                    Phone: <span className="font-normal">{order?.shippingAddress?.mobile}</span>
                                </p>
                            </div>
                            <Button variant="outlined" sx={{ color: "#9155fd", borderColor: "#9155fd" }}>
                                Change
                            </Button>
                        </div>
                    </div>
                </div>


                <div className='flex flex-col lg:flex-row gap-8 relative'>

                    {/* 2. ORDER ITEMS LIST (Left Side) */}
                    <div className='w-full lg:w-[65%] space-y-5'>
                        {order?.orderItems?.map((item) => (
                            <div key={item._id} className="flex gap-5 p-4 bg-white shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow">

                                {/* Image */}
                                <div className="w-[110px] h-[110px]  ">
                                    <img
                                        src={item.product?.imageUrl}
                                        alt={item.product?.title}
                                        className="w-full h-full object-cover object-top rounded-md "
                                    />
                                </div>

                                {/* Details */}
                                <div className='flex-1'>
                                    <h4 className="font-bold text-gray-900 text-lg leading-snug">{item.product?.title}</h4>
                                    <p className="text-sm text-gray-500 mt-1 font-medium opacity-80">
                                        Size: {item.size} | Color: {item.product?.color} | Brand: {item.product?.brand}
                                    </p>

                                    <div className="flex items-center gap-4 mt-3">
                                        <p className="font-bold text-xl text-gray-900">₹{item.discountedPrice}</p>
                                        <p className="line-through text-gray-400 text-sm">₹{item.price}</p>
                                        <p className="text-green-600 text-sm font-bold">
                                            {item.product?.discountPercent}% Off
                                        </p>
                                    </div>

                                    <p className='text-sm text-gray-500 mt-2'>Quantity: <span className='font-bold text-gray-800'>{item.quantity}</span></p>
                                </div>
                            </div>
                        ))}
                    </div>


                    {/* 3. PRICE DETAILS (Right Side - Sticky) */}
                    <div className='w-full lg:w-[35%] h-fit sticky top-20'>
                        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-100">
                            <h2 className='text-gray-500 font-bold uppercase tracking-wider mb-5 text-sm'>Price Details</h2>

                            <div className='space-y-4 font-medium text-gray-700 pb-5 border-b border-gray-200'>
                                <div className='flex justify-between'>
                                    {/* Yahan 'totalPrice' ayega (Jo zyada wala hai e.g. 3000) */}
                                    <span>Price ({order?.totalItems} items)</span>
                                    <span>₹{order?.totalDiscountPrice}</span>
                                </div>

                                <div className='flex justify-between'>
                                    <span>Discount</span>
                                    {/* Yahan 'discount' ayega (e.g. 1646) */}
                                    <span className='text-green-600 font-semibold'>-₹{order?.discount}</span>
                                </div>

                                <div className='flex justify-between'>
                                    <span>Delivery Charges</span>
                                    <span className='text-green-600 font-semibold'>Free</span>
                                </div>
                            </div>

                            <div className='flex justify-between font-bold text-xl text-gray-900 mt-5'>
                                <span>Total Amount</span>
                                {/* 👇 ASLI CHANGE YAHAN HAI: 'totalDiscountPrice' use kiya hai (e.g. 1354) */}
                                <span className='text-green-700'>₹{order?.totalDiscountPrice}</span>
                            </div>

                            <Button
                                onClick={handleCheckout}
                                variant="contained"
                                fullWidth
                                sx={{
                                    mt: 3,
                                    bgcolor: "#9155fd",
                                    py: 1.5,
                                    fontSize: "1rem",
                                    fontWeight: "bold",
                                    "&:hover": { bgcolor: "#7e43e0" }
                                }}
                            >
                                Checkout
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default OrderSummary;