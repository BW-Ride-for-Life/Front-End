import React from 'react';
import { BrowserRouter as Router, Route, } from "react-router-dom";

import Login from './components/Login';
import PrivateRouteMom from './components/PrivateRouteMom';
import PrivateRouteDriver from './components/PrivateRouteDriver';



function App(props) {

  return ( <Router>
    <div className="App">
      <Route exact path="/" component={Login} />



      {/* <PrivateRouteMom path="/momL" component={MomLanding} />
      <PrivateRouteMom path="/momS" component={MomSecret} />

      <PrivateRouteDriver path="/drvL" component={DriverLanding} />
      <PrivateRouteDriver path="/drvS" component={DriverSecret} /> */}
      
    </div>
  </Router>  );
}

export default App;
