import React from "react";
import styles from "./OrderItem.module.scss";
import { Link } from "react-router-dom";

function OrderItem({ product }) {
  const { category, description, image, price, title, quantity, total } =
    product;
  //   console.log(category, description, image, price, title, total);

  return (
    <div className={styles.order_item}>
      <Link>
        <img src={image} />
      </Link>
      <div className={styles.order_description}>
        <h4>{category}</h4>
        <h3>{title}</h3>
      </div>
      <div className={styles.order_price}>
        <h4>가격</h4>
        <span>
          ${price} x {quantity}
        </span>
      </div>
      <div className={styles.order_total}>
        <h4>합계</h4>
        <span>${total}</span>
      </div>
      {/* <div className={styles.order_count}>
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
      <button className={styles.order_delete} onClick={deleteProduct}>
        <AiOutlineDelete />
      </button> */}
    </div>
  );
}

export default OrderItem;
