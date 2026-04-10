// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const FetchPosts = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentPost, setCurrentPost] = useState(null);
//   const [bidAmount, setBidAmount] = useState('');

//   const token = localStorage.getItem('token');
//   console.log("Token in FetchPosts:", token);

//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       // Add random dates and durations to each post
//       const postsWithDates = response.data.map(post => ({
//         ...post,
//         createdAt: new Date(Date.now()), // Random date within last 30 days
//         dealDuration: Math.floor(Math.random() * 6) + 1 // Random duration between 1 and 6 months
//       }));
//       setPosts(postsWithDates);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
 

//   const openModal = (post) => {
//     setCurrentPost(post);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setBidAmount('');
//   };

//   // const submitBid = async () => {
//   //   if (!currentPost) return;
//   //  console.log("Token being sent:", token);
//   //   try {
//   //     await axios.post(`${import.meta.env.VITE_API_URL}/api/crops/bids`, 
//   //       { postId: currentPost._id, bidAmount },
//   //       { headers: { Authorization: `Bearer ${token}` } }
//   //     );
//   //     alert('Bid sent successfully!');
//   //   } catch (error) {
//   //     console.error('Error sending bid:', error);
//   //     alert('Error sending bid. Please try again.');
//   //   } finally {
//   //     closeModal();
//   //   }
//   // };
// const submitBid = async () => {
//   if (!currentPost) return;
    
//   console.log("Token being sent:", token);

//   try {
//     await axios.post(
//       `${import.meta.env.VITE_API_URL}/api/crops/bids`,
//       { postId: currentPost._id, bidAmount },
//       { headers: { Authorization: `Bearer ${token}` } } // or just token depending on backend
//     );
//     alert("Bid sent successfully!");
//   } catch (error) {
//     console.error("Error sending bid:", error.response?.data || error.message);
//     alert("Error sending bid. Please try again.");
//   } finally {
//     closeModal();
//   }
// };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   useEffect(() => {
//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('show');
//         }
//       });
//     });

//     const hiddenElements = document.querySelectorAll('.hidden-card');
//     hiddenElements.forEach((el) => observer.observe(el));

//     return () => {
//       hiddenElements.forEach((el) => observer.unobserve(el));
//     };
//   }, [posts]);

//   const formatDate = (date) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return date.toLocaleDateString(undefined, options);
//   };

//   const calculateEndDate = (startDate, durationMonths) => {
//     const endDate = new Date(startDate);
//     endDate.setMonth(endDate.getMonth() + durationMonths);
//     return formatDate(endDate);
//   };

//   return (
//     <div className="mt-8 px-4 lg:px-8">
//       <style jsx>{`
//         .hidden-card {
//           opacity: 0;
//           filter: blur(5px);
//           transform: translateX(-100%);
//           transition: all 1s;
//         }
//         .show {
//           opacity: 1;
//           filter: blur(0);
//           transform: translateX(0);
//         }
//         @media(prefers-reduced-motion) {
//           .hidden-card {
//             transition: none;
//           }
//         }
//       `}</style>

//       <div className="container mx-auto mb-8">
//         <h1 className="text-4xl font-bold text-center text-green-700">Active Deals</h1>
//         <p className="text-center text-gray-600 mt-2">Scroll to discover available produce from farmers</p>
//       </div>

