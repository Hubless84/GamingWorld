import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "./Shop-Context";
import { CartItem } from "./Cart_item";
import "./Cart.css";

export const Cart = () => {
  const { cartItems, getTotalCartAmount, resetCart } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const { products } = useContext(ShopContext); 
  const navigate = useNavigate();

  const handleContinuePurchase = () => {
    navigate("/Payment", { state: { totalAmount: totalAmount } });
  };

  // Check if there are any items in the cart
  const isCartEmpty = Object.values(cartItems).every(quantity => quantity === 0);

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {products.map((product) => {
          if (cartItems[product.product_id] !== 0) {
              return <CartItem data={product} key={product.product_id} />;
          }
          return null;
        })}
      </div>

      {!isCartEmpty ? (
        <>
          <div className="checkout">
            <p> Subtotal: ₪{totalAmount} </p>
            <button onClick={() => navigate("/")}> Continue Shopping </button>
            <button
              onClick={() => {
                resetCart();
                navigate("/Cart");
              }}
            >
              {" "}
              Reset Cart{" "}
            </button>
          </div>
          <div className="purchase">
            <button onClick={handleContinuePurchase}>Continue purchase</button>
          </div>
        </>
      ) : (
        <h1> Your Shopping Cart is Empty</h1>
      )}
    </div>
  );
};