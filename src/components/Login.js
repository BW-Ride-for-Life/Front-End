import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, withFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import {connect} from 'react-redux';

import mailIcon from '../images/mail.png';
import lockIcon from '../images/lock.png';

import TextIn from './TextIn';
import SubmitBtn from './SubmitBtn';
import UserDropDown from './UserDropDown';

// *@* redux actions
import {loginToServer, clear_moveLoginToLanding} from '../actions';

const StyledH1 = styled.h1`
  width:fit-content;
  margin:0 auto;
  margin-top:10px;
  font-size:30px;
`;

const FormCtrDiv = styled.div`
  margin-top:20px;
  display: flex;
  align-items: center;
  justify-content: center;
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

const StyledH3 = styled.h3`
  width:fit-content;
  margin:0 auto;
  margin-top:10px;
`;


// Component for Login
const Login = (props) => {
  const {
    //Formik bindings
    errors,touched,  //status,
    // *@* Redux state bindings
    loginFormState, loginErrMsg, moveLoginToLanding, notLoggedIn,
    // *@* Redux action bindings
    clear_moveLoginToLanding,
    // *@* React router props
    history,
  } = props;

  // For debugging use only
  // const [data, setData] = useState({});

  //Saves data into local state for debugging use only
  // useEffect(() => {
  //   status && setData(status);
  // }, [status]);

  // *@* This moves us from login to mom/driver profile page when the login is 
  // successful
  useEffect(()=>{
    if(moveLoginToLanding && (sessionStorage.getItem("tokenType")==="mom")) {
      history.push('/profMom');
    }
    if(moveLoginToLanding && (sessionStorage.getItem("tokenType")==="driver")) {
      history.push('/profDrv');
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

  // *@* This set the messages to the user to keep him
  // aware of the state of the page
  function formStatus(formState,errMsg="") {
    switch(formState) {
      case 0:
        return "";
      case 1:
        return "Checking credentials on server. Please wait...";
      case 2: 
        return "You are logged in, please wait...";
      case 3:
        return errMsg;
      default:
        return "Unknown Error";      
    }
  }


  return (
    <>
      <StyledH1>Login Page</StyledH1>

      <FormCtrDiv>
        <Form>

          <TextIn 
            fieldName="email" fieldType="email" fieldPlaceHolder="Email" 
            iconImg={mailIcon} imgTxt="Email Icon"
            touched={touched.email} errors={errors.email}
          />

          <TextIn 
            fieldName="password" fieldType="password" fieldPlaceHolder="Password" 
            iconImg={lockIcon} imgTxt="Password Icon"
            touched={touched.password} errors={errors.password}
          />

          <UserDropDown  fieldName="userType" touched={touched.userType} errors={errors.userType} />

          <SubmitBtn textDisplay={"Login"}/>
          
          <RegisDiv>
            <p>
              Register new Mom 
              <span> 
                <StyledLink to='/regMom' > here</StyledLink>
              </span>
            </p>
          </RegisDiv>

          <RegisDiv>
            <p>
              Register new Driver 
              <span> 
                <StyledLink to='/regDrv' > here</StyledLink>
              </span>
            </p>
          </RegisDiv>


        </Form>
        
      </FormCtrDiv>

      {/* *@* This is for message of page state to user*/}
      <StyledH3>{formStatus(loginFormState, loginErrMsg)}</StyledH3>

      {/* The following code is for testing purposes only */}
      {/* comment out in customer version of the code */}
      {/* <p>{`The donor ID is: ${data.donorId}`}</p> */}
      {/* <p>{`The email address is: ${data.email}`}</p>
      <p>{`The password is: ${data.password}`}</p>
      <p>{`The donor communication method is: ${data.userType}`}</p> */}
      

    </>

  );
    
 
 } //End of Login function
 
 
 
const FormikLogin = withFormik({
  
  mapPropsToValues({ email, password, userType }) {
    return {
      email: email || "",
      password: password || "",
      userType: userType || "",
    };
  },

  validationSchema: Yup.object().shape({
    email: Yup.string().required("Please input donor's email address").email("Please enter a valid email"),
    password: Yup.string().required("Please input a password").min(3,"Min of 3 chars for the password"),
    userType: Yup.string().oneOf(["mom", "driver"],"Please choose user type").required("Please choose user type"),
  }),
  
  handleSubmit(values, formikBag) {
    // console.log("This is values",values);
    // console.log("This is formikBag",formikBag);
    // console.log("This is props in formikBag",formikBag.props);

    const { setStatus, resetForm } = formikBag;
    const {loginToServer} = formikBag.props;
    resetForm();
    setStatus(values);

    // *@* Redux action call
    loginToServer(values);

    //I don't need the if statements here, as it seems Formik will not execute handleSubmit until
    //touched is true and there are no errors
    

  },
  
  
})(Login); 

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
)(FormikLogin);