//       {loading ? (
//         <div className="text-center">
//           <p className="text-xl">Loading active deals...</p>
//         </div>
//       ) : (
//         <div className="container mx-auto space-y-12">
//           {posts.map((post, index) => (
//             <div key={post._id} className={`hidden-card bg-white shadow-lg rounded-lg flex flex-col p-6 relative hover:shadow-xl transition-shadow duration-300 ${index % 2 === 0 ? 'lg:ml-24' : 'lg:mr-24'}`} style={{transitionDelay: `${index * 200}ms`}}>
//               <div className="flex-1">
//                 <h3 className="text-2xl font-semibold text-green-700">{post.plants.join(', ')}</h3>
//                 <p className="text-md text-gray-700 mt-3"><span className="font-medium">Description:</span> {post.description}</p>
//                 <div className="mt-4 grid grid-cols-2 gap-4">
//                   <p className="text-sm text-gray-700"><span className="font-medium">Amount:</span> ₹{post.amount}</p>
//                   <p className="text-sm text-gray-700"><span className="font-medium">Quantity:</span> {post.quantity} Kg</p>
//                   <p className="text-sm text-gray-700"><span className="font-medium">Mobile:</span> {post.mobileNumber}</p>
//                   <p className="text-sm text-gray-700"><span className="font-medium">Status:</span> {post.isActive ? 'Active' : 'Inactive'}</p>
//                 </div>
//                 <p className="text-sm text-gray-700 mt-4"><span className="font-medium">Farmer:</span> {post.farmerName}</p>
//                 <p className="text-sm text-gray-700 mt-2"><span className="font-medium">Posted on:</span> {formatDate(post.createdAt)}</p>
//                 <p className="text-sm text-gray-700 mt-2"><span className="font-medium">Deal Duration:</span> {post.dealDuration} months</p>
//                 <p className="text-sm text-gray-700 mt-2"><span className="font-medium">Deal Ends on:</span> {calculateEndDate(post.createdAt, post.dealDuration)}</p>
//               </div>
//               <button 
//                 className="mt-6 w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 transition-colors duration-300 text-lg font-semibold" 
//                 onClick={() => openModal(post)}
//               >
//                 Place Your Bid
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
//             <h2 className="text-3xl font-semibold mb-6 text-green-700">Bid on {currentPost?.plants.join(', ')}</h2>
//             <p className="mb-3 text-lg"><span className="font-medium">Crop:</span> {currentPost?.description}</p>
//             <p className="mb-3 text-lg"><span className="font-medium">Farmer's Ask:</span> ₹{currentPost?.amount}</p>
//             <p className="mb-3 text-lg"><span className="font-medium">Posted on:</span> {formatDate(currentPost?.createdAt)}</p>
//             <p className="mb-6 text-lg"><span className="font-medium">Deal Ends on:</span> {calculateEndDate(currentPost?.createdAt, currentPost?.dealDuration)}</p>
//             <div className="mb-6">
//               <label htmlFor="bidAmount" className="block text-lg font-medium text-gray-700 mb-2">Your Offer</label>
//               <input
//                 type="number"
//                 id="bidAmount"
//                 value={bidAmount}
//                 onChange={(e) => setBidAmount(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
//                 placeholder="Enter your bid amount"
//               />
//             </div>
//             <div className="flex justify-end space-x-4">
//               <button 
//                 className="px-6 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-300 text-lg font-medium" 
//                 onClick={closeModal}
//               >
//                 Cancel
//               </button>
//               <button 
//                 className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300 text-lg font-medium" 
//                 onClick={submitBid}
//               >
//                 Submit Bid
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FetchPosts;











// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const FetchPosts = () => {
//   const [posts, setPosts] = useState([]);
//   const [filteredPosts, setFilteredPosts] = useState([]);
//   const [selectedType, setSelectedType] = useState("All");
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentPost, setCurrentPost] = useState(null);
//   const [bidAmount, setBidAmount] = useState('');

//   const token = localStorage.getItem('token');

//   const fetchPosts = async () => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_URL}/api/posts/`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const data = res.data.map(post => ({
//         ...post,
//         createdAt: new Date(),
//         dealDuration: Math.floor(Math.random() * 6) + 1
//       }));

//       setPosts(data);
//       setFilteredPosts(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   /* ---------------- CATEGORY FILTER ---------------- */
//   const categories = ["All", "Vegetable", "Fruit", "Grain", "Pulses"];

//   useEffect(() => {
//     if (selectedType === "All") {
//       setFilteredPosts(posts);
//     } else {
//       setFilteredPosts(
//         posts.filter(post => post.itemType === selectedType)
//       );
//     }
//   }, [selectedType, posts]);

//   /* ---------------- MODAL ---------------- */
//   const openModal = post => {
//     setCurrentPost(post);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setBidAmount('');
//   };

//   const submitBid = async () => {
//     if (!currentPost) return;

