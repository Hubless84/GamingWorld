import React, { useState } from "react";
import Products  from "./Products";
import { Product } from "./Product";
import "./Store.css";
import StoreFilter from "./StoreFilter";

const Store = () => {
  const [filterTextvalue, updateFilterText] = useState("all");
  const [fetchedProducts, setFetchedProducts] = useState([]);

  const handleDataFetched = (data) => {
    setFetchedProducts(data);
  };

  let filteredProductList = fetchedProducts.filter((Product) => {
    if (filterTextvalue === "Gaming Mouses") {
      return Product.type === "Mouse";
    } else if (filterTextvalue === "Gaming Keyboards") {
      return Product.type === "Keyboard";
    } else if (filterTextvalue === "Gaming Headphones") {
      return Product.type === "Headphones";
    } else if (filterTextvalue === "Gaming pads") {
      return Product.type === "Gamepad";
    } else if (filterTextvalue === "Gaming Controllers") {
      return Product.type === "GameController";
    } else {
      return Product;
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
          <Product data={product} key={product.id} />
        ))}
      </div>

      <Products onDataFetched={handleDataFetched} />
    </div>
  );
};

export default Store;