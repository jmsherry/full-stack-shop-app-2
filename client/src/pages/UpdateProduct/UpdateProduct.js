import React, { useContext, useEffect } from "react";
import PageFrame from "../../components/page-frame/page-frame";
import Header from "../../components/Header/Header";
import ProductForm from "../../components/ProductForm/ProductForm";
import { useParams } from "react-router-dom";
import { ProductsContext } from "./../../contexts/products.context";

function UpdateProducts() {
  let { id } = useParams();
  const { products, loaded, fetchProducts } = useContext(
    ProductsContext
  );
  console.log("products", products);
  useEffect(() => {
    console.log("in useEffect", products, loaded);
    if (!loaded) {
      fetchProducts();
    }
  }, [loaded, fetchProducts, products]);

  console.log("products", products);
  const productToBeUpdated = products.find((product) => product._id === id);
  console.log("productToBeUpdated", productToBeUpdated);
  return (
    <div className="App">
      <Header />
      <main>
        <PageFrame>
          <h1>Update Products</h1>
          <ProductForm initialValues={productToBeUpdated} />
        </PageFrame>
      </main>
    </div>
  );
}

export default UpdateProducts;
