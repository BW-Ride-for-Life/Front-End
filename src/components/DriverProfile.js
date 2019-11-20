import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import styled from "styled-components";

// import ActionBtn from './ActionBtn';

// *@* redux actions
import {getDriverData} from '../actions';

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
    driverInfo, formState, formErrMsg,
    //Redux action bindings
    userLogout, getDriverData, 
    //React router props
    history,
  } = props;


  useEffect(() => {
    // If driverInfo is empty that means we have just mounted this page
    // so get driver data
    if(Object.entries(driverInfo).length === 0) {
      getDriverData();
    }

  }, []);

  useEffect(() => {
    sessionStorage.setItem("driverInfo", JSON.stringify(driverInfo));
  }, [driverInfo]);

  // useEffect(() => {
  //   return () => {
  //     clear_driverInfo();
  //   };
  // }, []);


  // *@* This set the messages to the user to keep him
  // aware of the state of the page
  function formStatus(formState,errMsg="") {
    switch(formState) {
      case 0:
        return "";
      case 1: 
        return "Transferring data from server. Please wait...";
      case 2:  
        return ""; 
      case 3:
        return errMsg;
      default:
        return "Unknown Error";      
    }
  }

  // function clickHandler(e) {
  //   e.preventDefault();
  //   console.log("In click handler in DriverProfile");
  //   history.push('/');
  // }

	return ( <>

		<h1>This is the driver profile page. </h1>
    
    {/* *@* This is for message of page state to user*/}
    <StyledH3>{formStatus(formState, formErrMsg)}</StyledH3>
    

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
            <StyledLink to='/regDrv' > here</StyledLink>
          </span>
        </p>
      </RegisDiv>)
    }

    
    {/* <ActionBtn textDisplay={"To Update page"} clickHandler={clickHandler}/> */}

    


	</> );
} //End of DriverProfile function

function mapStateToProps(state) {
  return {
    formState: state.formState,
    formErrMsg: state.formErrMsg,
    driverInfo: state.driverInfo,
  };
}

export default connect(mapStateToProps,
  {getDriverData}
)(DriverProfile);