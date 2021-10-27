import React, { useContext } from "react";

import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
} from "@material-ui/core/";

import { useAuth0 } from "@auth0/auth0-react";

import MenuIcon from "@material-ui/icons/Menu";
// import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";

// import SearchIcon from "@material-ui/icons/Search";
import NavDrawer from "./../NavDrawer/NavDrawer";

import { UIContext } from "./../../contexts/ui.context";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: "-50px", // Because it off-centers the title (logically -64px)
  },
  title: {
    flexGrow: 1,
    fontSize: "1rem",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  loginButton: {
    marginLeft: "-75px",
  },
  logoutButton: {
    marginLeft: "-75px",
  },
}));

export default function Header() {
  const classes = useStyles();
  const { toggle } = useContext(UIContext);
  const {
    // user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();
  // console.log("🚀 ~ file: Header.js ~ line 45 ~ Header ~ isAuthenticated", isAuthenticated)
  // console.log('user', user);
  return (
    <div className={classes.root}>
      <NavDrawer />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h1" noWrap>
            Full-Stack App
          </Typography>
          {!isAuthenticated ? (
            <Button
              edge="start"
              className={classes.loginButton}
              color="inherit"
              aria-label="log in"
              onClick={() => loginWithRedirect()}
            >
              Log In
            </Button>
          ) : (
            <Button
              edge="start"
              className={classes.logoutButton}
              color="inherit"
              aria-label="log out"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Log Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
