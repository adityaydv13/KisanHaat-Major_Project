 
import React from "react";
import { useNavigate } from "react-router-dom";
import "./styling/ModernHome.css";
import axios from "axios";
 
const Hhome = () => {
  const navigate = useNavigate();
  const [query,setQuery] = React.useState("");

 const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };
  // send a mail 
  const handlesubmitform = (e) => {
    e.preventDefault(); 
    const res = axios.post(`${import.meta.env.VITE_API_URL}/api/enquiries`, {
      name: e.target[0].value,
      email: e.target[1].value,
      message: e.target[2].value,
    })
    .then(() => {
      setQuery("Enquiry sent successfully!");
      e.target.reset(); // Clear the form
    })
    .catch((err) => {
      alert(err.response?.data?.message || "Error sending enquiry");
    });
  };

  return (
    <div className="mh-container">
      {/* Navbar */}
      <nav className="mh-navbar">
        <div className="mh-navbar-logo">
          <img src="/assets/logo.png" alt="Kisan Haat Logo" />
          <span>KisanHaat</span>
        </div>
        <div className="mh-navbar-links">
          <button className="mh-btn-outline" onClick={() => navigate("/requests")}>My Requests</button>
          <button className="mh-btn-outline" onClick={() => navigate("/machinerylist")}>Add Machine</button>
          <button className="mh-btn-primary" onClick={() => navigate("/hire-machine")}>Hire Machine</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="mh-hero">
        <div className="mh-hero-overlay"></div>
        <img src="/assets/ground.jpg" alt="Background" className="mh-hero-img" />
        <div className="mh-hero-content">
          <h1>Agriculture Machinery Rental</h1>
          <p>Empowering Farmers to Access Modern Machinery Easily</p>
          <button className="mh-btn-primary mh-btn-large" onClick={() => navigate("/hire-machine")}>
            Explore Machinery
          </button>
        </div>
      </div>

      {/* Categories */}
      <section className="mh-categories">
        <div className="mh-section-header">
           <h2>Explore Machinery Categories</h2>
           <div className="mh-accent-line"></div>
        </div>
        <div className="mh-gallery">
          <div className="mh-card" onClick={() => handleCategoryClick("ploughing")}>
            <div className="mh-card-img-wrapper">
               <img src="/assets/plouhing.jpg" alt="Ploughing" />
               <div className="mh-card-overlay"></div>
            </div>
            <div className="mh-card-content">
               <h3>Ploughing Machines</h3>
               <span className="mh-card-action">View Options &rarr;</span>
            </div>
          </div>
          <div className="mh-card" onClick={() => handleCategoryClick("tractor")}>
            <div className="mh-card-img-wrapper">
               <img src="/assets/tractor.jpg" alt="Tractor" />
               <div className="mh-card-overlay"></div>
            </div>
            <div className="mh-card-content">
               <h3>Tractors</h3>
               <span className="mh-card-action">View Options &rarr;</span>
            </div>
          </div>
          <div className="mh-card" onClick={() => handleCategoryClick("harvester")}>
            <div className="mh-card-img-wrapper">
               <img src="/assets/harvester.jpg" alt="Harvester" />
               <div className="mh-card-overlay"></div>
            </div>
            <div className="mh-card-content">
               <h3>Harvesters</h3>
               <span className="mh-card-action">View Options &rarr;</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mh-contact">
        <div className="mh-contact-wrapper">
          <div className="mh-contact-info">
            <h2>Contact & Inquiry</h2>
            <p>Have any questions or need assistance? Fill out the form, and our expert team will get back to you promptly.</p>
            <div className="mh-contact-decor">
               <div className="mh-decor-circle"></div>
               <div className="mh-decor-circle"></div>
            </div>
          </div>
          <div className="mh-contact-form-container">
            <form onSubmit={handlesubmitform} className="mh-form">
              <div className="mh-input-group">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="mh-input-group">
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="mh-input-group">
                <textarea placeholder="Your Message" rows="5" required></textarea>
              </div>
              <button type="submit" className="mh-btn-primary mh-btn-block">Send Enquiry</button>
              {query && <p className="mh-status-msg">{query}</p>}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hhome;
