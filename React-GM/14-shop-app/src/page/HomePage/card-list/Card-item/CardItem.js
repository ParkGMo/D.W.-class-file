import React from "react";
import styles from "./CardItem.module.scss";
import { Link } from "react-router-dom";

function CardItem({ item }) {
  return (
    <li className={styles.card_item}>
      <Link>
        <img src={item.image} />
      </Link>
      <h5>{item.title}</h5>
      <div>
        <button>장바구니에 담기</button>
        <p>${item.price}</p>
      </div>
    </li>
  );
}

export default CardItem;
