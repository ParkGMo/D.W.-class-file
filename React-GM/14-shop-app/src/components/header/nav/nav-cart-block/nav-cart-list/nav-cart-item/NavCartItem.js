import React from "react";
import styles from "./NavCartItem.module.scss";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteToCart } from "../../../../../../store/cart/cartSlice";

function NavCartItem({ product }) {
  const { category, image, price, title, id, quantity, total } = product;
  const dispatch = useDispatch();
  //   const { products } = useSelector((state) => state.cartSlice);
  //   const productsMatching = products.some((product) => product.id === id);
  const deleteItemToCart = () => {
    dispatch(deleteToCart(id));
  };

  return (
    <div className={styles.nav_cart_item}>
      <Link to={`/product/${id}`}>
        <img src={image} />
      </Link>
      <div className={styles.nav_cart_description}>
        <h3>{category}</h3>
        <h2>{title}</h2>
        <span>
          {/* toFixed() -> 소주점 자리 지정!*/}${price} x ${quantity} = $
          {total.toFixed(2)}
        </span>
      </div>
      <button className={styles.nav_cart_delete}>
        <AiOutlineDelete onClick={deleteItemToCart} />
      </button>
    </div>
  );
}

export default NavCartItem;
