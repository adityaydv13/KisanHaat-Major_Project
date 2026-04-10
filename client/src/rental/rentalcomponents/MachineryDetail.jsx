import { useState, useEffect } from 'react';
import axios from 'axios';
import "./rentalpages/styling/MachineryDetail.css"; // ✅ Import CSS for styling

const MachineryDetail = () => {
  const [machine, setMachine] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [cart, setCart] = useState([]); // ✅ Store cart items
  const [isLoading, setIsLoading] = useState(false); // ✅ Loading state

  // ✅ Load cart from localStorage on page load and fetch latest from DB
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
    fetchCart();
  }, []);

  // ✅ Sync cart updates to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Fetch Cart from Backend
  const fetchCart = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/machinery/cart`);
      console.log("Fetched Cart from API:", response.data);
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error.response?.data || error);
      setCart([]);
    }
  };

  // ✅ Fetch Machinery Details
  const fetchMachinery = async () => {
    if (!searchName.trim()) {
      setErrorMessage('Please enter a machine name.');
      setMachine(null);
      return;
    }

    setIsLoading(true); // START LOADING
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/machinery?name=${searchName}`);
      if (response.data) {
        setMachine(response.data);
        setErrorMessage('');
      } else {
        setMachine(null);
        setErrorMessage('Machine does not exist.');
      }
    } catch (error) {
      setMachine(null);
      setErrorMessage(error.response?.data?.message || 'Error fetching machinery.');
    } finally {
      setIsLoading(false); // STOP LOADING
    }
  };

  // ✅ Add to Cart
  const addToCart = async () => {
    if (machine) {
      console.log("Adding to cart:", machine);

      const cartItem = {
        machineId: machine._id,
        name: machine.name,
        description: machine.description || "No description available",
      };

      // ✅ Prevent duplicate entries in cart
      if (cart.some(item => item.machineId === cartItem.machineId)) {
        alert(`${cartItem.name} is already in the cart!`);
        return;
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/machinery/cart`,
          cartItem,
          { headers: { "Content-Type": "application/json" } }
        );

        console.log('Cart Response:', response.data);

        if (response.status === 201) {
          alert(`${response.data.cartItem.name} added to cart!`);

          // ✅ Update UI by adding new item
          setCart(prevCart => [...prevCart, response.data.cartItem]);
        }
      } catch (error) {
        console.error('Error adding to database cart:', error.response?.data || error);
      }
    }
  };
  // handle hire 
const handleHire = async () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (!storedUser?._id) {
    alert("You must be logged in to hire a machine.");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/hire`,
      { machineId: machine._id },
      { headers: { Authorization: `Bearer ${token}`} }
    );
    alert("Hire request sent!");
  } catch (err) {
    console.error("Error hiring machine:", err.response || err.message);
    alert(err.response?.data?.message || "Failed to send hire request.");
  }
};

  return (
    <div className="machinery-detail-container">
    <h2>Search Machinery</h2>
    <div className="search-box">
      <input
        type="text"
        placeholder="Enter Machine Name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <button onClick={fetchMachinery} disabled={isLoading}>Search</button>
    </div>

    {/* ✅ Loading Spinner */}
    {isLoading && (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    )}

    {errorMessage && !isLoading && <p className="error-message">{errorMessage}</p>}

    {machine && !isLoading && (
      <div className="machine-details">
        <h3>{machine.name}</h3>
        <p>{machine.description}</p>
        <p>Price: ${machine.pricePerDay} / day</p>
        <button className="add-cart-btn" onClick={addToCart}>Add to Cart</button>
      </div>
    )}

    {/* ✅ Display Only Items Saved in Database */}
    <div className="cart-container">
      <h2>Cart Items</h2>
      <ul className="cart-list">
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <li key={index}>
               
              <strong>{item.name}</strong> - {item.description}
                <br />
                <button onClick={() => handleHire(item)}>Hire</button>
            </li>
          ))
        ) : (
          <p>Cart is empty.</p>
        )}
      </ul>
    </div>
  </div>
  );
};

export default MachineryDetail;


  