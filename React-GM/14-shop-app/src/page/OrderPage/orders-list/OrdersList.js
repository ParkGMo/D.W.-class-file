import React, { useEffect } from "react";
import styles from "./OrdersList.module.scss";
import OrderItem from "./order-item/OrderItem";
import mockData from "../../../orderMock.json";
import { getISODate } from "../../../utils/getFormatted";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from "../../../store/order/orderSlice";
import userSlice from "./../../../store/user/userSlice";
import CartEmpty from "../../../components/cart-empty/CartEmpty";

function OrdersList() {
  const { order } = useSelector((state) => state.orderSlice);
  const { uid } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchOrder({ collectionName: ["users", uid, "orders"], queryOptions: {} })
    );
  }, [uid]);

  if (order.length == 0) {
    return <CartEmpty title="주문내역" />;
  }
  console.log(order);

  return (
    <div className={styles.orders}>
      {order.map((item, idx) => {
        console.log(item);

        const { cancelYn, createdAt, products, totalPrice, updatedAt, id } =
          item;
        return (
          <div key={idx}>
            <div className={styles.order_header}>
              <h3>주문 번호_{createdAt}</h3>
              <h3>
                주문 날짜_{getISODate(createdAt).yyyymmdd}{" "}
                {getISODate(createdAt).hhmmss}
              </h3>
              {/* <h3>주문 날짜_{new Date(createdAt).toLocaleDateString()}</h3> */}
              <p>합계 : $ {totalPrice.toFixed(2)}</p>
            </div>
            <ul className={styles.orders_list}>
              {products.map((product) => (
                <OrderItem {...product} key={product.id} />
                // <OrderItem product={product} key={id} />
              ))}
              {/* <OrderItem /> */}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default OrdersList;
