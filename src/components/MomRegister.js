import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, withFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import {connect} from 'react-redux';

import mailIcon from '../images/mail.png';
import userIcon from '../images/user.png';
import locationIcon from '../images/compass.png';
import phoneIcon from '../images/phoneHeadset.png';
import cashIcon from '../images/cash.png';
import lockIcon from '../images/lock.png';

import TextIn from './TextIn';
import SubmitBtn from './SubmitBtn';
import ActionBtn from './ActionBtn';

// *@* redux actions
import {momReg, clear_momRegMovePage} from '../actions';

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

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SpaceDiv = styled.div`
  width:10px;
  height:20px;
`;

const StyledH3 = styled.h3`
  width:fit-content;
  margin:0 auto;
  margin-top:10px;
`;


const MomRegister = (props) => {
  const {
    //Formik bindings
    errors,touched,status,
    //Redux state bindings
    momRegState, momRegErrMsg, momRegMove,
    //Redux action bindings
    clear_momRegMovePage, 
    //React router props
    history,
  } = props;

  // For debugging use only
  const [data, setData] = useState({});
  

  //Saves data into local state for debugging use only
  useEffect(() => {
    status && setData(status);
  }, [status]);

  useEffect(() => {
    if(momRegMove) {
      history.push('/');
    }

    //When the redux state flag momRegMove becomes true, it indicates that we 
    //have to move from automatically to another page. The if statement above do
    //this, and after they have done their work, we need to make momRegMove false.
    if(momRegMove) {
      clear_momRegMovePage(); 
    }

  }, [momRegMove]);


  // *@* This set the messages to the user to keep him
  // aware of the state of the page
  function formStatus(formState,errMsg="") {
    switch(formState) {
      case 0:
        return "";
      case 1: 
        return "Transferring data to server. Please wait...";
      case 2: 
        return `Transferring to login page. Please wait...`;  
      case 3:
        return errMsg;
      default:
        return "Unknown Error";      
    }
  }


  return ( <>
    <StyledH1>Mom Registration Page</StyledH1>


    <FormCtrDiv>
      <Form>

        <TextIn 
          fieldName="name" fieldType="text" fieldPlaceHolder="Name" 
          iconImg={userIcon} imgTxt="User Icon"
          touched={touched.name} errors={errors.name}
        />

        <TextIn 
          fieldName="plot" fieldType="text" fieldPlaceHolder="Location Plot" 
          iconImg={locationIcon} imgTxt="Location Icon"
          touched={touched.plot} errors={errors.plot}
        />

        <TextIn 
          fieldName="phoneNo" fieldType="text" fieldPlaceHolder="DonorPhoneNo" 
          iconImg={phoneIcon} imgTxt="Phone Icon"
          touched={touched.phoneNo} errors={errors.phoneNo}
        />

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

        <SubmitBtn textDisplay={"Register"}/>

      </Form>
        
    </FormCtrDiv>


    {/* *@* This is for message of page state to user*/}
    <StyledH3>{formStatus(momRegState, momRegErrMsg)}</StyledH3>

      {/* The following code is for testing purposes only */}
      {/* comment out in customer version of the code */}
      {/* <p>{`The donor ID is: ${data.donorId}`}</p> */}
      {/* <p>{`The name is: ${data.name}`}</p>
      <p>{`The plot location is: ${data.plot}`}</p>
      <p>{`The phoneNo is: ${data.phoneNo}`}</p>
      <p>{`The email is: ${data.email}`}</p>
      <p>{`The password is: ${data.password}`}</p> */}
   
      


    </>

  );
    
 
 } //End of MomRegister function
 
 
 
const FormikMomRegister = withFormik({
  
  mapPropsToValues({ name, plot, phoneNo, email, password, }) {
    return {
      name: name || "",
      plot: plot || "",
      phoneNo: phoneNo || "",
      email: email || "",
      password: password || "",
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Please input a name"),
    plot: Yup.string().required("Please input a plot location"),
    phoneNo: Yup.string().required("Please input a phone number"),
    email: Yup.string().required("Please input an email address").email("Please enter a valid email"),
    password: Yup.string().required("Please input a password").min(3,"Min of 3 chars for the password"),
  }),
  
  handleSubmit(values, formikBag) {
    // console.log("This is values",values);
    // console.log("This is formikBag",formikBag);
    // console.log("This is props in formikBag",formikBag.props);

    const { setStatus, resetForm } = formikBag;
    const {momReg} = formikBag.props;
    resetForm();
    setStatus(values);

    // *@* Redux action call
    momReg(values);

    //I don't need the if statements here, as it seems Formik will not execute handleSubmit until
    //touched is true and there are no errors
    

  },
  
  
})(MomRegister); 
  
function mapStateToProps(state) {
  return {
    momRegState: state.momRegState,
    momRegErrMsg: state.momRegErrMsg,
    momRegMove: state.momRegMove,
  };
}

export default connect(mapStateToProps,
  {momReg, clear_momRegMovePage}
)(FormikMomRegister);

