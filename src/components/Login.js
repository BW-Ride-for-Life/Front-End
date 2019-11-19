import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, withFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

import mailIcon from '../images/mail.png';
import lockIcon from '../images/lock.png';

import TextIn from './TextIn';
import SubmitBtn from './SubmitBtn';
import UserDropDown from './UserDropDown';

const StyledH1 = styled.h1`
  width:fit-content;
  margin:0 auto;
  margin-top:10px;
  font-size:30px;
  // font-family: 'Muli', sans-serif;
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
  // font-family: 'Muli', sans-serif;
`;

const RegisDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
`;


const Login = (props) => {
  const {
    //Formik bindings
    errors,touched,status,
    //Redux state bindings
    loginFormState, loginErrMsg, moveLoginToLanding, notLoggedIn,
    //Redux action bindings
    loginToServer, clear_moveLoginToLanding,
    //React router props
    history,
  } = props;
  const [data, setData] = useState({});
  

  //Saves data into local state
  useEffect(() => {
    status && setData(status);
  }, [status]);




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

          {/* This is for last communication method */}
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


      {/* The following code is for testing purposes only */}
      {/* comment out in customer version of the code */}
      {/* <p>{`The donor ID is: ${data.donorId}`}</p> */}
      <p>{`The email address is: ${data.email}`}</p>
      <p>{`The password is: ${data.password}`}</p>
      <p>{`The donor communication method is: ${data.userType}`}</p>
      


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
    userType: Yup.string().oneOf(["Mom", "Driver"],"Please choose user type").required("Please choose user type"),
  }),
  
  handleSubmit(values, { setStatus, resetForm }) {

    resetForm();
    setStatus(values);

    //I don't need the if statements here, as it seems Formik will not execute handleSubmit until
    //touched is true and there are no errors
    

  },
  
  
})(Login); 
  
export default FormikLogin;



