import React from "react";
import CartList from "./cart-list/CartList";
import CheckOut from "./checkout/CheckOut";

function CartPage() {
  return (
    <div className="page">
      <div className="container">
        <h1>장바구니</h1>
        <CartList />
        <CheckOut />
      </div>
    </div>
  );
}

export default CartPage;
