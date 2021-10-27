import React, { createContext, useState, useCallback, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import localForage from "localforage";
import { useAuth0 } from "@auth0/auth0-react";
// import useLocalforage from "./../hooks/useLocalforage";

const domain = window.location.host;

let headers = {
  "Content-Type": "application/json",
  // 'Content-Type': 'application/x-www-form-urlencoded',
};

export const storageKey = "basket";

export const BasketContext = createContext({
  addItem: () => {},
  removeItem: () => {},
  items: [],
  reset: () => {},
  submitOrder: () => {},
});

export const BasketProvider = (props) => {
  const { getAccessTokenSilently, user, loginWithRedirect } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);

  const [items, setItems] = useState([]);

  useEffect(() => {
    if(!user) return;
    (async () => {
      const result = await localForage.getItem(`${storageKey}-${user.sub}`);
      // console.log("setting", result);
      setItems(result || []);
    })();
  }, [user]);

  const [state, setState] = useState({
    loading: false,
    loaded: false,
    error: null,
  });

  const setLoading = useCallback(
    () =>
      setState({
        ...state,
        loading: true,
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

  const saveBasket = useCallback(async (newItems) => {
    await localForage.setItem(`${storageKey}-${user.sub}`, newItems);
  }, [user?.sub]);

  const reset = useCallback(async () => {
    setItems([]);
    saveBasket([]);
  }, [saveBasket, setItems]);

  const addItem = useCallback(
    async (product) => {
      console.log("items", items);
      console.log("product", product);
      const newItems = [...items, product];
      console.log("newItems", newItems);
      saveBasket(newItems);
      addToast(`Saved ${product.title}`, {
        appearance: "success",
      });
      setItems(newItems);
    },
    [addToast, items, saveBasket, setItems]
  );

  const removeItem = useCallback(
    async (id) => {
      // Get index
      const index = items.findIndex((Item) => Item._id === id);
      const deletedItem = items[index];
      // recreate the Items array without that Item
      const updatedItems = [
        ...items.slice(0, index),
        ...items.slice(index + 1),
      ];
      saveBasket(updatedItems);
      addToast(`Deleted ${deletedItem.title}`, {
        appearance: "success",
      });
      setItems(updatedItems);
    },
    [addToast, items, saveBasket, setItems]
  );

  return (
    <BasketContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        reset,
      }}
    >
      {props.children}
    </BasketContext.Provider>
  );
};
