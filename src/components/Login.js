import React, {useState, useEffect} from "react";
import {connect} from 'react-redux';

import './Login.css';
import {loginToServer, clear_moveLoginToLanding} from '../actions';


const Login = (props) => {
  const {
    //Redux state bindings
    loginFormState, loginErrMsg, moveLoginToLanding, notLoggedIn,
    //Redux action bindings
    loginToServer, clear_moveLoginToLanding,
    //React router props
    history,
  } = props;

  const [formData, setFormData] = useState({
    password: "",
  });

  useEffect(()=>{
    if(moveLoginToLanding && (sessionStorage.getItem("tokenType")==="mom")) {
      history.push('/momL');
    }
    if(moveLoginToLanding && (sessionStorage.getItem("tokenType")==="driver")) {
      history.push('/drvL');
    }

    //This is to clear the sessionStorage whenever we first mount the 
    //Login page so that we start with an empty sessionStorage
    if(notLoggedIn) {
      sessionStorage.clear();
    }

    //When the redux state flag moveLoginToLanding becomes true, it indicates that we 
    //have to move from the Login page to the mom/driver landing page after
    //login has been successfully completed. This is accomplished by the
    //first two if statements in this useEffect. Now that the two if statements 
    //have done their work, we need to make moveLoginToLanding false.
    if(moveLoginToLanding) {
      clear_moveLoginToLanding(); 
    }
  },[moveLoginToLanding])

  function submitForm(event) {
    event.preventDefault();
    loginToServer(formData.password);
  };

  function formStatus(formState,errMsg="") {
    switch(formState) {
      case 0:
        return "";
      case 1:
        return "Checking credentials on server. Please wait...";
      case 2: {
        const msg = sessionStorage.getItem("tokenType").toUpperCase();
        return `You are logged in, you can now visit ${msg} pages on this site.`;
      }
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

        <h3 className="formStatus">{formStatus(loginFormState, loginErrMsg)}</h3>

      </form>

      {/* This is for debugging purposes only
      remove for production */}
      {/* <p>{`password:${formData.password}`}</p> */}
      <p>{`moveLoginToLanding:${moveLoginToLanding}`}</p>
      <p>{`notLoggedIn:${notLoggedIn}`}</p>
      <p>{`loginFormState:${loginFormState}`}</p>
      <p>{`loginErrMsg:${loginErrMsg}`}</p>

      
    </div> 
  );
};

function mapStateToProps(state) {
  return {
    loginFormState: state.loginFormState,
    loginErrMsg: state.loginErrMsg,
    moveLoginToLanding: state.moveLoginToLanding,
    notLoggedIn: state.notLoggedIn,
  };
}


export default connect(mapStateToProps,
  {loginToServer, clear_moveLoginToLanding}
)(Login);


