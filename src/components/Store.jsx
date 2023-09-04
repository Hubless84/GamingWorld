import React, { useState, useContext } from "react";
import { ShopContext } from "./Shop-Context";
import StoreFilter from "./StoreFilter";
import { Product } from "./Product";
import "./Store.css";

const Store = () => {
  const [filterTextvalue, updateFilterText] = useState("all");
  const { products } = useContext(ShopContext); 

  let filteredProductList = products.filter((product) => {
    if (filterTextvalue === "Gaming Mouses") {
      return product.type === "Mouse";
    } else if (filterTextvalue === "Gaming Keyboards") {
      return product.type === "Keyboard";
    } else if (filterTextvalue === "Gaming Headphones") {
      return product.type === "Headphones";
    } else if (filterTextvalue === "Gaming pads") {
      return product.type === "Gamepad";
    } else if (filterTextvalue === "Gaming Controllers") {
      return product.type === "GameController";
    } else {
      return true;
    }
  });

  function onFilterValueSelected(FilterValue) {
    updateFilterText(FilterValue);
  }

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>Gaming World Shop</h1>
      </div>
      <div className="StoreFilter">
        <StoreFilter onFilterValueSelected={onFilterValueSelected}></StoreFilter>
      </div>

      <div className="products">
        {filteredProductList.map((product) => (
          <Product data={product} key={product.product_id} />
        ))}
      </div>
    </div>
  );
};

export default Store;
