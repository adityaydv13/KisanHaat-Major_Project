import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MachineryPage = () => {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/machines`)
      .then(response => setMachines(response.data))
      .catch(error => console.error('Error fetching machinery:', error));
  }, []);

  return (
    <div>
      <h1>Available Machinery</h1>
      <ul>
        {machines.map(machine => (
          <li key={machine._id}>{machine.name} - {machine.price} per hour</li>
        ))}
      </ul>
    </div>
  );
};

export default MachineryPage;