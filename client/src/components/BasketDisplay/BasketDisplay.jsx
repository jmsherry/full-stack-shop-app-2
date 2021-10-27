import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { OrdersContext } from "./../../contexts/orders.context";
import { BasketContext } from "./../../contexts/basket.context";
// import { productCategories } from "../../constants";
import { formatPrice } from "../../utils/utils";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
// import { useAuth0 } from "@auth0/auth0-react";
import {
  // ProductPermission,
  // OrderPermission,
  productCategories,
} from "./../../constants";
// import { Link } from "react-router-dom";

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

function ProductsList() {
  const classes = useStyles();
  // const { user } = useAuth0();
  // let permissions = [];
  // if (user) {
  //   permissions =
  //     user[`${window.location.origin}/user_authorization`].permissions;
  // }

  const { items, removeItem, reset } = useContext(BasketContext);
  const { addOrder } = useContext(OrdersContext);
  const itemsByCategory = {};

  if (items.length === 0) {
    return <p>No products to display</p>;
  }

  for (const category of productCategories) {
    itemsByCategory[category] = items.filter(
      (item) => item.category === category
    );
  }

  const sections = Object.keys(itemsByCategory).map((category) => {
    return (
      <li key={category}>
        <h2 className={classes.categoryTitle}>{category}</h2>
        <ul className={classes.itemList}>
          {itemsByCategory[category].map(({ _id, title, price }) => (
            <li key={_id}>
              {title} ({formatPrice(price)})
              <IconButton aria-label="delete" onClick={() => removeItem(_id)}>
                <Delete />
              </IconButton>
            </li>
          ))}
        </ul>
      </li>
    );
  });

  return (
    <>
      <p>
        {items.length} items (
        {formatPrice(items.reduce((total, item) => total + item.price, 0))}){" "}
        <Button
          onClick={() => {
            addOrder(items);
            reset();
          }}
        >
          Buy now
        </Button>
      </p>
      <ul className={classes.categoriesList}>{sections}</ul>
    </>
  );
}

export default ProductsList;
