import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import DeliveryAddressForm from './DeliveryAddressForm';
import OrderSummary from './OrderSummary';
import { useDispatch } from 'react-redux';
import { getCart } from '../../State/Cart/Action';
import PaymentPage from './PaymentPage';

const steps = ['Login', 'Delivery', 'Order Summary', 'Payment'];

const LoginPage = () => <div>Login Page</div>;

export default function Checkout() {
    const [activeStep, setActiveStep] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // State to hold orderId
    const [orderId, setOrderId] = useState(null);

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    // ✅ FIX: URL change hone par Step aur OrderID dono update karo
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const step = queryParams.get('step');
        const order_id = queryParams.get('order_id');

        if (step) {
            const stepNumber = parseInt(step, 10);
            if (!isNaN(stepNumber) && stepNumber >= 0 && stepNumber < steps.length) {
                setActiveStep(stepNumber);
            }
        }
        
        if (order_id) {
            setOrderId(order_id);
            console.log("Order ID Set:", order_id); // Debugging
        }
    }, [location.search]); // 👈 Dependency array mein location.search zaroori hai

    const handleNext = () => {
        const nextStep = activeStep + 1;
        // Agar orderId hai to usay URL mein saath lekar jao
        const orderQuery = orderId ? `&order_id=${orderId}` : '';
        navigate(`?step=${nextStep}${orderQuery}`);
    };

    const handleBack = () => {
        const prevStep = activeStep - 1;
        const orderQuery = orderId ? `&order_id=${orderId}` : '';
        navigate(`?step=${prevStep}${orderQuery}`);
    };

    const renderStepPage = () => {
        if (activeStep === 0) return <LoginPage />;
        if (activeStep === 1) return <DeliveryAddressForm handleNext={handleNext} />;
        if (activeStep === 2) return <OrderSummary />;
        
        if (activeStep === 3) {
            return (
                <div className="mt-10">
                    <h2 className="text-2xl font-bold text-center mb-5">Make Payment</h2>
                    {/* Ab orderId state se pass hoga jo kabhi null nahi hoga agar URL mein tha */}
                    <PaymentPage orderId={orderId} />
                </div>
            );
        }
    };

    return (
        <div className="px-5 md:px-10 lg:px-20 py-10">

            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>

                    <Box sx={{ flex: '1 1 auto' }} />

                    {/* Step 3 (Payment) par Next button nahi dikhana */}
                    {activeStep !== steps.length - 1 && activeStep !== 1 && (
                        <Button onClick={handleNext}>
                            Next
                        </Button>
                    )}
                </Box>

                <Box sx={{ mt: 4 }}>
                    {renderStepPage()}
                </Box>
            </Box>

        </div>
    );
}