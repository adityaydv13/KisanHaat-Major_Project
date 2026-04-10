import React, { useState } from "react";
import axios from "axios";

const RazorpayButton = ({ bidId, initialAmount = 499 }) => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(initialAmount); // in rupees

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const payNow = async () => {
    try {
      setLoading(true);

      // Load SDK
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        alert("Razorpay SDK failed to load.");
        return;
      }

      // 1. Create order on backend
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/pay/razorpay/create`, {
        amount,
        bidId,
      });

      if (!data?.orderId) {
        alert("Failed to create Razorpay order");
        return;
      }

      // 2. Configure Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // public key from Razorpay
        amount: data.amount,
        currency: data.currency,
        name: "KisanHaat",
        description: "Machine Rental Payment",
        order_id: data.orderId,
        handler: async function (response) {

          // Send payment verification to backend
          
          const verifyRes = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/pay/razorpay/verify`,
            {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              bidId,
            }
          );

          if (verifyRes.data.success) {
            alert("Payment successful ✅");
          } else {
            alert("Payment verification failed ❌");
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (e) {
      console.error(e);
      alert("Payment init failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={payNow}
      className="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-400 to-purple-600 shadow-md hover:from-purple-600 hover:to-purple-800 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Processing..." : "Pay with Razorpay"}
    </button>
  );
};

export default RazorpayButton;
