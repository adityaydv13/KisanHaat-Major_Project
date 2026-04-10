// src/pages/PaymentReturn.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const PaymentReturn = () => {
  const [status, setStatus] = useState("Checking...");
  const [raw, setRaw] = useState(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const transactionId = url.searchParams.get("transactionId");
    const hireId = url.searchParams.get("hireId");

    const checkStatus = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/pay/status`,
          { params: { transactionId } }
        );

        setRaw(data);
        const code = data?.data?.code;          
        const statusText = data?.data?.data?.state; 
        if (code === "PAYMENT_SUCCESS" || statusText === "COMPLETED") {
          setStatus("Payment Successful ✅");
          if (hireId) {
            const token = localStorage.getItem("token");
            try {
              await axios.put(
                `${import.meta.env.VITE_API_URL}/api/hire/${hireId}/pay`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
              );
              console.log("Hire marked as paid.");
            } catch (hireErr) {
              console.error("Failed to mark as paid:", hireErr);
            }
          }
        } else if (statusText === "PENDING") {
          setStatus("Payment Pending ⏳");
        } else {
          setStatus("Payment Failed");
        }
      } catch (e) {
        console.error(e);
        setStatus("Error while checking status");
      }
    };

    if (transactionId) checkStatus();
  }, []);

  return (
    <div style={{ maxWidth:600, margin:"60px auto", padding:"20px", textAlign: "center" }}>
      <h2>{status}</h2>
      <pre style={{ background:"#f5f5f5", padding:12, overflow:"auto", textAlign: "left" }}>
        {JSON.stringify(raw, null, 2)}
      </pre>
      <button 
        onClick={() => { window.location.href = '/my-requests' }}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Go Back
      </button>
    </div>
  );
};

export default PaymentReturn;
