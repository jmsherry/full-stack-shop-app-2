import React, { createContext, useState, useCallback, useContext } from "react";
import { AuthContext } from "./auth.context";
import { useToasts } from "react-toast-notifications";


let headers = {
  "Content-Type": "application/json",
  // 'Content-Type': 'application/x-www-form-urlencoded',
};

export const ProductsContext = createContext({
  fetchProducts: () => [],
  addProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
  loaded: false,
  loading: false,
  error: null,
  products: [],
});

export const ProductsProvider = (props) => {
  const {
    accessToken,
  } = useContext(AuthContext);

  const [state, setState] = useState({
    loading: false,
    loaded: false,
    error: null,
    products: [],
  });

  const {loading, error, products, loaded} = state;
  // console.log('rerendering', {loading, error, products, loaded});

  const setLoading = useCallback(
    () =>
      setState({
        ...state,
        loading: true,
      }),
    [state]
  );

  const setProducts = useCallback(
    (data) =>
      setState({
        ...state,
        products: data,
        loading: false,
        loaded: true,
      }),
    [state]
  );

  const setError = useCallback(
    (err) =>
      setState({
        ...state,
        error: err.message || err.statusText,
        loading: false,
        loaded: true,
      }),
    [state]
  );

  // const [search, setSearch] = useState("");
  const { addToast } = useToasts();


  const fetchProducts = useCallback(async () => {
    // console.log('loading', loading);
    // console.log('error', error);

    const { loading, loaded, error } = state;

    if (loading || loaded || error) {
      return;
    }

    setLoading();

    try {
      const response = await fetch("/api/v1/products", {
        headers: accessToken
          ? { ...headers, Authorization: `Bearer ${accessToken}` }
          : headers,
      });
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      setProducts(data);
      // console.log('products from context', products);
    } catch (err) {
      console.log("err", err);
      setError(err);
    }
  }, [accessToken, setError, setLoading, setProducts, state]);

  const addProduct = useCallback(
    async (formData) => {
      if(!accessToken) return;
      console.log("headers", headers);
      console.log("accessToken", accessToken);
      setLoading();
      const {products} = state;
      try {
        const response = await fetch("/api/v1/products", {
          method: "POST",
          headers: accessToken
            ? { ...headers, Authorization: `Bearer ${accessToken}` }
            : headers,
          body: JSON.stringify(formData),
        });
        if (response.status !== 201) {
          throw response;
        }
        const savedProduct = await response.json();
        console.log("got data", savedProduct);
        setProducts([...products, savedProduct]);
        addToast(`Saved ${savedProduct.title}`, {
          appearance: "success",
        });
      } catch (err) {
        console.log(err);
        setState(err);
        addToast(`Error ${err.message || err.statusText}`, {
          appearance: "error",
        });
      }
    },
    [accessToken, addToast, setLoading, setProducts, state]
  );

  const updateProduct = useCallback(
    async (id, updates) => {
      if(!accessToken) return;
      let newProduct = null;
      setLoading();
      const {products} = state;
      try {
        const response = await fetch(`/api/v1/products/${id}`, {
          method: "PUT",
          headers: accessToken
            ? { ...headers, Authorization: `Bearer ${accessToken}` }
            : headers,
          body: JSON.stringify(updates),
        });
        if (!response.ok) {
          throw response;
        }
        // Get index
        const index = products.findIndex((product) => product._id === id);

        // Get actual product
        const oldProduct = products[index];
        console.log(
          "🚀 ~ file: products.context.js ~ line 95 ~ updateProduct ~ oldProduct",
          oldProduct
        );

        // Merge with updates
        newProduct = {
          // legit use of 'var', so can be seen in catch block
          ...oldProduct,
          ...updates, // order here is important for the override!!
        };
        console.log(
          "🚀 ~ file: products.context.js ~ line 99 ~ updateProduct ~ newProduct",
          newProduct
        );
        // recreate the products array
        const updatedProducts = [
          ...products.slice(0, index),
          newProduct,
          ...products.slice(index + 1),
        ];
        console.log(
          "🚀 ~ file: products.context.js ~ line 120 ~ updatedProducts",
          updatedProducts
        );
        setProducts(updatedProducts);
        addToast(`Updated ${newProduct.title}`, {
          appearance: "success",
        });
      } catch (err) {
        console.log(err);
        setError(err);
        addToast(`Error: Failed to update ${newProduct.title}`, {
          appearance: "error",
        });
      }
    },
    [accessToken, addToast, setError, setLoading, setProducts, state]
  );

  const deleteProduct = useCallback(
    async (id) => {
      if(!accessToken) return;
      let deletedProduct = null;
      setLoading();
      const {products} = state;
      try {
        const response = await fetch(`/api/v1/products/${id}`, {
          method: "DELETE",
          headers: accessToken
            ? { ...headers, Authorization: `Bearer ${accessToken}` }
            : headers,
        });
        if (response.status !== 204) {
          throw response;
        }
        // Get index
        const index = products.findIndex((product) => product._id === id);
        deletedProduct = products[index];
        // recreate the products array without that product
        const updatedProducts = [
          ...products.slice(0, index),
          ...products.slice(index + 1),
        ];
        setProducts(updatedProducts);
        addToast(`Deleted ${deletedProduct.title}`, {
          appearance: "success",
        });
      } catch (err) {
        console.log(err);
        setError(err);
        addToast(`Error: Failed to update ${deletedProduct.title}`, {
          appearance: "error",
        });
      }
    },
    [accessToken, addToast, setError, setLoading, setProducts, state]
  );

  

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        loaded,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};
