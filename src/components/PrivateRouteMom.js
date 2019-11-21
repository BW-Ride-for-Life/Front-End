import React from 'react';
import { Route, Redirect } from "react-router-dom";

export default function PrivateRouteMom({ component: Component, ...rest }) {
return (
  <Route
    {...rest}
    render={props =>
      (sessionStorage.getItem("token") && (sessionStorage.getItem("tokenType")==="mom") ) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  /> )
}


  


