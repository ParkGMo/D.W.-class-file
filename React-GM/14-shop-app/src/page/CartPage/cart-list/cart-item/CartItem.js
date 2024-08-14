import React from "react";
import styles from "./CartItem.module.scss";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateTotalAndQuantity,
  decrementProduct,
  deleteCartItem,
  deleteFromCart,
  incrementProduct,
} from "../../../../store/cart/cartSlice";

function CartItem({ product }) {
  //   const { products } = useSelector((state) => state.cartSlice);
  const { category, image, price, title, id, quantity, total } = product;
  const { uid, isAuthenticated } = useSelector((state) => state.userSlice);

  const dispatch = useDispatch();
  //   const productsMatching = products.some((product) => product.id === id);
  //   const deleteItemToCart = () => {
  //     dispatch(deleteToCart(product));
  //   };
  const incrementCount = () => {
    if (isAuthenticated) {
      dispatch(
        calculateTotalAndQuantity({
          uid,
          productId: id,
          operator: "increment",
        })
      );
    } else {
      dispatch(incrementProduct(id));
    }
  };
  const decrementCount = () => {
    if (isAuthenticated) {
      dispatch(
        calculateTotalAndQuantity({
          uid,
          productId: id,
          operator: "decrement",
        })
      );
    } else {
      dispatch(decrementProduct(id));
    }
  };
  const deleteProduct = () => {
    if (isAuthenticated) {
      dispatch(
        deleteCartItem({
          collectionName: ["users", uid, "cart"],
          productId: id,
        })
      );
    } else {
      dispatch(deleteFromCart(id));
    }
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
          {/* toFixed() -> 소주점 자리 지정!*/}${price} x {quantity} = $
          {total.toFixed(2)}
        </span>
      </div>
      <div className={styles.cart_count}>
        <div>
          <button disabled={quantity === 1} onClick={decrementCount}>
            -
          </button>
          <span>{quantity}</span>
          <button disabled={quantity === 10} onClick={incrementCount}>
            +
          </button>
        </div>
      </div>
      <button className={styles.cart_delete} onClick={deleteProduct}>
        <AiOutlineDelete />
      </button>
    </div>
  );
}

export default CartItem;
