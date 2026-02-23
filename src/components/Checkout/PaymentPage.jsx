import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { api } from "../../config/apiConfig";

// Tumhari Key (Jo tumne bheji thi, ye sahi hai)
const stripePromise = loadStripe("pk_test_51Ss8vC2LnJkSXOsFldPdgxzCeAYlaAlKumuNLssAyW12SZCJYBpK7KmyJUcByJdG4ankj0JkFgrm5xlMsLvVmeQV00zIVcsAZa");

const CheckoutForm = ({ orderId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");

// const { orderId } = useSelector(store => store.order);

  useEffect(() => {
    // 👇 FIX: Agar Order ID nahi hai to ruk jao, API call mat karo
    if (!orderId) {
        console.log("Waiting for Order ID...");
        return;
    }

    const getClientSecret = async () => {
      try {
        console.log("Requesting Payment for Order ID:", orderId);
        const { data } = await api.post(`/api/payments/${orderId}`);
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.log("Error fetching payment intent", error);
      }
    };
    getClientSecret();
  }, [orderId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      alert(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        await api.post("/api/payments/update", {
          paymentId: result.paymentIntent.id,
          orderId: orderId,
          status: "COMPLETED"
        });
        alert("Payment Successful!");
        navigate("/account/order");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 border rounded-md shadow-md mt-5 bg-white">
      <h3 className="text-xl font-bold mb-4">Pay with Card</h3>
      
      {/* Agar ClientSecret nahi aya, to loading dikhao */}
      {!clientSecret && orderId && <p className="text-sm text-gray-500 mb-2">Loading payment details...</p>}
      {!orderId && <p className="text-sm text-red-500 mb-2">Error: Order ID Missing</p>}

      <div className="p-4 border rounded mb-4 bg-gray-50">
        <CardElement 
            options={{
                style: {
                    base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } },
                    invalid: { color: '#9e2146' },
                },
            }}
        />
      </div>
      
      <button
        type="submit"
        // Button tab hi chalega jab Stripe load ho aur Secret mil jaye
        disabled={!stripe || !clientSecret}
        className={`w-full py-3 rounded font-bold text-white transition-all ${
            !stripe || !clientSecret 
            ? "bg-gray-400 cursor-not-allowed" 
            : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        Pay Now
      </button>
    </form>
  );
};

const PaymentPage = ({ orderId }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm orderId={orderId} />
  </Elements>
);

export default PaymentPage;