//     try {
//       await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/crops/bids`,
//         { postId: currentPost._id, bidAmount },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("Bid placed successfully!");
//     } catch (err) {
//       alert("Failed to place bid");
//     } finally {
//       closeModal();
//     }
//   };

//   const formatDate = date =>
//     new Date(date).toLocaleDateString();

//   const calculateEndDate = (date, months) => {
//     const d = new Date(date);
//     d.setMonth(d.getMonth() + months);
//     return formatDate(d);
//   };

//   return (
//     <div className="mt-6 px-4 lg:px-8">

//       {/* -------- CATEGORY TABS -------- */}
//       <div className="flex justify-center gap-3 mb-8 flex-wrap">
//         {categories.map(type => (
//           <button
//             key={type}
//             onClick={() => setSelectedType(type)}
//             className={`px-5 py-2 rounded-full text-sm font-semibold transition
//               ${selectedType === type
//                 ? "bg-green-600 text-white"
//                 : "bg-green-100 text-green-700 hover:bg-green-200"
//               }`}
//           >
//             {type}
//           </button>
//         ))}
//       </div>

//       {/* -------- DEALS -------- */}
//       {loading ? (
//         <p className="text-center">Loading deals...</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredPosts.map(post => (
//             <div
//               key={post._id}
//               className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg"
//             >
//               <h3 className="text-lg font-semibold text-green-700">
//                 {post.plants.join(', ')}
//               </h3>

//               <p className="text-sm text-gray-700 mt-1">
//                 {post.description}
//               </p>

//               <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
//                 <p>₹{post.amount}</p>
//                 <p>{post.quantity} Kg</p>
//                 <p>{post.mobileNumber}</p>
//                 <p>{post.isActive ? "Active" : "Inactive"}</p>
//               </div>

//               <p className="text-xs mt-2">
//                 Farmer: {post.farmerName}
//               </p>

//               <p className="text-xs mt-1">
//                 Posted: {formatDate(post.createdAt)}
//               </p>

//               <p className="text-xs mt-1">
//                 Ends: {calculateEndDate(post.createdAt, post.dealDuration)}
//               </p>

//               <button
//                 onClick={() => openModal(post)}
//                 className="mt-3 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 text-sm"
//               >
//                 Place Bid
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* -------- MODAL -------- */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded w-full max-w-md">
//             <h2 className="text-xl font-semibold mb-4">
//               Bid on {currentPost?.plants.join(', ')}
//             </h2>

//             <input
//               type="number"
//               value={bidAmount}
//               onChange={e => setBidAmount(e.target.value)}
//               className="w-full border px-3 py-2 rounded"
//               placeholder="Enter bid amount"
//             />

//             <div className="flex justify-end gap-3 mt-4">
//               <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">
//                 Cancel
//               </button>
//               <button onClick={submitBid} className="px-4 py-2 bg-green-600 text-white rounded">
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default FetchPosts;















import React, { useState, useEffect } from 'react';
import axios from 'axios';

const categories = ["All", "Vegetable", "Fruit", "Grain"]; // add more as needed

