import React, {useState, useEffect} from "react";
import {connect} from 'react-redux';

import './Login.css';
import {loginSrv, clearLgnMove} from '../actions';


const Login = (props) => {
  const {loginState, loginErrMsg, loginSrv, isMom, 
      isDriver, history, lgnMove, clearLgnMove, checkReset,
  } = props;

  const [formData, setFormData] = useState({
    password: "",
  });

  useEffect(()=>{
    // console.log("Here & isMom:",isMom," & lgnMove:",lgnMove);
    clearLgnMove(); //This is done asyn I believe, as otherwise the following if statements would always not run
    if(lgnMove && isMom) {
      history.push('/momL');
    }
    if(lgnMove && isDriver) {
      history.push('/drvL');
    }

  },[lgnMove])



  function formStatus(formState,errMsg="") {
    switch(formState) {
      case 0:
        return "";
      case 1:
        return "Checking credentials on server. Please wait...";
      case 2:
        return `You are logged in, you can now visit ${isMom?"MOM":(isDriver?"DRIVER":"")} pages on this site.`;
      case 3:
        return errMsg;
      default:
        return "Unknown Error";      
    }
  }


  function changeHandler(event) {
    // console.log(`This is the field: ${event.target.name} and this is the value: ${event.target.value}`);
    setFormData( { 
     ...formData, 
     [event.target.name]: event.target.value, 
    });
  }

  
  function submitForm(event) {
    event.preventDefault();
    loginSrv(formData.password);
    
  };


  return ( 
    <div className="loginContainer">
    
      <h1 className="titleHeader">Login Page</h1>

      <form className="formContainer" onSubmit={submitForm}> 

        <div className="formInputContainer">
          <label htmlFor="password">Password</label>
          <input className="input-area"
            type="text"
            name="password"
            id="password"
            placeholder="Password"
            onChange={changeHandler}
            value={formData.password}         
          />
        </div>
        
        <button className="loginSubmitBtn" type="submit">Login</button>

        <h3 className="formStatus">{formStatus(loginState, loginErrMsg)}</h3>

      </form>

      {/* This is for debugging purposes only
      remove for production */}
      {/* <p>{`password:${formData.password}`}</p> */}
      <p>{`lgnMove:${lgnMove}`}</p>
      <p>{`isMom:${isMom}`}</p>
		  <p>{`isDriver:${isDriver}`}</p>
      <p>{`checkReset:${checkReset}`}</p>

    </div> 
  );
};

function mapStateToProps(state) {
  return {
    loginState: state.loginState,
    loginErrMsg: state.loginErrMsg,
    isMom: state.isMom,
    isDriver: state.isDriver,
    lgnMove: state.lgnMove,
    checkReset: state.checkReset,
  };
}


export default connect(mapStateToProps,{loginSrv, clearLgnMove})(Login);
