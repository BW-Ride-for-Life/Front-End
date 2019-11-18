import React from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';

function DriverLanding(props) {
  const {
    //Redux state bindings
    loginFormState, loginErrMsg, moveLoginToLanding, notLoggedIn,
  } = props;
  
	return ( <>

		<h1>This is the driver landing page. Should show driver profile.</h1>

		<Link to="/drvS">Driver secret page</Link>

    <p>{`moveLoginToLanding:${moveLoginToLanding}`}</p>
    <p>{`notLoggedIn:${notLoggedIn}`}</p>
    <p>{`loginFormState:${loginFormState}`}</p>
    <p>{`loginErrMsg:${loginErrMsg}`}</p>

	</> );
}

function mapStateToProps(state) {
	return {
    loginFormState: state.loginFormState,
    loginErrMsg: state.loginErrMsg,
    moveLoginToLanding: state.moveLoginToLanding,
    notLoggedIn: state.notLoggedIn,
	};
}

export default connect(mapStateToProps,{})(DriverLanding);