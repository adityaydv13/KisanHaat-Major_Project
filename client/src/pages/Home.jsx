

// import React, { useEffect, useState } from 'react';
// import Hero from '../component/Hero'; 
// import Farmer from '../component/Farmer'; 
// import Contractor from '../component/Contractor'; 
// import axios from 'axios'; 
// import Testimonials from '../component/Testimonials'; 
// import Footer from '../component/Footer';
// import Navbar from '../component/Navbar'; // Make sure you have Navbar

// const Home = () => {
//   const [userRole, setUserRole] = useState("farmer"); // Default role after login
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkUser = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (token) {
//           // Verify token (optional: you may skip role check since default is farmer)
//           await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//         }
//       } catch (error) {
//         console.error('Error verifying token:', error);
//         localStorage.removeItem('token');
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkUser();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//      {/* Navbar is  included in App.js */}
//       {/* <Navbar onSwitchRole={() => setUserRole(userRole === "farmer" ? "contractor" : "farmer")} /> */}

//       {userRole === "farmer" ? (
//         <Farmer />
//       ) : (
//         <Contractor />
//       )}

//       {/* If you still want common landing page when not logged in, you can keep this */}
//       {!localStorage.getItem("token") && (
//         <div>
//           <Hero />
//           <div className="mt-10">
//             <Testimonials />
//             <Footer />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;


import React, { useEffect, useState } from 'react';
import Hero from '../component/Hero'; 
import Farmer from '../component/Farmer'; 
import Contractor from '../component/Contractor'; 
import axios from 'axios'; 
import Testimonials from '../component/Testimonials'; 
import Footer from '../component/Footer';

const Home = ({ userRole }) => { // Receive userRole from App.jsx
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* Show Farmer or Contractor UI based on role from App.jsx */}
      {userRole === "farmer" ? <Farmer /> : <Contractor />}

      {/* Show common landing page if not logged in */}
      {!localStorage.getItem("token") && (
        <div>
          <Hero />
          <div className="mt-10">
            <Testimonials />
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
