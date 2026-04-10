import React from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { categoryName } = useParams();

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Machines</h1>
      <p>Here you'll see all available {categoryName} machines for rent.</p>
      {/* Here you can map real data or placeholder items */}
    </div>
  );
};

export default CategoryPage;
