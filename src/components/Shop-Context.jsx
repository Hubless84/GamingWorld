import { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);

  // Define getDefaultCart using products after it's initialized
  const getDefaultCart = () => {
    let cart = {};
    for (let i = 1; i < products.length + 1; i++) {
      cart[i] = 0;
    }
    return cart;
  };

  useEffect(() => {
    // Fetch product data when the component mounts
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched products:", data);
        // Update the products state with the fetched data
        setProducts(data);

        // Load cart data from localStorage AFTER setting products
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        } else {
          // Initialize the cart with default values if not found in localStorage
          setCartItems(getDefaultCart());
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);
  
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product.product_id === Number(item));
        if (itemInfo) {
          totalAmount += cartItems[item] * itemInfo.price;
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItemsCount = () => {
    let CartAmount = 0;
    for (const item in cartItems) {
      CartAmount += cartItems[item];
    }
    return CartAmount;
  };

  const addToCart = (itemId) => {
    // Update cartItems state
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + 1,
    }));

    // Update localStorage
    const updatedCart = { ...cartItems, [itemId]: cartItems[itemId] + 1 };
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (itemId) => {
    // Update cartItems state
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));

    // Update localStorage
    const updatedCart = { ...cartItems, [itemId]: cartItems[itemId] - 1 };
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const resetCart = () => {
    setCartItems(getDefaultCart(), () => {
    });
  };

  const payMent = () => {
    setCartItems(getTotalCartAmount());
  };

  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItemsCount,
    resetCart,
    payMent,
    products,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
