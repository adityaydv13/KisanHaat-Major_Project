// MachineryList.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./rentalpages/styling/MachineryList.css"; // ✅ Import CSS

const MachineList = () => {
  const navigate = useNavigate();
  const [machines, setMachines] = useState([]);
  const [machineData, setMachineData] = useState({
    name: "",
    price: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to access this page.");
      navigate("/login");
    } else {
      fetchMachines();
    }
  }, [navigate]);

  const fetchMachines = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/machinery`);
      setMachines(response.data);
    } catch (error) {
      console.error("Error fetching machines:", error);
    }
  };

  const handleChange = (e) => {
    setMachineData({ ...machineData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to post a machine.");
      navigate("/login");
      return;
    }

    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/machinery`,
      machineData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    alert("Machine posted successfully!");
    setMachineData({ name: "", price: "", location: "", description: "" });
    fetchMachines();
  } catch (error) {
    console.error("Error posting machine:", error);
  }
};

const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this machine?")) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to delete a machine.");
        navigate("/login");
        return;
      }

      await axios.delete(
       `${import.meta.env.VITE_API_URL}/api/machinery/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Machine deleted successfully!");
      fetchMachines();
    } catch (error) {
      console.error("Error deleting machine:", error);
    }
  }
};


  return (
    <div className="machine-list-container">
      <h2>Post Your Machine</h2>
      
      {/* Post a Machine Form */}
      <form className="machine-list-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Machine Name" value={machineData.name} onChange={handleChange} required />
        <input type="text" name="price" placeholder="Price Per Day" value={machineData.price} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={machineData.location} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={machineData.description} onChange={handleChange} required></textarea>
        <button type="submit">Post Machine</button>
      </form>

      {/* List of Machines */}
      <h3>Available Machines</h3>
      <ul className="machine-list">
        {machines.map((machine) => (
          <li className="machine-item" key={machine._id}>
            <strong>{machine.name}</strong> - {machine.price} - {machine.location}
            <p>{machine.description}</p>
            <button onClick={() => handleDelete(machine._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MachineList;

