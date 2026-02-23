import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../State/Order/Action';
import { Button, Box, CircularProgress } from '@mui/material';

const DeliveryAddressForm = ({ handleNext }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // 👇 Auth Store Nikalo
    const { auth } = useSelector(store => store);

    // 👇 DEBUG: Console mein dekho ke data aa raha hai ya nahi
    console.log("Auth State in Delivery Form:", auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        
        const address = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            streetAddress: data.get('address'),
            city: data.get('city'),
            state: data.get('state'), // 👈 Yeh "State/Province" wala state hai
            mobile: data.get('phone'),
            zipCode: data.get('zip'),
        };

        console.log("New Address Data:", address);

        const orderData = { address, navigate };
        dispatch(createOrder(orderData));
    };

    const handleDeliverHere = (address) => {
        console.log("Selected Saved Address:", address);
        const orderData = { address, navigate };
        dispatch(createOrder(orderData));
    };

    return (
        <div className="mt-10 flex flex-col lg:flex-row gap-8 justify-center px-5">

            {/* LEFT SIDE: SAVED ADDRESSES */}
            <div className="w-full max-w-lg bg-white shadow-md rounded-xl p-5 space-y-6 border border-gray-200 max-h-[500px] overflow-y-auto">
                <h3 className='font-bold text-gray-700 border-b pb-2'>Saved Addresses</h3>
                
                {/* Check: Agar User load ho raha hai to Spinner dikhao */}
                {auth.loading ? (
                    <div className="flex justify-center p-5"><CircularProgress /></div>
                ) : (
                    // Check: Agar Addresses hain to dikhao
                    auth.user?.address && auth.user?.address.length > 0 ? (
                        auth.user.address.map((item, index) => (
                            <div key={index} className="pb-5 border-b border-gray-300 last:border-0">
                                <p className="font-semibold text-gray-900 text-lg">
                                    {item.firstName} {item.lastName}
                                </p>
                                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                    {item.streetAddress}, {item.city}, {item.zipCode}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">{item.state}</p>
                                <p className="text-sm font-medium text-gray-900 mt-3">Phone: {item.mobile}</p>
                                
                                <Button 
                                    sx={{ mt: 2, bgcolor: "#9155fd" }} 
                                    size="small" 
                                    variant="contained"
                                    onClick={() => handleDeliverHere(item)}
                                >
                                    Deliver Here
                                </Button>
                            </div>
                        ))
                    ) : (
                        <p className='text-gray-500 text-center py-5'>No saved addresses found. Please add one.</p>
                    )
                )}
            </div>

            {/* RIGHT SIDE: FORM */}
            <div className="w-full max-w-3xl bg-white p-7 shadow-md rounded-xl border border-gray-200">
                <h3 className='font-bold text-gray-700 mb-5 uppercase text-sm'>Add New Address</h3>
                
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row gap-4">
                        <input required type="text" placeholder="First Name *" name='firstName' className="flex-1 p-3 border border-gray-300 rounded-lg text-sm" />
                        <input required type="text" placeholder="Last Name *" name='lastName' className="flex-1 p-3 border border-gray-300 rounded-lg text-sm" />
                    </div>

                    <textarea required placeholder="Address *" rows="3" name='address' className="w-full p-3 border border-gray-300 rounded-lg text-sm"></textarea>

                    <div className="flex flex-col md:flex-row gap-4">
                        <input required type="text" placeholder="City *" name='city' className="flex-1 p-3 border border-gray-300 rounded-lg text-sm" />
                        <input required type="text" placeholder="State / Province *" name='state' className="flex-1 p-3 border border-gray-300 rounded-lg text-sm" />
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <input required type="number" placeholder="Zip / Postal Code *" name='zip' className="flex-1 p-3 border border-gray-300 rounded-lg text-sm" />
                        <input required type="number" placeholder="Phone Number *" name='phone' className="flex-1 p-3 border border-gray-300 rounded-lg text-sm" />
                    </div>

                    <button type="submit" className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all">
                        DELIVER HERE
                    </button>
                </form>
            </div>

        </div>
    )
}

export default DeliveryAddressForm;