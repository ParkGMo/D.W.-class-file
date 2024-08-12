import React, { useEffect } from "react";
import styles from "./CheckOut.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTotalPrice } from "../../../store/cart/cartSlice";

function CheckOut() {
  const { totalPrice } = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotalPrice());
  }, []);
  return (
    <div className={styles.checkout}>
      <div>
        <p>
          <span>합계 : $ {totalPrice.toFixed(2)}</span>
          {/* <button className={styles.checkout_button}>계산하기</button> */}
        </p>
        <Link className={styles.checkout_button}>로그인하기</Link>
      </div>
    </div>
  );
}

export default CheckOut;
