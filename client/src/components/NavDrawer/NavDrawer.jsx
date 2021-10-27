import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { UIContext } from "../../contexts/ui.context";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { ProductPermission } from "../../constants";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

const NavDrawer = () => {
  const { user } = useAuth0();
  const classes = useStyles();

  const { isOpen, toggle } = useContext(UIContext);

  const handleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    toggle();
  };

  let menuItems = [{ text: "Menu", to: "/" }];

  if (user) {
    const { permissions } = user["http://localhost:3000/user_authorization"];
    // console.log('permissions', permissions);
    if (permissions.includes(ProductPermission.CreateProducts)) {
      menuItems = [...menuItems, { text: "Add Product", to: "/product/add" }];
    }
    menuItems = [
      ...menuItems,
      { text: "Profile", to: "/profile" },
      { text: "Basket", to: "/basket" },
      { text: "Orders", to: "/orders" },
    ];
  }

  return (
    <Drawer anchor="left" open={isOpen} onClose={handleDrawer()}>
      <div
        className={classes.list}
        role="presentation"
        onClick={handleDrawer()}
        onKeyDown={handleDrawer()}
      >
        <List>
          {menuItems.map(({ text, to }) => (
            <ListItem button component={NavLink} to={to} key={text}>
              <ListItemText>{text}</ListItemText>
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default NavDrawer;
