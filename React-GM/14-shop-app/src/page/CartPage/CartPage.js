import React from "react";
import CartList from "./cart-list/CartList";

function CartPage() {
  return (
    <div className="page">
      <div className="container">
        <h1>장바구니</h1>
        <CartList />
      </div>
    </div>
  );
}

export default CartPage;
