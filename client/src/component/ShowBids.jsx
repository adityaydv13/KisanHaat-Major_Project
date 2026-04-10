import React, { useEffect, useState } from "react";
import axios from "axios";
 
const ReceivedBids = () => {
  const [bids, setBids] = useState([]);
  const token = localStorage.getItem("token");

  const fetchReceivedBids = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/crops/bids/received`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Bids from API:", res.data);
      setBids(res.data);
    } catch (error) {
      console.error("Error fetching bids:", error);
    }
  };

  const updateBidStatus = async (bidId, status) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/api/crops/bids/${bidId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchReceivedBids(); // refresh list
    } catch (error) {
      console.error("Error updating bid:", error);
    }
  };

  useEffect(() => {
    fetchReceivedBids();
  }, []);

return (
  <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-100 rounded-xl shadow-lg font-sans">
    <h2 className="text-center mb-8 text-gray-800 text-2xl tracking-wide">Received Bids</h2>
    {bids.map((bid) => (
      <div 
        key={bid._id} 
        className="border-l-4 border-indigo-600 rounded-lg p-5 mb-5 bg-white/90 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      >
        <p className="text-gray-700 mb-1"><strong className="text-gray-900">Crop:</strong> {bid.postId?.title}</p>
        <p className="text-gray-700 mb-1"><strong className="text-gray-900">Bidder:</strong> {bid.bidderId?.name}</p>
        <p className="text-gray-700 mb-1"><strong className="text-gray-900">Amount:</strong> ₹{bid.bidAmount}</p>
        <p className="text-gray-700 mb-2"><strong className="text-gray-900">Status:</strong> {bid.status}</p>
        
        {bid.status === "PENDING" && (
          <div className="flex flex-wrap gap-3 mt-3">
            <button
              onClick={() => {
                console.log("Updating bid with ID:", bid._id);
                updateBidStatus(bid._id, "ACCEPTED");
              }}
              className="flex-1 sm:flex-none px-5 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-green-400 to-green-600 shadow-md hover:from-green-600 hover:to-green-800 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
            >
              Accept
            </button>
            <button
              onClick={() => updateBidStatus(bid._id, "REJECTED")}
              className="flex-1 sm:flex-none px-5 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-red-400 to-red-600 shadow-md hover:from-red-600 hover:to-red-800 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    ))}
  </div>
);


};

export default ReceivedBids;
