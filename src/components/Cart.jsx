import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "./Shop-Context";
import Products from "./Products"; 
import { CartItem } from "./Cart_item";
import "./Cart.css";

export const Cart = () => {
  const { cartItems, getTotalCartAmount, resetCart } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  const handleContinuePurchase = () => {
    navigate("/Payment", { state: { totalAmount: totalAmount } });
  };

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {/* Use the Products component to fetch and display products */}
        <Products onDataFetched={(fetchedData) => {
          fetchedData.map((Product) => {
            if (cartItems[Product.product_id] !== 0) {
              return <CartItem data={Product} />;
            }
            return null;
          });
        }} />
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
