import React, { useContext, useEffect } from "react";
import { ProductsContext } from "./../../contexts/products.context";
import { productCategories } from "../../constants";
import { formatPrice } from "../../utils/utils";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";
import {ProductPermission} from './../../constants';
import {
  Link,
} from 'react-router-dom';

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
  const { user } = useAuth0();
  let permissions = [];
  if(user) {
    permissions = user[`${window.location.origin}/user_authorization`].permissions;
  }
  const canUpdate = permissions.includes(ProductPermission.UpdateProducts);
  const canDelete = permissions.includes(ProductPermission.DeleteProducts);


  const { products, loaded, fetchProducts, loading, error, deleteProduct } = useContext(
    ProductsContext
  );
  const productsByCategory = {};

  // console.log("products", products);

  useEffect(() => {
    // console.log("in useEffect", products, loaded, loading);
    if (!loading && !loaded) {
      fetchProducts();
    }
  }, [loaded, fetchProducts, products, loading]);

  if (products.length === 0) {
    return <p>No products to display</p>;
  }

  //
  for (const category of productCategories) {
    productsByCategory[category] = products.filter(
      (product) => product.category === category
    );
  }
  // console.log("productCategories", productCategories);
  // console.log("productsByCategory", productsByCategory);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const sections = Object.keys(productsByCategory).map((category) => {
    // console.log(
    //   "🚀 ~ file: ProductsList.js ~ line 37 ~ sections ~ category",
    //   category
    // );
    // console.log('cat', category, productsByCategory[category].map(({ _id, title, price }) => (
    //         <li key={_id}>
    //           {title} (£{price})
    //         </li>
    //       )));
    return (
      <li key={category}>
        <h2 className={classes.categoryTitle}>{category}</h2>
        <ul className={classes.itemList}>
          {productsByCategory[category].map(({ _id, title, price }) => (
            <li key={_id}>
              {title} ({formatPrice(price)})
              {canUpdate && <IconButton aria-label="update" component={Link} to={`/product/update/${_id}`}>
                <Edit />
              </IconButton>}
              {canDelete && <IconButton aria-label="delete" onClick={() => deleteProduct(_id)} >
                <Delete />
              </IconButton>}
            </li>
          ))}
        </ul>
      </li>
    );
  });

  return <ul className={classes.categoriesList}>{sections}</ul>;
}

export default ProductsList;
