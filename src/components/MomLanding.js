import React from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';


function MomLanding(props) {
	const {lgnMove, isMom, isDriver, checkReset} = props;
	return ( <>

		<h1>This is the mom landing page. Should show list of drivers.</h1>

		<Link to="/momS">Mom secret page</Link>

		<p>{`lgnMove:${lgnMove}`}</p>
		<p>{`isMom:${isMom}`}</p>
		<p>{`isDriver:${isDriver}`}</p>
    <p>{`checkReset:${checkReset}`}</p>

	</> );
}

function mapStateToProps(state) {
  return {
	lgnMove: state.lgnMove,
	isMom: state.isMom,
  isDriver: state.isDriver,
  checkReset: state.checkReset,
  };
}

export default connect(mapStateToProps,{})(MomLanding);