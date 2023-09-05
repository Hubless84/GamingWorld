import { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);

  // Define getDefaultCart using products after it's initialized
  const getDefaultCart = () => {
    let cart = {};
    for (const product of products) {
      cart[product.product_id] = 0;
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
    console.log('cartItems:', cartItems);
    let totalAmount = 0;
    // Loop through each item in cartItems
    for (const item in cartItems) {
      // Check if the quantity is greater than 0
      if (cartItems[item] > 0) {
        // Find the corresponding product using its product_id
        const itemInfo = products.find((product) => product.product_id === Number(item));
        
        // Check if itemInfo is found and it has a valid price
        if (itemInfo && typeof itemInfo.price === 'number') {
          // Calculate and add the subtotal for this item to the totalAmount
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
      localStorage.removeItem("cart")
      
    });
  };

  const payMent = () => {
    setCartItems(getTotalCartAmount());
  };

  const getProductsInCart = () => {
    const productsInCart = [];
  
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const product = products.find((p) => p.product_id === Number(itemId));
  
        if (product) {
          productsInCart.push({
            ...product,
            quantity: cartItems[itemId],
          });
        }
      }
    }
  
    return productsInCart;
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
    getProductsInCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
