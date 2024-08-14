import React from "react";
import OrdersList from "./orders-list/OrdersList";
import orderItems from "../../orderMock.json";

function OrderPage() {
  return (
    <div className="page">
      <div className="container">
        <h1>주문 히스토리</h1>
        {orderItems.map((Items, idx) => (
          <OrdersList Items={Items} key={idx} />
        ))}
        {/* <OrdersList /> */}
      </div>
    </div>
  );
}

export default OrderPage;
