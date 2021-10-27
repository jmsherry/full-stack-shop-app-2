import React, { useEffect, useContext } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
import { OrdersContext } from "./../../contexts/orders.context";
import { makeStyles } from "@material-ui/core/styles";
import { formatPrice } from "./../../utils/utils";
// import {
//   ProductPermission,
//   OrderPermission,
//   productCategories,
// } from "../../constants";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  formRow: {
    margin: theme.spacing(1),
    minWidth: 120,
    display: "flex",
    justifyContent: "center",
  },
  categoriesList: {
    listStyle: "none",
    padding: 0,
  },
  itemList: {
    listStyle: "none",
    padding: 0,
  },
  categoryTitle: {
    textTransform: "capitalize",
  },
}));

function OrdersDisplay() {
  const classes = useStyles();
  // const { user } = useAuth0();
  // let permissions = [];
  // if (user) {
  //   permissions =
  //     user[`${window.location.origin}/user_authorization`].permissions;
  // }
  // const canUpdate = permissions.includes(ProductPermission.UpdateProducts);
  // const canDelete = permissions.includes(ProductPermission.DeleteProducts);
  // const canBuy = permissions.includes(OrderPermission.CreateOwnOrders);

  const { orders, loaded, fetchOrders, loading, error } =
    useContext(OrdersContext);

  // console.log("orders", orders);

  useEffect(() => {
    console.log("in useEffect", orders, loaded, loading);
    // debugger;
    if (!loading && !loaded) {
      fetchOrders();
    }
  }, [loaded, fetchOrders, orders, loading]);

  if (orders.length === 0) {
    return <p>No orders to display</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul className={classes.categoriesList}>
      {orders.map(({ _id, items }) => (
        <li key={_id}>
          <h2>Order ID: {_id}</h2>
          <ul style={{ listStyle: "none" }}>
            {items.map(({ title, price, _id }) => (
              <li key={_id}>
                {title} ({formatPrice(price)})
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default OrdersDisplay;
