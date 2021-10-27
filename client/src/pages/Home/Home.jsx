import React from "react";
import Header from "../../components/Header/Header";
import PageFrame from "../../components/PageFrame/PageFrame";
import ProductsList from "../../components/ProductsList/ProductsList";

function Home() {
  return (
    <div className="page">
      <Header />
      <PageFrame>
        <h1>Menu</h1>
        <ProductsList />
      </PageFrame>
    </div>
  );
}

export default Home;
