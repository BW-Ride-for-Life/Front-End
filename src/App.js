import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import {connect} from 'react-redux';

import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import MomLanding from './components/MomLanding';
import MomSecret from './components/MomSecret';
import DriverLanding from './components/DriverLanding';
import DriverSecret from './components/DriverSecret';


function App(props) {
  const {isMom, isDriver} = props;
  return ( <Router>
    <div className="App">
      <Route exact path="/" component={Login} />

      {/* <Route path="/momL" 
        render={props=>(isMom && sessionStorage.getItem("token")) ? (<MomLanding {...props}/>) : (<Redirect to="drvL"/>)}
      />
      <Route path="/momS" 
        render={props=>(isMom && sessionStorage.getItem("token")) ? (<MomSecret {...props}/>) : (<Redirect to="drvL"/>)}
      />

      <PrivateRoute path="/drvL" 
        render={props=>isDriver?(<DriverLanding {...props}/>):(<Redirect to="drvL"/>)}
      />
      <PrivateRoute path="/drvS" 
        render={props=>isDriver?(<DriverSecret {...props}/>):(<Redirect to="drvL"/>)}
      /> */}

      <PrivateRoute path="/momL" component={isMom ? MomLanding : DriverLanding} />
      <PrivateRoute path="/momS" component={isMom ? MomSecret : DriverLanding} />

      <PrivateRoute path="/drvL" component={isDriver ? DriverLanding : MomLanding} />
      <PrivateRoute path="/drvS" component={isDriver ? DriverSecret : MomLanding} />


      
    </div>
  </Router>  );
}

function mapStateToProps(state) {
  return {
    isMom: state.isMom,
    isDriver: state.isDriver,
  };
}

export default connect(mapStateToProps,{})(App);
