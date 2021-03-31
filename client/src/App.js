import React from "react";
import {
  BrowserRouter as Router,
  Route,
  // Redirect,
  Switch,
} from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { Auth0Provider } from "@auth0/auth0-react";
import { MenuProvider } from "./contexts/menu.context";
import { ProductsProvider } from "./contexts/products.context";
import "./App.css";

// Pages
import Home from "./pages/Home/Home";
import AddProduct from "./pages/AddProduct/AddProduct";
import UpdateProduct from "./pages/UpdateProduct/UpdateProduct";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/404/404";

// Components
import Auth0Wrapper from "./components/Auth0Wrapper/Auth0Wrapper";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import {
  // OrderPermission,
  ProductPermission,
} from "./constants";

import history from "./utils/history";
import { getConfig } from "./config";

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

// Please see https://auth0.github.io/auth0-react/interfaces/auth0provideroptions.html
// for a full list of the available properties on the provider
const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  ...(config.audience ? { audience: config.audience } : null),
  redirectUri: window.location.origin,
  onRedirectCallback,
};

function App() {
  return (
    <Router>
      <Auth0Provider {...providerConfig}>
        <ToastProvider autoDismiss={true}>
          <MenuProvider>
            <ProductsProvider>
              <Auth0Wrapper>
              <Switch>
                <Route exact path="/" component={Home} />
                <ProtectedRoute
                  permissions={[ProductPermission.CreateProducts]}
                  path="/product/add"
                  component={AddProduct}
                />
                <ProtectedRoute
                  permissions={[ProductPermission.UpdateProducts]}
                  path="/product/update/:id"
                  component={UpdateProduct}
                />
                <ProtectedRoute path="/profile" component={Profile} />
                <Route path="*" component={NotFound} />
              </Switch>
              </Auth0Wrapper>
            </ProductsProvider>
          </MenuProvider>
        </ToastProvider>
      </Auth0Provider>
    </Router>
  );
}

export default App;
