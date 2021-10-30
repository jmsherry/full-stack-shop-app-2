import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { useToasts } from "react-toast-notifications";
import localForage from "localforage";
import { AuthContext } from "./auth.context";

export const storageKey = "basket";

export const BasketContext = createContext({
  addItem: () => {},
  removeItem: () => {},
  items: [],
  reset: () => {},
  submitOrder: () => {},
});

export const BasketProvider = (props) => {
  const { user } = useContext(AuthContext);

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const result = await localForage.getItem(`${storageKey}-${user.sub}`);
      // console.log("setting", result);
      setItems(result || []);
    })();
  }, [user]);

  // const [search, setSearch] = useState("");
  const { addToast } = useToasts();

  const saveBasket = useCallback(
    async (newItems) => {
      await localForage.setItem(`${storageKey}-${user.sub}`, newItems);
    },
    [user?.sub]
  );

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
