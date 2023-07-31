import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "./Shop-Context";
import { Products } from "./Products";
import { CartItem } from "./Cart_item";
import "./Cart.css";

export const Cart = () => {
  const { cartItems, getTotalCartAmount, resetCart } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  const handleContinuePurchase = () => {
    navigate("/Payment", { state: { totalAmount: totalAmount } });
  };

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {Products.map((Product) => {
          if (cartItems[Product.id] !== 0) {
            return <CartItem data={Product} />;
          }
          return null;
        })}
      </div>

      {totalAmount > 0 ? (
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
              reset Cart{" "}
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