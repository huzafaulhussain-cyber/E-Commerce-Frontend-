import React, { useEffect, useState, useMemo } from 'react';
import OrderCard from './OrderCard';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderHistory } from '../../State/Order/Action';

const Order = () => {
    const dispatch = useDispatch();
    const { orders, loading } = useSelector((store) => store.order);
    const [selectedStatuses, setSelectedStatuses] = useState([]);

    useEffect(() => {
        dispatch(getOrderHistory());
    }, [dispatch]);

    const handleFilterChange = (status) => {
        setSelectedStatuses(prev => 
            prev.includes(status) 
                ? prev.filter(s => s !== status) 
                : [...prev, status]
        );
    };

    const filteredOrders = useMemo(() => {
        if (selectedStatuses.length === 0) {
            return orders;
        }
        return orders.filter(order => selectedStatuses.includes(order.orderStatus));
    }, [orders, selectedStatuses]);

    return (
        <div className='flex flex-col lg:flex-row gap-10 mb-10 px-5 lg:px-20  justify-center mt-10'>
            
            {/* Filter Section */}
            <div className="w-full lg:w-[25%] h-70 bg-white p-5 rounded-lg shadow-md border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 pb-3">Filters</h2>
                <hr className="border-gray-300 mb-5" />
                <h3 className="text-sm font-semibold tracking-wider text-gray-700 uppercase mb-3">ORDER STATUS</h3>
                <div className="space-y-3">
                    {['PLACED', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((status) => (
                        <div key={status} className="flex items-center">
                            <input 
                                type="checkbox" 
                                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                checked={selectedStatuses.includes(status)}
                                onChange={() => handleFilterChange(status)}
                            />
                            <label className="ml-3 text-sm text-gray-700">{status}</label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Orders List */}
            <div className='space-y-5 w-full lg:w-[75%]'>
                {/* Agar loading hai to spinner dikhao, nahi to data */}
                {loading ? (
                     <div className="text-center mt-10">Loading orders...</div>
                ) : (
                    filteredOrders && filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                             // Har order ke items ko map kar rahe hain
                             order.orderItems?.map((item) => (
                                <OrderCard 
                                    key={item._id} 
                                    item={item} 
                                    orderStatus={order.orderStatus} 
                                    orderId={order._id} 
                                />
                             ))
                        ))
                    ) : (
                        <div className="text-center p-10 bg-white shadow rounded-md">
                            <p className="text-gray-500">No Orders Found Matching Your Filters</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Order;