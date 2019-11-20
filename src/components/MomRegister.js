import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, withFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

import mailIcon from '../images/mail.png';
import userIcon from '../images/user.png';
import locationIcon from '../images/compass.png';
import phoneIcon from '../images/phoneHeadset.png';
import cashIcon from '../images/cash.png';
import lockIcon from '../images/lock.png';

import TextIn from './TextIn';
import SubmitBtn from './SubmitBtn';
import ActionBtn from './ActionBtn';

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


// const isLoggedIn = true;
const isLoggedIn = false;


const MomRegister = (props) => {
  const {
    //Formik bindings
    errors,touched,status,
    //Redux state bindings
    formState, formErrMsg, moveFormToForm,
    //Redux action bindings
    registerDriver, deleteDriver, updateDriver, logOutUser,
    //React router props
    history,
  } = props;
  const [data, setData] = useState({});
  

  //Saves data into local state
  useEffect(() => {
    status && setData(status);
  }, [status]);

  function clickHandlerDelete(e) {
    e.preventDefault();
    console.log("Delete button in MomRegister clicked")
  }

  function clickHandlerLogout(e) {
    e.preventDefault();
    console.log("Logout button in MomRegister clicked")
  }


  return ( <>
    {!isLoggedIn && (<StyledH1>Mom Registration Page</StyledH1>)}

    {isLoggedIn && (<StyledH1>Mom Information Update Page</StyledH1>)}

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

        {!isLoggedIn && (<SubmitBtn textDisplay={"Register"}/>)}

        {isLoggedIn && (<ButtonDiv>
          <SubmitBtn textDisplay={"Update"}/>
          <SpaceDiv></SpaceDiv>
          <ActionBtn textDisplay={"Delete"} clickHandler={clickHandlerDelete}/>
          <SpaceDiv></SpaceDiv>
          <ActionBtn textDisplay={"Logout"} clickHandler={clickHandlerLogout}/>
        </ButtonDiv>)}

      </Form>
        
    </FormCtrDiv>


      {/* The following code is for testing purposes only */}
      {/* comment out in customer version of the code */}
      {/* <p>{`The donor ID is: ${data.donorId}`}</p> */}
      <p>{`The name is: ${data.name}`}</p>
      <p>{`The plot location is: ${data.plot}`}</p>
      <p>{`The phoneNo is: ${data.phoneNo}`}</p>
      <p>{`The email is: ${data.email}`}</p>
      <p>{`The price is: ${data.price}`}</p>
      <p>{`The password is: ${data.password}`}</p>
   
      


    </>

  );
    
 
 } //End of MomRegister function
 
 
 
const FormikMomRegister = withFormik({
  
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
    phoneNo: Yup.number().required("Please input a phone number").typeError("Please input only digits not other chars")
      .min(111,"Please input a 3 digit phone number").max(999,"Please input a 3 digit phone number").integer("Please input only integers"),
    email: Yup.string().required("Please input an email address").email("Please enter a valid email"),
    price: Yup.number().required("Please input a price").typeError("Please input only digits not other chars")
      .integer("Please input only integers"),
    password: Yup.string().required("Please input a password").min(3,"Min of 3 chars for the password"),
  }),
  
  handleSubmit(values, formikBag) {
    // console.log("This is values",values);
    // console.log("This is formikBag",formikBag);
    // console.log("This is props in formikBag",formikBag.props);

    const { setStatus, resetForm } = formikBag;
    //const {loginToServer} = formikBag.props;
    resetForm();
    setStatus(values);

    //I don't need the if statements here, as it seems Formik will not execute handleSubmit until
    //touched is true and there are no errors
    

  },
  
  
})(MomRegister); 
  
export default FormikMomRegister;