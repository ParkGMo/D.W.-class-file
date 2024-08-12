import React from "react";
import { useSelector } from "react-redux";
import styles from "./CartList.module.scss";
import CartItem from "./cart-item/CartItem";

function CartList() {
  const { products } = useSelector((state) => state.cartSlice);

  return (
    <div className={styles.cart_list}>
      {products.map((product) => (
        <CartItem key={product.id} product={product} />
      ))}
    </div>
  );
}

export default CartList;
