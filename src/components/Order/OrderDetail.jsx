import React, { useEffect } from 'react';
import OrderTraker from './OrderTraker';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../State/Order/Action';
import { Grid, Box } from '@mui/material';

const OrderDetail = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const { order } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [dispatch, orderId]);

  // Tracker Logic: Backend ke status ko Number mein convert karna
  const getStep = (status) => {
      switch(status) {
          case "PLACED": return 0;
          case "CONFIRMED": return 1;
          case "SHIPPED": return 2;
          case "DELIVERED": return 4; // Step 3 skip kiya agar Out for delivery ka status nahi hai
          default: return 0;
      }
  }

  return (
    <div className='mb-10 px-5  lg:px-20 mt-10'>
      
      {/* 1. Address Section */}
      <div className="w-full  shadow-lg rounded-xl p-6 border border-gray-100 mb-8">
        <h2 className="font-bold text-xl mb-4 text-gray-800">Delivery Address</h2>
        <div className="text-gray-600">
          <p className="font-semibold text-gray-900 text-lg">
            {order.order?.shippingAddress?.firstName} {order.order?.shippingAddress?.lastName}
          </p>
          <p className="mt-1">
            {order.order?.shippingAddress?.streetAddress}, {order.order?.shippingAddress?.city}
          </p>
          <p className="mt-1">
            {order.order?.shippingAddress?.state}  {order.order?.shippingAddress?.zipCode}
          </p>
          <div className="mt-3 flex gap-2">
            <span className="font-medium text-gray-900">Phone:</span>
            <span>{order.order?.shippingAddress?.mobile}</span>
          </div>
        </div>
      </div>

      {/* 2. Order Tracker */}
      <div className='py-10   rounded-xl shadow-sm bg-white mb-8'>
        <OrderTraker activeStep={getStep(order.order?.orderStatus)} />
      </div>

      {/* 3. Product List inside Order */}
      <div className="space-y-5">
        {order.order?.orderItems?.map((item) => (
            <div key={item._id} className="w-full bg-white p-5 rounded-lg shadow-lg border border-gray-100 flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">

            <div style={{ flexShrink: 0 }}>
                <img
                src={item.product?.imageUrl}
                alt={item.product?.title}
                className="h-32 w-32 object-cover rounded-md border border-gray-200"
                />
            </div>

            <div style={{ flexGrow: 1 }} className=" flex flex-col justify-between h-full">
                <div>
                <p className="text-gray-900 font-bold text-lg leading-snug">
                    {item.product?.title}
                </p>
                <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    <p>Size: <span className="font-medium text-gray-900">{item.size}</span></p>
                    <p>Color: <span className="font-medium text-gray-900">{item.product?.color}</span></p>
                </div>
                <p className="mt-2 text-gray-900 font-medium">Seller: {item.product?.brand}</p>
                <p className="text-xl font-bold text-gray-900 mt-2">
                    ₹{item.discountedPrice}
                </p>
                </div>
            </div>

            {/* Rate & Review Button */}
            <div className="self-center sm:self-start">
                <div className="flex items-center gap-2 cursor-pointer text-purple-700 hover:text-purple-900 transition-colors">
                    <StarBorderIcon />
                    <span className="font-medium">Rate & Review Product</span>
                </div>
            </div>
            </div>
        ))}
      </div>

    </div>
  )
}

export default OrderDetail;