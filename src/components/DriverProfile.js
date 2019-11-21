import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import styled from "styled-components";

import ActionBtn from './ActionBtn';

// *@* redux actions
import {getDriverProfileData,reduxInitialize,deleteDriver} from '../actions';

const StyledH3 = styled.h3`
  width:fit-content;
  margin:0 auto;
  margin-top:10px;
`;

const StyledLink = styled(Link)`
  color:blue;
  text-decoration:underline;
  font-size:16px;
`;

const RegisDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
`;

function DriverProfile(props) {
	const {
    //Redux state bindings
    driverInfo, drvProfState, drvProfErrMsg, deleteMove,
    //Redux action bindings
    reduxInitialize, getDriverProfileData, deleteDriver,
    //React router props
    history,
  } = props;


  useEffect(() => {
    getDriverProfileData();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("driverInfo", JSON.stringify(driverInfo));
  }, [driverInfo]);

  useEffect(() => {

    if(deleteMove) {
      sessionStorage.clear();
      history.push('/');
    }

    
    if(deleteMove) {
      reduxInitialize(); 
    }

  }, [deleteMove]);

  
  // *@* This set the messages to the user to keep him
  // aware of the state of the page
  function formStatus(formState,errMsg="") {
    switch(formState) {
      case 0:
        return "";
      case 1: 
        return "Transferring data from server. Please wait...";
      case 2:
        return errMsg;
      default:
        return "Unknown Error";      
    }
  }

  function clickHandlerLogout(e) {
    e.preventDefault();
    console.log("Logout button in DriverProfile clicked");
    sessionStorage.clear();
    reduxInitialize();
    history.push('/');
  }

  function clickHandlerDelete(e) {
    e.preventDefault();
    console.log("Delete button in DriverProfile clicked");
    deleteDriver();
  }
  
	return ( <>

		<h1>This is the driver profile page. </h1>
    
    {/* *@* This is for message of page state to user*/}
    <StyledH3>{formStatus(drvProfState, drvProfErrMsg)}</StyledH3>
    

    <p>{`Driver's name: ${driverInfo.name}`}</p>
    <p>{`Driver's email: ${driverInfo.email}`}</p>
    <p>{`Driver's phoneNo: ${driverInfo.phoneNo}`}</p>
    <p>{`Driver's plot: ${driverInfo.plot}`}</p>
    <p>{`Driver's price: ${driverInfo.price}`}</p>

    {(sessionStorage.getItem("tokenType")==="driver") &&
      (<RegisDiv>
        <p>
          Update driver information 
          <span> 
            <StyledLink to='/updateDrv' > here</StyledLink>
          </span>
        </p>
      </RegisDiv>)
    }

    <ActionBtn textDisplay={"Logout"} clickHandler={clickHandlerLogout}/>
    <ActionBtn textDisplay={"Delete Driver"} clickHandler={clickHandlerDelete}/>
    

    


	</> );
} //End of DriverProfile function

function mapStateToProps(state) {
  return {
    drvProfState: state.drvProfState,
    drvProfErrMsg: state.drvProfErrMsg,
    driverInfo: state.driverInfo,
    deleteMove: state.deleteMove,
  };
}

export default connect(mapStateToProps,
  {getDriverProfileData,reduxInitialize,deleteDriver}
)(DriverProfile);