/*import { useEffect } from "react";

const Products = ({ onDataFetched }) => {
  
  useEffect(() => {
    // Make a GET request to fetch product data from your database API endpoint
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched products2:", data);
        // Pass the fetched data to a callback function
        onDataFetched(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [onDataFetched]);

  // No need to return anything since this component doesn't render anything in the DOM
  return null;
};

export default Products;*/