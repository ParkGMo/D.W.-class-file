import React, { useEffect } from "react";
import styles from "./CheckOut.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTotalPrice, postOrder } from "../../../store/cart/cartSlice";

function CheckOut() {
  const { totalPrice, products } = useSelector((state) => state.cartSlice);
  const { isAuthenticated, uid } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sandOrder = () => {
    const orderObj = {
      totalPrice,
      products,
    };
    dispatch(postOrder({ uid, cart: orderObj }));
    // navigate("/order");
  };

  useEffect(() => {
    dispatch(getTotalPrice());
  }, []);
  return (
    <div className={styles.checkout}>
      <div>
        <p>
          <span>합계 : $ {totalPrice.toFixed(2)}</span>
        </p>
        {isAuthenticated ? (
          <button className={styles.checkout_button} onClick={sandOrder}>
            계산하기
          </button>
        ) : (
          <Link to={"/login"} className={styles.checkout_button}>
            로그인하기
          </Link>
        )}
      </div>
    </div>
  );
}

export default CheckOut;
