import { createContext, useState, useEffect } from "react";

//context provider for managing a shopping cart

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);

  // Define getDefaultCart using products 
  const getDefaultCart = () => {
    let cart = {};
    for (const product of products) {
      cart[product.product_id] = 0;
    }
    return cart;
  };

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched products:", data);
        setProducts(data);

        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        } else {
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
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = products.find((product) => product.product_id === Number(item));
        
        // Check if itemInfo is found and it has a valid price
        if (itemInfo && typeof itemInfo.price === 'number') {
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

  //function to add product to cart
  const addToCart = (itemId) => {
    // Update cartItems state
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + 1,
    }));

    const updatedCart = { ...cartItems, [itemId]: cartItems[itemId] + 1 };
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  //function to remove product from cart
  const removeFromCart = (itemId) => {
    // Update cartItems state
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));

    const updatedCart = { ...cartItems, [itemId]: cartItems[itemId] - 1 };
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  //function to update the items in the cart
  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  //function to remove all items in the cart
  const resetCart = () => {
    setCartItems(getDefaultCart(), () => {
      localStorage.removeItem("cart")
      
    });
  };

  const payMent = () => {
    setCartItems(getTotalCartAmount());
  };

  //funciton to get all the products in the cart
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

  //return contex value
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
