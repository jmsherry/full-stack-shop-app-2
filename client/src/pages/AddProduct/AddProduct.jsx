import React from "react";
import Header from "../../components/Header/Header";
import ProductForm from "../../components/ProductForm/ProductForm";
import PageFrame from "../../components/PageFrame/PageFrame";

function AddProduct() {
  return (
    <div className="page">
      <Header />
      <PageFrame>
        <h1>Add Product Form</h1>
        <ProductForm />
      </PageFrame>
    </div>
  );
}

export default AddProduct;
