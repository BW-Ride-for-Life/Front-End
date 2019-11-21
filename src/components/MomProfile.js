import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import styled from "styled-components";

import ActionBtn from './ActionBtn';

// *@* redux actions
import {getMomProfileData,reduxInitialize,deleteMom} from '../actions';

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

function MomProfile(props) {
	const {
    //Redux state bindings
    momInfo, momProfState, momProfErrMsg, deleteMove,
    //Redux action bindings
    reduxInitialize, getMomProfileData, deleteMom,
    //React router props
    history,
  } = props;


  useEffect(() => {
    getMomProfileData();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("momInfo", JSON.stringify(momInfo));
  }, [momInfo]);

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
    console.log("Logout button in MomProfile clicked")
    sessionStorage.clear();
    reduxInitialize();
    history.push('/');
  }
  
  function clickHandlerDelete(e) {
    e.preventDefault();
    console.log("Delete button in MomProfile clicked");
    deleteMom();
  }

	return ( <>

		<h1>This is the mom profile page. </h1>
    
    {/* *@* This is for message of page state to user*/}
    <StyledH3>{formStatus(momProfState, momProfErrMsg)}</StyledH3>
    

    <p>{`Mom's name: ${momInfo.name}`}</p>
    <p>{`Mom's email: ${momInfo.email}`}</p>
    <p>{`Mom's phoneNo: ${momInfo.phoneNo}`}</p>
    <p>{`Mom's plot: ${momInfo.plot}`}</p>

    
	<RegisDiv>
	<p>
		Update mom information 
		<span> 
		<StyledLink to='/updateMom' > here</StyledLink>
		</span>
	</p>
	</RegisDiv>

  <RegisDiv>
	<p>
		Go to Driver Listings 
		<span> 
		<StyledLink to='/drvList' > here</StyledLink>
		</span>
	</p>
	</RegisDiv>

  <RegisDiv>
	<p>
		Update/Delete your driver reviews
		<span> 
		<StyledLink to='/reviewList' > here</StyledLink>
		</span>
	</p>
	</RegisDiv>
    

  <ActionBtn textDisplay={"Logout"} clickHandler={clickHandlerLogout}/>
  <ActionBtn textDisplay={"Delete Mom"} clickHandler={clickHandlerDelete}/>
    

    


	</> );
} //End of MomProfile function

function mapStateToProps(state) {
  return {
    momProfState: state.momProfState,
    momProfErrMsg: state.momProfErrMsg,
    momInfo: state.momInfo,
    deleteMove: state.deleteMove,
  };
}

export default connect(mapStateToProps,
  {getMomProfileData,reduxInitialize,deleteMom}
)(MomProfile);