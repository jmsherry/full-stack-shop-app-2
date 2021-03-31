// const ProtectedRoute = ({ component, ...args }) => (
//   <Route component={withAuthenticationRequired(component)} {...args} />
// );

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import intersection from "lodash.intersection";

const ProtectedRoute = ({
  component: Component,
  permissions: requiredPerms = [],
  ...rest
}) => {
  let authd = false;
  const { user } = useAuth0();
  if (user) {
    const { permissions } = user[`${window.location.origin}/user_authorization`];
    if (!requiredPerms.length) {
      authd = true;
    } else if (intersection(permissions, requiredPerms).length > 0) {
      authd = true;
    }
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        authd ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default ProtectedRoute;
