import React from "react";
import Header from "../../components/Header/Header";
import PageFrame from "../../components/PageFrame/PageFrame";
import OrderDisplay from '../../components/OrdersDisplay/OrdersDisplay'

function Checkout() {
  return (
    <div className="App">
      <Header />
      <PageFrame>
        <h1>Orders</h1>
        <OrderDisplay />
      </PageFrame>
    </div>
  );
}

export default Checkout;