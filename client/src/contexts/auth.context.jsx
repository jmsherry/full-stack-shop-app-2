import React, { createContext, useState, useEffect } from "react";
// import { useToasts } from "react-toast-notifications";
import { useAuth0 } from "@auth0/auth0-react";
// import cloneDeep from 'lodash.cloneDeep' <-- use if your objects get complex
const domain = window.location.host;


export const ProductsContext = createContext({
  token: null,
});

export const ProductsProvider = (props) => {
  const { getAccessTokenSilently, user, loginWithRedirect } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      console.log("gettng AT", `http://${domain}/api/v1`);
      try {
        const Acctoken = await getAccessTokenSilently();
        console.log("GOT AT", Acctoken);
        setAccessToken(Acctoken);
        console.log("afterSet", accessToken);
      } catch (err) {
        console.log("getAccessTokenSilently err", err);
        if (
          err.error === "login_required" ||
          err.error === "consent_required"
        ) {
          loginWithRedirect();
        }
      }
    };
    if (user) {
      console.log("user", user);
      getToken();
    }
  }, [accessToken, getAccessTokenSilently, loginWithRedirect, user]);


  return (
    <ProductsContext.Provider
      value={{
        token: accessToken,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};
