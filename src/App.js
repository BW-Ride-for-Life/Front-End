import React from 'react';
import { BrowserRouter as Router, Route, } from "react-router-dom";

import Login from './components/Login';
import MomRegister from './components/MomRegister';
import DriverRegister from './components/DriverRegister';
import DriverUpdate from './components/DriverUpdate';
import MomProfile from './components/MomProfile';
import MomUpdate from './components/MomUpdate';
import DriverProfile from './components/DriverProfile';
import PrivateRouteMom from './components/PrivateRouteMom';
import PrivateRouteDriver from './components/PrivateRouteDriver';
// import PrivateRoute from './components/PrivateRoute';
import DriverListing from './components/DriverListing';
import MomViewDrvProfile from './components/MomViewDrvProfile';
import ReviewListing from './components/ReviewListing';



function App(props) {

  return ( <Router>
    <div className="App">
      <Route exact path="/" component={Login} />

      <Route path="/regMom" component={MomRegister} />
      <Route path="/regDrv" component={DriverRegister} />

      <PrivateRouteMom path="/updateMom" component={MomUpdate} />
      <PrivateRouteMom path="/profMom" component={MomProfile} />
      <PrivateRouteMom path="/drvList" component={DriverListing} />
      <PrivateRouteMom path="/momViewDrvProf" component={MomViewDrvProfile} />
      <PrivateRouteMom path="/reviewList" component={ReviewListing} />

      <PrivateRouteDriver path="/updateDrv" component={DriverUpdate} />
      <PrivateRouteDriver path="/profDrv" component={DriverProfile} />
      
    </div>
  </Router>  );
}

export default App;
