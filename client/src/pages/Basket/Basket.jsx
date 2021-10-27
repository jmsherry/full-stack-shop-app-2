import React from "react";
import Header from "../../components/Header/Header";
import PageFrame from "../../components/PageFrame/PageFrame";
import BasketDisplay from "../../components/BasketDisplay/BasketDisplay";

function Basket() {
  return (
    <div className="App">
      <Header />
      <PageFrame>
        <h1>Basket</h1>
        <BasketDisplay />
      </PageFrame>
    </div>
  );
}

export default Basket;
