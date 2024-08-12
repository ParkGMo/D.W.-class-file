import React from "react";
import styles from "./CartItem.module.scss";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  decrementProduct,
  incrementProduct,
} from "../../../../store/cart/cartSlice";

function CartItem({ product }) {
  //   const { products } = useSelector((state) => state.cartSlice);
  const { category, image, price, title, id, quantity, total } = product;

  const dispatch = useDispatch();
  //   const productsMatching = products.some((product) => product.id === id);
  //   const deleteItemToCart = () => {
  //     dispatch(deleteToCart(product));
  //   };
  const incrementCount = () => {
    dispatch(incrementProduct(id));
  };
  const decrementCount = () => {
    dispatch(decrementProduct(id));
  };
  return (
    <div className={styles.cart_item}>
      <Link to={`/product/${id}`}>
        <img src={image} />
      </Link>
      <div className={styles.cart_description}>
        <h3>{category}</h3>
        <h2>{title}</h2>
        <span>
          {/* toFixed() -> 소주점 자리 지정!*/}${price} x ${quantity} = $
          {total.toFixed(2)}
        </span>
      </div>
      <div className={styles.cart_count}>
        <div>
          <button onClick={decrementCount}>-</button>
          <span>{quantity}</span>
          <button onClick={incrementCount}>+</button>
        </div>
      </div>
      <button className={styles.cart_delete}>
        <AiOutlineDelete />
      </button>
    </div>
  );
}

export default CartItem;
