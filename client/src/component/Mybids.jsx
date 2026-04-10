 

// export default MyBids;
import React, { useEffect, useState } from "react";
import axios from "axios";
import  CheckoutButton  from "./CheckoutButton"; 

// razorpay 
import RazorpayButton from "./RazorpayButton"

const MyBids = () => {
  const [bids, setBids] = useState([]);
  const token = localStorage.getItem("token");

  const fetchMyBids = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/crops/bids/mybids`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBids(res.data);
    } catch (error) {
      console.error("Error fetching my bids:", error);
    }
  };

  useEffect(() => {
    fetchMyBids();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-100 rounded-xl shadow-lg font-sans">
      <h2 className="text-center mb-8 text-gray-800 text-2xl tracking-wide">My Bids</h2>
      {bids.map(bid => (
        <div 
          key={bid._id} 
          className="border-l-4 border-indigo-600 rounded-lg p-5 mb-5 bg-white/90 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          <p className="text-gray-700 mb-1"><strong className="text-gray-900">Crop:</strong> {bid.postId?.title}</p>
          <p className="text-gray-700 mb-1"><strong className="text-gray-900">Amount:</strong> ₹{bid.bidAmount}</p>
          <p className="text-gray-700 mb-2"><strong className="text-gray-900">Status:</strong> {bid.status}</p>
          
          {bid.status === "ACCEPTED" && (
            <CheckoutButton bidId={bid._id} initialAmount={bid.bidAmount} />
          )}

          {/* razorpay */}

          {bid.status === "ACCEPTED" && (
            <RazorpayButton bidId={bid._id} initialAmount={bid.bidAmount} />
          )
          }
        </div>
      ))}
    </div>
  );
};

export default MyBids;
