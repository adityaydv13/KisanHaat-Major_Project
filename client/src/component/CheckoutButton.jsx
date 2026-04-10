
// src/components/CheckoutButton.jsx
import React, { useState } from "react";
import axios from "axios";

const CheckoutButton = ({ bidId, initialAmount = 499 }) => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(initialAmount); // rupees

  const payNow = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/pay/create`, {
        amount,
        bidId,
      });
      if (data?.redirectUrl) {
        window.location.href = data.redirectUrl; // go to PhonePe
      } else {
        alert("Failed to get redirect URL");
      }
    } catch (e) {
      console.error(e);
      alert("Payment init failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        min={1}
        style={{ padding: 8 }}
      />
      <button
  disabled={loading}
  onClick={payNow}
  className="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-400 to-blue-600 shadow-md hover:from-blue-600 hover:to-blue-800 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading ? "Redirecting..." : "Pay with PhonePe"}
</button>
    </div>
  );
};

export default CheckoutButton;