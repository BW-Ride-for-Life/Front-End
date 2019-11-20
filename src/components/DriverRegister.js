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
import {driverRegUpd, clear_movePageToPage, clear_driverInfo} from '../actions';

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


const DriverRegister = (props) => {
  const {
    //Formik bindings
    errors,touched, setFieldValue, status,
    //Redux state bindings
    formState, formErrMsg, movePageToPage, driverInfo,
    //Redux action bindings
    clear_movePageToPage, driverDelete, userLogout, clear_driverInfo,
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
    //When comming from the Driver profile page. Preload form data from 
    //state if it is available
    if(Object.entries(driverInfo).length !== 0) {
      setFieldValue("name",driverInfo.name,false);
      setFieldValue("plot",driverInfo.plot,false);
      setFieldValue("phoneNo",driverInfo.phoneNo,false);
      setFieldValue("email",driverInfo.email,false);
      setFieldValue("price",driverInfo.price,false);
      //setFieldValue is not used for password field
      
      if(sessionStorage.getItem('driverInfo')) {
        sessionStorage.removeItem('driverInfo');
      }

      clear_driverInfo();
    }

    //When comming from the Driver profile page. Preload form data from 
    //sessionStorage as state may be reset if user moves from driver profile
    //to this page by typing the path of this page in the address bad
    if(sessionStorage.getItem('driverInfo')) {

      const fromSess = JSON.parse(sessionStorage.getItem('driverInfo'));

      setFieldValue("name",fromSess.name,false);
      setFieldValue("plot",fromSess.plot,false);
      setFieldValue("phoneNo",fromSess.phoneNo,false);
      setFieldValue("email",fromSess.email,false);
      setFieldValue("price",fromSess.price,false);
      //setFieldValue is not used for password field

      sessionStorage.removeItem('driverInfo');
    }
    
  }, []);




  useEffect(() => {
    if(movePageToPage && !(sessionStorage.getItem("tokenType")) ) {
      history.push('/');
    }

    if(movePageToPage && (sessionStorage.getItem("tokenType")) ) {
      history.push('/profDrv');
    }

    //When the redux state flag moveFormToForm becomes true, it indicates that we 
    //have to move from automatically to another page. The if statements above do
    //this, and after they have done their work, we need to make moveFormToForm false.
    //& formState=0 & formErrMsg=""
    if(movePageToPage) {
      clear_movePageToPage(); 
    }

  }, [movePageToPage]);

  // *@* This set the messages to the user to keep him
  // aware of the state of the page
  function formStatus(formState,errMsg="") {
    switch(formState) {
      case 0:
        return "";
      case 1: 
        return "Transferring data to server. Please wait...";
      case 2: {
        const nextPg = sessionStorage.getItem("token") ? "profile" : "login"; 
        return `Transferring to ${nextPg} page. Please wait...`;
      }        
      case 3:
        return errMsg;
      default:
        return "Unknown Error";      
    }
  }

  function clickHandlerDelete(e) {
    e.preventDefault();
    console.log("Delete button in DriverRegister clicked")
  }

  function clickHandlerLogout(e) {
    e.preventDefault();
    console.log("Logout button in DriverRegister clicked")
  }


  return ( <>
    {!sessionStorage.getItem("token") && (<StyledH1>Driver Registration Page</StyledH1>)}

    {sessionStorage.getItem("token") && (<StyledH1>Driver Information Update Page</StyledH1>)}

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
          fieldName="price" fieldType="text" fieldPlaceHolder="Price" 
          iconImg={cashIcon} imgTxt="Cash Icon"
          touched={touched.price} errors={errors.price}
        />

        <TextIn 
          fieldName="password" fieldType="password" fieldPlaceHolder="Password" 
          iconImg={lockIcon} imgTxt="Password Icon"
          touched={touched.password} errors={errors.password}
        />

        {!sessionStorage.getItem("token")  && (<SubmitBtn textDisplay={"Register"}/>)}

        {sessionStorage.getItem("token") && (<ButtonDiv>
          <SubmitBtn textDisplay={"Update"}/>
          <SpaceDiv></SpaceDiv>
          <ActionBtn textDisplay={"Delete"} clickHandler={clickHandlerDelete}/>
          <SpaceDiv></SpaceDiv>
          <ActionBtn textDisplay={"Logout"} clickHandler={clickHandlerLogout}/>
        </ButtonDiv>)}

      </Form>
        
    </FormCtrDiv>

    {/* *@* This is for message of page state to user*/}
    <StyledH3>{formStatus(formState, formErrMsg)}</StyledH3>


      {/* The following code is for testing purposes only */}
      {/* comment out in customer version of the code */}
      {/* <p>{`The donor ID is: ${data.donorId}`}</p> */}
      {/* <p>{`The name is: ${data.name}`}</p>
      <p>{`The plot location is: ${data.plot}`}</p>
      <p>{`The phoneNo is: ${data.phoneNo}`}</p>
      <p>{`The email is: ${data.email}`}</p>
      <p>{`The price is: ${data.price}`}</p>
      <p>{`The password is: ${data.password}`}</p> */}
   
      


    </>

  );
    
 
 } //End of DriverRegister function
 
 
 
const FormikDriverRegister = withFormik({
  
  mapPropsToValues({ name, plot, phoneNo, email, price, password, }) {
    return {
      name: name || "",
      plot: plot || "",
      phoneNo: phoneNo || "",
      email: email || "",
      price: price || "",
      password: password || "",
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Please input a name"),
    plot: Yup.string().required("Please input a plot location"),
    phoneNo: Yup.string().required("Please input a phone number"),
    email: Yup.string().required("Please input an email address").email("Please enter a valid email"),
    price: Yup.number().required("Please input a price").typeError("Please input only digits not other chars")
      .integer("Please input only integers"),
    password: Yup.string().required("Please input a password").min(3,"Min of 3 chars for the password"),
  }),
  
  handleSubmit(values, formikBag) {
    console.log("This is values",values);
    console.log("This is formikBag",formikBag);
    console.log("This is props in formikBag",formikBag.props);

    const { setStatus, resetForm } = formikBag;
    const {driverRegUpd} = formikBag.props;
    resetForm();
    setStatus(values);
    
    // *@* Redux action call
    driverRegUpd(values);

    //I don't need the if statements here, as it seems Formik will not execute handleSubmit until
    //touched is true and there are no errors
    

  },
  
  
})(DriverRegister); 

function mapStateToProps(state) {
  return {
    formState: state.formState,
    formErrMsg: state.formErrMsg,
    movePageToPage: state.movePageToPage,
    driverInfo: state.driverInfo,
  };
}

export default connect(mapStateToProps,
  {driverRegUpd, clear_movePageToPage, clear_driverInfo}
)(FormikDriverRegister);