import React, { useContext } from "react";
import { ShopContext } from "./Shop-Context";

export const Product = (props) => {
  const { product_id, name, price, image_path } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemCount = cartItems[product_id];

  return (
    <div className="product">
      <img src={require(`${image_path}`)} alt={"img"} />
      <div className="description">
        <p>
          <b>{name}</b>
        </p>
        <p>{price}</p>
      </div>
      <button className="addToCartBttn" onClick={() => addToCart(product_id)}>
        Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
  );
};