// import grey from "@material-ui/core/colors/grey";
// import red from "@material-ui/core/colors/red";

// https://stackoverflow.com/questions/61220424/material-ui-drawer-finddomnode-is-deprecated-in-strictmode#answer-64135466
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core'; 

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#484848",
      main: "#212121",
      dark: "#000000",
      contrastText: "#fff",
    },
  },
  secondary: {
    main: "#f44330",
    light: "#ff795b",
    dark: "#b90005",
    contrastText: "#000000",
  },
});

export default theme;
