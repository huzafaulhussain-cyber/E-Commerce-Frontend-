import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderCard = ({ item, orderStatus, orderId }) => {
    const navigate = useNavigate();

    // Status ke hisaab se color aur text
    const getStatusInfo = (status) => {
        switch (status) {
            case 'PLACED': return { text: 'Order Placed', color: 'text-blue-600' };
            case 'CONFIRMED': return { text: 'Order Confirmed', color: 'text-green-500' };
            case 'SHIPPED': return { text: 'Shipped', color: 'text-purple-600' };
            case 'DELIVERED': return { text: 'Delivered', color: 'text-green-700' };
            case 'CANCELLED': return { text: 'Cancelled', color: 'text-red-600' };
            default: return { text: status, color: 'text-gray-600' };
        }
    };

    const statusInfo = getStatusInfo(orderStatus);

    return (
        <div 
            onClick={() => navigate(`/account/order/${orderId}`)} 
            className="w-full bg-white p-4 sm:p-5 rounded-lg shadow-md border border-gray-100 flex items-start space-x-4 hover:shadow-lg transition-shadow cursor-pointer"
        >
            {/* Image */}
            <div style={{ flexShrink: 0 }}>
                <img
                    src={item.product?.imageUrl}
                    alt={item.product?.title}
                    className="h-24 w-24 object-cover object-top rounded-md border border-gray-200"
                />
            </div>

            {/* Details */}
            <div style={{ flexGrow: 1 }} className=" flex flex-col sm:flex-row justify-between">
                <div>
                    <p className="text-gray-900 font-medium text-base leading-snug">
                        {item.product?.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Size: {item.size} | Color: {item.product?.color}
                    </p>
                    <p className="text-sm text-gray-500 mt-1 font-semibold">
                        Brand: {item.product?.brand}
                    </p>
                </div>

                <div className='flex flex-col items-end mt-2 sm:mt-0 gap-2'>
                    <p className="text-lg font-semibold text-gray-900">
                        ₹{item.discountedPrice}
                    </p>
                    
                    {/* Status Badge */}
                    <div className={`text-sm flex items-center font-semibold ${statusInfo.color}`}>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>{statusInfo.text}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;