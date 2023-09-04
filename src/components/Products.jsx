import { useEffect, useState } from "react";

const Products = ({ onDataFetched }) => {
  const [Products, setProducts] = useState([]);


  useEffect(() => {
    // Make a GET request to fetch product data from your database API endpoint
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        // Pass the fetched data to a callback function
        onDataFetched(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [onDataFetched]);

  return null; // This component doesn't render any UI
};
export default Products;


