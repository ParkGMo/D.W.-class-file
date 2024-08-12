import React from "react";
import styles from "./NavCartLIst.module.scss";
import NavCartItem from "./nav-cart-item/NavCartItem";
import { useSelector } from "react-redux";

function NavCartList() {
  // const products = JSON.parse(localStorage.getItem("cartProducts"));
  const { products } = useSelector((state) => state.cartSlice);

  return (
    <div className={styles.nav_cart_list}>
      {products.map((product) => {
        return <NavCartItem key={product.id} product={product} />;
      })}
    </div>
  );
}

export default NavCartList;
