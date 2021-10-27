import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {CircularProgress} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
function Wrapper({ children }) {
  const {
    isLoading,
    error,
  } = useAuth0();
  if (isLoading) {
    return (<CircularProgress />);
  }
  if (error) {
    return (<Alert severity="error">{error.message}</Alert>)
  }
  return <>{children}</>;
}
export default Wrapper;