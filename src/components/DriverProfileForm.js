import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMobile, faEnvelope, faMapMarkedAlt, faMoneyBill, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

import {ButtonGroup, Button, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap'

const isLoggedIn = false;

const OptionContainer = styled.div`
    width: 100%;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
`

const DriverProfileForm = ({values, errors, touched, status}) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        // api call for user data
        status && setFormData(status)
    }, [status])

    function clickHandlerDelete(e) {
        e.preventDefault();
        console.log("Delete button in DriverRegister clicked")
    }

    function clickHandlerLogout(e) {
        e.preventDefault();
        console.log("Logout button in DriverRegister clicked")
    }

    const showMeTheButtons = (isLoggedIn) => {
        if (isLoggedIn) {
            return (
                
                <ButtonGroup className="d-flex">
                    <Button type="submit" color="primary">Update</Button>
                    <button type="reset" className="btn btn-danger" onClick={clickHandlerDelete}>Delete</button>
                </ButtonGroup>
                
            )
        }else{
            return (
                <>
                    <Button type="submit" color="primary" block>Sign Up</Button>
                    {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                </>
            )
        }
    } 

    return (
        <>
            <Form>
                <h3 className="mb-4">Drive with Ride for Life</h3>
                <InputGroup size="" className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><FontAwesomeIcon icon={faUser} /></InputGroupText>
                    </InputGroupAddon>
                    <Field name="name" id="user_name" placeholder="Name" className="form-control" />
                    {touched.name && errors.name ? (<small style={{width: "100%"}} className="form-text text-danger">{errors.name}</small>) : null}
                </InputGroup>
                
                <InputGroup size="" className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><FontAwesomeIcon icon={faMobile} /></InputGroupText>
                    </InputGroupAddon>
                    <Field name="phoneNo" id="user_phone_number" placeholder="Phone Number" className="form-control" />
                    {touched.phoneNo && errors.phoneNo ? (<small style={{width: "100%"}} className="form-text text-danger">{errors.phoneNo}</small>) : null}
                </InputGroup>
                
                <InputGroup size="" className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><FontAwesomeIcon icon={faEnvelope} /></InputGroupText>
                    </InputGroupAddon>
                    <Field name="email" id="email" placeholder="Email Address" className="form-control" />
                    {touched.email && errors.email ? (<small style={{width: "100%"}} className="form-text text-danger">{errors.email}</small>) : null}
                </InputGroup>

                <InputGroup size="" className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><FontAwesomeIcon icon={faMapMarkedAlt} /></InputGroupText>
                    </InputGroupAddon>
                    <Field name="plot" id="user_plot" placeholder="Address" className="form-control" />
                    {touched.plot && errors.plot ? (<small style={{width: "100%"}} className="form-text text-danger">{errors.plot}</small>) : null}
                </InputGroup>

                <InputGroup size="" className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><FontAwesomeIcon icon={faMoneyBill} /></InputGroupText>
                    </InputGroupAddon>
                    <Field name="price" id="driver_price" placeholder="Price" className="form-control" />
                    {touched.price && errors.price ? (<small style={{width: "100%"}} className="form-text text-danger">{errors.price}</small>) : null}
                </InputGroup>

                <InputGroup size="" className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><FontAwesomeIcon icon={faLock} /></InputGroupText>
                    </InputGroupAddon>
                    <Field type="password" name="password" id="user_password" placeholder="Password" className="form-control" />
                    {touched.password && errors.password ? (<small style={{width: "100%"}} className="form-text text-danger">{errors.password}</small>) : null}
                </InputGroup>

                <InputGroup size="" className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><FontAwesomeIcon icon={faUnlock} /></InputGroupText>
                    </InputGroupAddon>
                    <Field type="password" name="password2" id="user_password2" placeholder="Confirm Password" className="form-control" />
                    {touched.password2 && errors.password2 ? (<small style={{width: "100%"}} className="form-text text-danger">{errors.password2}</small>) : null}
                </InputGroup>

                <Field type="hidden" name="user_id" id="user_id" />

                <div>
                    {showMeTheButtons(isLoggedIn)}
                </div>
                <OptionContainer>
                        <Link to="/NewMother">Not a driver? Sign Up</Link>
                        <Link to="/Login">Already have an accout? Login</Link>
                </OptionContainer>
            </Form>
        </>
    )
}

const FormikDriverForm = withFormik({
  
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
      password2: Yup.string().required().test('passwords-match', 'Passwords must match ya fool', function(value) {
        if(this.parent.password === value){
            //change icon on password2
            return this.parent.password === value;
        }        
        })
    }),
    
    handleSubmit(values, { setStatus, resetForm }) {
  
      resetForm();
      setStatus(values);
  
      //I don't need the if statements here, as it seems Formik will not execute handleSubmit until
      //touched is true and there are no errors
      
  
    },
    
    
  })(DriverProfileForm);

export default FormikDriverForm;