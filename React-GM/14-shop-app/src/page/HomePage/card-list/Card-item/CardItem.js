import React from "react";
import styles from "./CardItem.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../store/cart/cartSlice";
import cartSlice from "./../../../../store/cart/cartSlice";

function CardItem({ item }) {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.cartSlice);
  const productsMatching = products.some((product) => product.id === item.id);

  const addItemToCart = () => {
    dispatch(addToCart(item));
  };
  return (
    <li className={styles.card_item}>
      <Link to={`/product/${item.id}`}>
        <img src={item.image} />
      </Link>
      <h5>{`${item.title.slice(0, 15)}...`}</h5>
      <div>
        <button disabled={productsMatching} onClick={addItemToCart}>
          {productsMatching ? "장바구니에 담긴 제품" : "장바구니에 담기"}
        </button>
        <p>${item.price}</p>
      </div>
    </li>
  );
}

export default CardItem;
