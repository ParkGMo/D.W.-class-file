import React from "react";
import CartList from "./cart-list/CartList";
import CheckOut from "./checkout/CheckOut";
import CartEmpty from "../../components/cart-empty/CartEmpty";
import { useSelector } from "react-redux";

function CartPage() {
  const { products } = useSelector((state) => state.cartSlice);
  return (
    <div className="page">
      {products.length == 0 ? (
        <CartEmpty />
      ) : (
        <div className="container">
          <h1>장바구니</h1>
          <CartList />
          <CheckOut />
        </div>
      )}
    </div>
  );
}

export default CartPage;
