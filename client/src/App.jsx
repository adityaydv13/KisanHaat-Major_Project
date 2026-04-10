 


import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./component/Navbar"; 
import LoginAndSignup from "./pages/LoginandSignup";
import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";

// bids
import ReceivedBids from "./component/ShowBids";
import MyBids from "./component/Mybids";

// Rental imports
import Hhome from "./rental/rentalcomponents/rentalpages/Home";
import CategoryPage from "./rental/rentalcomponents/rentalpages/CategoryPage";
import MachineryList from "./rental/rentalcomponents/MachineryList";
import MachineryDetail from "./rental/rentalcomponents/MachineryDetail";
import MyRequests from "./rental/rentalcomponents/rentalpages/Requester";

// Payment imports
import CheckoutButton from "./component/CheckoutButton";
import PaymentReturn from "./pages/PaymentReturn";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("farmer");  // ✅ keep role here

  const toggleRole = () => {
    setUserRole(prev => (prev === "farmer" ? "contractor" : "farmer"));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
  };

  // Layout wrapper ensures navbar/header is always visible
  const Layout = ({ children }) => (
    <div>
      <Navbar 
        isAuthenticated={isAuthenticated} 
        handleLogout={handleLogout} 
        userRole={userRole}        
        onSwitchRole={toggleRole}  
      />
      <div>{children}</div>
    </div>
  );

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginAndSignup setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<LoginAndSignup setIsAuthenticated={setIsAuthenticated} />} />
        
        {/* Home with role toggle */}
        <Route 
          path="/" 
          element={
            <Layout>
              <Home userRole={userRole} setUserRole={setUserRole} />
            </Layout>
          } 
        />

        {/* Payment Routes */}
        <Route path="/checkout" element={<Layout><CheckoutButton /></Layout>} />
        <Route path="/payment-return" element={<Layout><PaymentReturn /></Layout>} />

        {/* Other Pages */}
        <Route path="/faq" element={<Layout><FAQ /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />


       {/* Bids */}
        <Route path="/my-bids" element={<MyBids />} />
        <Route path="/received-bids" element={<ReceivedBids />} />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <Layout>
              {isAuthenticated ? <Profile handleLogout={handleLogout} /> : <Navigate to="/login" />}
            </Layout>
          }
        />

        {/* Rental Routes */}
        <Route path="/rentalhome" element={<Layout><Hhome /></Layout>} />
        <Route path="/machinerylist" element={<Layout><MachineryList /></Layout>} />
        <Route path="/hire-machine" element={<Layout><MachineryDetail /></Layout>} />
        <Route path="/category/:categoryName" element={<Layout><CategoryPage /></Layout>} />

        {/* Requests (protected) */}
        <Route
          path="/requests"
          element={
            <Layout>
              {isAuthenticated ? <MyRequests /> : <Navigate to="/login" />}
            </Layout>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
