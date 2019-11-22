import React, { useState, useEffect } from 'react';
import { Form, withFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import axiosWithAuth from '../modules/axiosAuth';

import textIcon from '../images/text.png';
import rateIcon from '../images/star-half.png';

import TextIn from './TextIn';
import SubmitBtn from './SubmitBtn';

import {pathPrefix} from '../actions';


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


const UpdateReviewForm = (props) => {
  const {
    //Formik bindings
    errors,touched,  //status, 
    //React router props
    //history,
  } = props;

  const [data, setData] = useState({});
  

  //Saves sessionData in local state
  useEffect(() => {
    setData(JSON.parse(sessionStorage.getItem('updateRevuData')));
  }, []);
 


  return ( <>
    <StyledH1>{`Update review for driver: ${data.drivers_name}`}</StyledH1>


    <FormCtrDiv>
      <Form>

        <TextIn 
          fieldName="rating" fieldType="text" fieldPlaceHolder="Driver rating" 
          iconImg={rateIcon} imgTxt="Rating Icon"
          touched={touched.rating} errors={errors.rating}
        />

        <TextIn 
          fieldName="revuTxt" fieldType="text" fieldPlaceHolder="Review Text" 
          iconImg={textIcon} imgTxt="Text Icon"
          touched={touched.revuTxt} errors={errors.revuTxt}
        />

        <SubmitBtn textDisplay={"Update Review"}/>

      </Form>
        
    </FormCtrDiv>



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
    
 
 } //End of UpdateReviewForm function
 
 
 
const FormikUpdateReviewForm = withFormik({
  
  mapPropsToValues({ rating, revuTxt }) {
    return {
      rating: rating || "",
      revuTxt: revuTxt || "",
    };
  },

  validationSchema: Yup.object().shape({
    revuTxt: Yup.string().required("Please input a review"),
    rating: Yup.number().required("Please input a rating")
      .typeError("Please input only digits not other chars")
      .integer("Please input only digits not other chars"),
  }),
  
  handleSubmit(values, formikBag) {
    // console.log("This is values",values);
    // console.log("This is formikBag",formikBag);
    // console.log("This is props in formikBag",formikBag.props);

    const { setStatus, resetForm } = formikBag;
    
    resetForm();
    setStatus(values);

    let dataToSrv = JSON.parse(sessionStorage.getItem('updateRevuData'));
    sessionStorage.removeItem('updateRevuData');
    delete dataToSrv.drivers_name;
    const reviewId =  dataToSrv.id;
    delete dataToSrv.id;

    dataToSrv.rating = parseInt(values.rating,10);
    dataToSrv.review_text = values.revuTxt;


    // console.log("The data to srv in handleSubmit in AddReviewForm is:",dataToSrv);

    axiosWithAuth()
      .put(pathPrefix+"/api/reviews/"+reviewId,dataToSrv)
      .then(res => {
        // console.log("This is data from server in handleSubmit in UpdateReviewForm THEN :",res.data);
        
      })
      .catch(err => {
        console.log("This is data from server, in CATCH of handleSubmit in UpdateReviewForm, err:",err);
        console.log("This is data from server, in CATCH of handleSubmit in UpdateReviewForm, err.response:",err.response);
        
      });


    //Go back to review listing page
    formikBag.props.history.push('/reviewList');

    

    //I don't need the if statements here, as it seems Formik will not execute handleSubmit until
    //touched is true and there are no errors
    

  },
  
  
})(UpdateReviewForm); 

export default FormikUpdateReviewForm;


