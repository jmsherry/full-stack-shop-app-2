import React from "react";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
// import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function PageFrame(props) {
  const classes = useStyles();

  return (
    <main>
      <Container maxWidth="lg">
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            {props.children}
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
