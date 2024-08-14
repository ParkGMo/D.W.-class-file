import React from "react";
import styles from "./OrdersList.module.scss";
import OrderItem from "./order-item/OrderItem";

function OrdersList({ Items }) {
  const { cancelYn, createdAt, products, totalPrice, updatedAt } = Items;
  //   console.log(cancelYn, createdAt, products, totalPrice, updatedAt);

  return (
    <div className={styles.orders}>
      <div>
        <div className={styles.order_header}>
          <h3>주문 번호_{createdAt}</h3>
          <h3>주문 날짜_{new Date(createdAt).toLocaleDateString()}</h3>
          {/* <h3>주문 날짜_{new Date(createdAt).toLocaleString("ko-KR")}</h3> */}
          <p>합계 : $ {totalPrice}</p>
        </div>
        <ul>
          {products.map((product, idx) => (
            <OrderItem product={product} key={idx} />
          ))}
          {/* <OrderItem /> */}
        </ul>
      </div>
    </div>
  );
}

export default OrdersList;
