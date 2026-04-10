 
import React, { useEffect, useState } from "react";
import axios from "axios";

const HireMachine = () => {
  const [machines, setMachines] = useState([]);
  const [filters, setFilters] = useState({ location: "", type: "", maxPrice: "" });
  const userName = localStorage.getItem("userName"); // logged-in user's name

  // Fetch all machines
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/machines`)
      .then(response => setMachines(response.data))
      .catch(error => console.error("Error fetching machines:", error));
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

const token = localStorage.getItem("token");
const user = localStorage.getItem("userName");

const handleHire = (machineId) => {
  if (!userName) return alert("Please login to hire machines");

  axios.post(
    `${import.meta.env.VITE_API_URL}/api/hire`,
    { machineId },  // ✅ fixed
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  )
  .then(() => alert("Rental request sent successfully!"))
  .catch(err => alert(err.response?.data?.message || "Error sending request"));
};


  const filteredMachines = machines.filter(machine =>
    (filters.location ? machine.location.toLowerCase().includes(filters.location.toLowerCase()) : true) &&
    (filters.type ? machine.type.toLowerCase().includes(filters.type.toLowerCase()) : true) &&
    (filters.maxPrice ? machine.price <= parseFloat(filters.maxPrice) : true)
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Hire a Machine</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          placeholder="Location"
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
        />
        <input
          placeholder="Type"
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
        />
        <input
          placeholder="Max Price"
          name="maxPrice"
          type="number"
          value={filters.maxPrice}
          onChange={handleFilterChange}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {filteredMachines.map(machine => (
          <div key={machine._id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
            <img src={machine.imageUrl} alt={machine.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
            <h3>{machine.name}</h3>
            <p>Type: {machine.type}</p>
            <p>Location: {machine.location}</p>
            <p>Price: ${machine.price}/day</p>
            <button onClick={() => handleHire(machine._id)} style={{ marginTop: "10px", padding: "5px 10px", cursor: "pointer" }}>
              Hire
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HireMachine;