const FetchPosts = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [bidAmount, setBidAmount] = useState('');

  const token = localStorage.getItem('token');

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const postsWithDates = response.data.map(post => ({
        ...post,
        createdAt: new Date(Date.now()),
        dealDuration: Math.floor(Math.random() * 6) + 1
      }));

      setPosts(postsWithDates);
      setFilteredPosts(postsWithDates);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  useEffect(() => {
    if (selectedCategory === "All") setFilteredPosts(posts);
    else setFilteredPosts(posts.filter(post => post.plants.includes(selectedCategory)));
  }, [selectedCategory, posts]);

  const openModal = (post) => { setCurrentPost(post); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setBidAmount(''); };

  const submitBid = async () => {
    if (!currentPost) return;
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/crops/bids`,
        { postId: currentPost._id, bidAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Bid sent successfully!");
    } catch (error) {
      console.error("Error sending bid:", error.response?.data || error.message);
      alert("Error sending bid. Please try again.");
    } finally { closeModal(); }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('show'); });
    });

    const hiddenElements = document.querySelectorAll('.hidden-card');
    hiddenElements.forEach(el => observer.observe(el));
    return () => hiddenElements.forEach(el => observer.unobserve(el));
  }, [filteredPosts]);

  const formatDate = (date) => new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  const calculateEndDate = (startDate, durationMonths) => { const endDate = new Date(startDate); endDate.setMonth(endDate.getMonth() + durationMonths); return formatDate(endDate); };

  return (
    <div className="mt-6 px-2 lg:px-6">
      <style jsx>{`
        .hidden-card { opacity: 0; filter: blur(5px); transform: translateY(20px); transition: all 0.8s; }
        .show { opacity: 1; filter: blur(0); transform: translateY(0); }
        @media(prefers-reduced-motion) { .hidden-card { transition: none; } }
      `}</style>

      {/* Categories */}
      <div className="flex justify-center gap-2 mb-4 flex-wrap">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-full font-medium text-sm transition-colors ${
              selectedCategory === category ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Title */}
      <div className="container mx-auto mb-2">
        <h1 className="text-2xl font-bold text-center text-green-700">Active Deals</h1>
        <p className="text-center text-gray-600 text-sm mt-1">Scroll to discover available produce from farmers</p>
      </div>

      {loading ? (
        <div className="text-center text-sm">Loading active deals...</div>
      ) : (
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPosts.map((post, index) => (
            <div
              key={post._id}
              className={`hidden-card bg-white shadow-md rounded-lg flex flex-col p-2 relative hover:shadow-lg transition-shadow duration-300`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-green-700">{post.plants.join(', ')}</h3>
                <p className="text-xs text-gray-700 mt-0.5"><span className="font-medium">Description:</span> {post.description}</p>
                <div className="mt-0.5 grid grid-cols-2 gap-1 text-xs text-gray-700">
                  <p><span className="font-medium">Amount:</span> ₹{post.amount}</p>
                  <p><span className="font-medium">Quantity:</span> {post.quantity} Kg</p>
                  <p><span className="font-medium">Mobile:</span> {post.mobileNumber}</p>
                  <p><span className="font-medium">Status:</span> {post.isActive ? 'Active' : 'Inactive'}</p>
                </div>
                <p className="text-xs text-gray-700 mt-0.5"><span className="font-medium">Farmer:</span> {post.farmerName}</p>
                <p className="text-xs text-gray-700 mt-0.5"><span className="font-medium">Posted:</span> {formatDate(post.createdAt)}</p>
                <p className="text-xs text-gray-700 mt-0.5"><span className="font-medium">Duration:</span> {post.dealDuration} months</p>
                <p className="text-xs text-gray-700 mt-0.5"><span className="font-medium">Ends on:</span> {calculateEndDate(post.createdAt, post.dealDuration)}</p>
              </div>
              <button 
                className="mt-1 w-full bg-green-500 text-white py-1 rounded-md hover:bg-green-600 transition-colors duration-300 text-xs font-semibold"
                onClick={() => openModal(post)}
              >
                Place Your Bid
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-xl max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-3 text-green-700">Bid on {currentPost?.plants.join(', ')}</h2>
            <p className="mb-1 text-sm"><span className="font-medium">Crop:</span> {currentPost?.description}</p>
            <p className="mb-1 text-sm"><span className="font-medium">Farmer's Ask:</span> ₹{currentPost?.amount}</p>
            <p className="mb-1 text-sm"><span className="font-medium">Posted on:</span> {formatDate(currentPost?.createdAt)}</p>
            <p className="mb-2 text-sm"><span className="font-medium">Ends on:</span> {calculateEndDate(currentPost?.createdAt, currentPost?.dealDuration)}</p>

            <div className="mb-2">
              <label htmlFor="bidAmount" className="block text-xs font-medium text-gray-700 mb-1">Your Offer</label>
              <input
                type="number"
                id="bidAmount"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-xs"
                placeholder="Enter your bid"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-xs font-medium" onClick={closeModal}>Cancel</button>
              <button className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-xs font-medium" onClick={submitBid}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FetchPosts;
