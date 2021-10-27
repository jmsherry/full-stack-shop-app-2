import React, { createContext, useState, useCallback, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { useAuth0 } from "@auth0/auth0-react";
// import cloneDeep from 'lodash.cloneDeep' <-- use if your objects get complex
const domain = window.location.host;

let headers = {
  "Content-Type": "application/json",
  // 'Content-Type': 'application/x-www-form-urlencoded',
};

export const OrdersContext = createContext({
  fetchOrders: () => [],
  addOrder: () => {},
  updateOrder: () => {},
  deleteOrder: () => {},
  loaded: false,
  loading: false,
  error: null,
  orders: [],
});

export const OrdersProvider = (props) => {
  const { getAccessTokenSilently, user, loginWithRedirect } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);

  const [state, setState] = useState({
    loading: false,
    loaded: false,
    error: null,
    orders: [],
  });

  const { loading, error, orders, loaded } = state;
  // console.log('rerendering', {loading, error, Orders, loaded});

  const setLoading = useCallback(
    () =>
      setState({
        ...state,
        loading: true,
      }),
    [state]
  );

  const setOrders = useCallback(
    (data) =>
      setState({
        ...state,
        orders: data,
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

  useEffect(() => {
    const getToken = async () => {
      console.log("gettng AT", `http://${domain}/api/v1`);
      try {
        const Acctoken = await getAccessTokenSilently();
        console.log("GOT AT", Acctoken);
        setAccessToken(Acctoken);
        console.log("afterSet", accessToken);
      } catch (err) {
        console.log("getAccessTokenSilently err", err);
        if (
          err.error === "login_required" ||
          err.error === "consent_required"
        ) {
          loginWithRedirect();
        }
      }
    };
    if (user) {
      console.log("user", user);
      getToken();
    }
  }, [accessToken, getAccessTokenSilently, loginWithRedirect, user]);

  const fetchOrders = useCallback(async () => {
    // console.log('loading', loading);
    // console.log('error', error);

    console.log("fetchOrders");

    const { loading, loaded, error } = state;

    if (loading || loaded || error || !accessToken) {
      console.log("bailing");
      return;
    }

    setLoading();

    try {
      const response = await fetch("/api/v1/orders", {
        headers: accessToken
          ? { ...headers, Authorization: `Bearer ${accessToken}` }
          : headers,
      });
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      setOrders(data);
      // console.log('Orders from context', Orders);
    } catch (err) {
      console.log("err", err);
      setError(err);
    }
  }, [accessToken, setError, setLoading, setOrders, state]);

  const addOrder = useCallback(
    async (items) => {
      const itemIDs = items.map((item) => item._id);
      console.log("itemIDs", itemIDs);
      console.log("headers", headers);
      console.log("accessToken", accessToken);
      setLoading();
      const { orders } = state;
      try {
        const response = await fetch("/api/v1/orders", {
          method: "POST",
          headers: accessToken
            ? { ...headers, Authorization: `Bearer ${accessToken}` }
            : headers,
          body: JSON.stringify({ items: itemIDs }),
        });
        if (response.status !== 201) {
          throw response;
        }
        const savedOrder = await response.json();
        console.log("got data", savedOrder);
        setOrders([...orders, {...savedOrder, items}]);
        addToast(`Saved ${savedOrder.title}`, {
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
    [accessToken, addToast, setLoading, setOrders, state]
  );

  const updateOrder = useCallback(
    async (id, updates) => {
      let newOrder = null;
      setLoading();
      const { Orders } = state;
      try {
        const response = await fetch(`/api/v1/orders/${id}`, {
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
        const index = Orders.findIndex((Order) => Order._id === id);

        // Get actual Order
        const oldOrder = Orders[index];
        console.log(
          "🚀 ~ file: Orders.context.js ~ line 95 ~ updateOrder ~ oldOrder",
          oldOrder
        );

        // Merge with updates
        newOrder = {
          // legit use of 'var', so can be seen in catch block
          ...oldOrder,
          ...updates, // order here is important for the override!!
        };
        console.log(
          "🚀 ~ file: Orders.context.js ~ line 99 ~ updateOrder ~ newOrder",
          newOrder
        );
        // recreate the Orders array
        const updatedOrders = [
          ...Orders.slice(0, index),
          newOrder,
          ...Orders.slice(index + 1),
        ];
        console.log(
          "🚀 ~ file: Orders.context.js ~ line 120 ~ updatedOrders",
          updatedOrders
        );
        setOrders(updatedOrders);
        addToast(`Updated ${newOrder.title}`, {
          appearance: "success",
        });
      } catch (err) {
        console.log(err);
        setError(err);
        addToast(`Error: Failed to update ${newOrder.title}`, {
          appearance: "error",
        });
      }
    },
    [accessToken, addToast, setError, setLoading, setOrders, state]
  );

  const deleteOrder = useCallback(
    async (id) => {
      let deletedOrder = null;
      setLoading();
      const { Orders } = state;
      try {
        const response = await fetch(`/api/v1/orders/${id}`, {
          method: "DELETE",
          headers: accessToken
            ? { ...headers, Authorization: `Bearer ${accessToken}` }
            : headers,
        });
        if (response.status !== 204) {
          throw response;
        }
        // Get index
        const index = Orders.findIndex((Order) => Order._id === id);
        deletedOrder = Orders[index];
        // recreate the Orders array without that Order
        const updatedOrders = [
          ...Orders.slice(0, index),
          ...Orders.slice(index + 1),
        ];
        setOrders(updatedOrders);
        addToast(`Deleted ${deletedOrder.title}`, {
          appearance: "success",
        });
      } catch (err) {
        console.log(err);
        setError(err);
        addToast(`Error: Failed to update ${deletedOrder.title}`, {
          appearance: "error",
        });
      }
    },
    [accessToken, addToast, setError, setLoading, setOrders, state]
  );

  return (
    <OrdersContext.Provider
      value={{
        orders,
        loading,
        error,
        loaded,
        fetchOrders,
        addOrder,
        updateOrder,
        deleteOrder,
      }}
    >
      {props.children}
    </OrdersContext.Provider>
  );
};
