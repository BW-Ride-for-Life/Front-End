import React from 'react';
import { Route, Redirect } from "react-router-dom";

export default function PrivateRouteDriver({ component: Component, ...rest }) {
return (
  <Route
    {...rest}
    render={props =>
      (sessionStorage.getItem("token") ) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  /> )
}


  


