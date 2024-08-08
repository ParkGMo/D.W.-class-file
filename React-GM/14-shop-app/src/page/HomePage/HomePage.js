import React from "react";
import FiltersCategory from "./filter-category/FiltersCategory";
import CountProducts from "./Count-products/CountProducts";

function HomePage() {
  return (
    <div className="page">
      <div className="container">
        <h1>Products</h1>
        <FiltersCategory />
        <CountProducts />
        {/* <CardList /> */}
      </div>
    </div>
  );
}

export default HomePage;
