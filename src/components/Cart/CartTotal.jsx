import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartTotal = ({ cart }) => {
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-lg lg:max-w-md m-auto lg:m-0 p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className='text-zinc-500 font-semibold border-b pb-2 mb-2'>PRICE DETAILS</h1>

            <div className='py-4 my-4 border-y border-zinc-200 font-medium'>
                <div className='flex justify-between items-center mt-3'>
                    <p>Price ({cart?.totalItem} items)</p>
                    <p>${cart?.totalDiscountedPrice || 0}</p>
                </div>
                <div className='flex justify-between items-center mt-3 '>
                    <p>Discount</p>
                    <p>-${cart?.discounte || 0}</p>
                </div>
                <div className='flex justify-between items-center mt-3'>
                    <p>Delivery Charges</p>
                    <p className='text-green-600'>Free</p>
                </div>
            </div>

            <div className='flex justify-between font-bold items-center text-xl'>
                <p>Total Amount</p>
                <p className='text-green-700'>${cart?.totalDiscountedPrice || 0}</p>
            </div>
            
            <button
                onClick={() => navigate('/checkout')}
                className='w-full bg-purple-700 p-3 mt-5 text-white rounded-lg hover:bg-purple-800 transition-colors'
            >
                Check Out
            </button>
        </div>
    );
};

export default CartTotal;