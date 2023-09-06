import React, { useContext} from "react";
import { ShopContext } from "./Shop-Context";

export const CartItem = (props) => {
  const { product_id, name, price, image_path } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext);

  return (
    <div className="cartItem">
      <img src={require(`${image_path}`)} alt={"img"} />
      <div className="description">
        <p>
          <b>{name}</b>
        </p>
        <p> Price:{price}₪</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(product_id)}> - </button>
          <input
            value={cartItems[product_id]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), product_id)}
          />
          <button onClick={() => addToCart(product_id)}> + </button>
        </div>
      </div>
    </div>
  );
};