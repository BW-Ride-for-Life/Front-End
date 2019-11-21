import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMobile, faEnvelope, faMapMarkedAlt, faMoneyBill, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

import {ButtonGroup, Button, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap'

const OptionContainer = styled.div`
    width: 100%;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
`

const DriverProfileForm = ({values, errors, touched, status, isLoggedIn, profileData, updateDriverProfile}) => {
    const [formData, setFormData] = useState(profileData);

    useEffect(() => {
        status && setFormData(status);
        status && updateDriverProfile(status);
    }, [status]);

    const showMeTheButtons = (isLoggedIn) => {
        if (isLoggedIn) {
            return (
                <ButtonGroup className="d-flex">
                    <Button type="submit" color="primary">Update</Button>
                    <Link to="/Login" className="btn btn-danger">Delete Account</Link>
                </ButtonGroup>
            )
        }else{
            return (
                <>
                    <Button type="submit" color="primary" block>Sign Up</Button>
                </>
            )
        }
    } 

    return (
        <>
            <Form>
                {!isLoggedIn && <h3 className="mb-4">Drive with Ride for Life</h3>}

                {isLoggedIn && <h4 className="mt-4 mb-4">Update Profile</h4>}
                
                <InputGroup size="" className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><FontAwesomeIcon icon={faUser} /></InputGroupText>
                    </InputGroupAddon>
                    <Field name="drivers_name" id="drivers_name" placeholder="Name" className="form-control" />
                    {touched.drivers_name && errors.drivers_name ? (<small style={{width: "100%"}} className="form-text text-danger">{errors.drivers_name}</small>) : null}
                </InputGroup>
                
                <InputGroup size="" className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><FontAwesomeIcon icon={faMobile} /></InputGroupText>
                    </InputGroupAddon>
                    <Field name="drivers_phone_number" id="drivers_phone_number" placeholder="Phone Number" className="form-control" />
                    {touched.drivers_phone_number && errors.drivers_phone_number ? (<small style={{width: "100%"}} className="form-text text-danger">{errors.drivers_phone_number}</small>) : null}
                </InputGroup>
                
                <InputGroup size="" className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><FontAwesomeIcon icon={faEnvelope} /></InputGroupText>
                    </InputGroupAddon>
                    <Field name="drivers_email" id="drivers_email" placeholder="Email Address" className="form-control" />
                    {touched.drivers_email && errors.drivers_email ? (<small style={{width: "100%"}} className="form-text text-danger">{errors.drivers_email}</small>) : null}
                </InputGroup>

                <InputGroup size="" className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><FontAwesomeIcon icon={faMapMarkedAlt} /></InputGroupText>
                    </InputGroupAddon>
                    <Field name="drivers_plot" id="drivers_plot" placeholder="Address" className="form-control" />
                    {touched.drivers_plot && errors.drivers_plot ? (<small style={{width: "100%"}} className="form-text text-danger">{errors.drivers_plot}</small>) : null}
                </InputGroup>

                <InputGroup size="" className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><FontAwesomeIcon icon={faMoneyBill} /></InputGroupText>
                    </InputGroupAddon>
                    <Field name="drivers_price" id="drivers_price" placeholder="Price" className="form-control" />
                    {touched.drivers_price && errors.drivers_price ? (<small style={{width: "100%"}} className="form-text text-danger">{errors.drivers_price}</small>) : null}
                </InputGroup>

                <InputGroup size="" className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><FontAwesomeIcon icon={faLock} /></InputGroupText>
                    </InputGroupAddon>
                    <Field type="password" name="password" id="drivers_password" placeholder="Password" className="form-control" />
                    {touched.password && errors.password ? (<small style={{width: "100%"}} className="form-text text-danger">{errors.password}</small>) : null}
                </InputGroup>

                <InputGroup size="" className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><FontAwesomeIcon icon={faUnlock} /></InputGroupText>
                    </InputGroupAddon>
                    <Field type="password" name="password2" id="drivers_password2" placeholder="Confirm Password" className="form-control" />
                    {touched.password2 && errors.password2 ? (<small style={{width: "100%"}} className="form-text text-danger">{errors.password2}</small>) : null}
                </InputGroup>

                <Field type="hidden" name="id" id="drivers_id" />

                <div>
                    {showMeTheButtons(isLoggedIn)}
                </div>
                
                {
                    !isLoggedIn && (
                        <OptionContainer>
                            <Link to="/NewMother">Not a driver? Sign Up</Link>
                            <Link to="/Login">Already have an accout? Login</Link>
                        </OptionContainer>
                    )
                }
                
            </Form>
        </>
    )
}

const FormikDriverForm = withFormik({
    mapPropsToValues({profileData}) {
      return {
        id: profileData.id || "",
        drivers_name: profileData.drivers_name || "",
        drivers_plot: profileData.drivers_plot || "",
        drivers_phone_number: profileData.drivers_phone_number || "",
        drivers_email: profileData.drivers_email || "",
        drivers_price: profileData.drivers_price || "",
        password: profileData.password || ""

      };
    },
  
    // validationSchema: Yup.object().shape({
    //   name: Yup.string().required("Please input a name"),
    //   plot: Yup.string().required("Please input a plot location"),
    //   phoneNo: Yup.number().required("Please input a phone number").typeError("Please input only digits not other chars")
    //     .min(111,"Please input a 3 digit phone number").max(999,"Please input a 3 digit phone number").integer("Please input only integers"),
    //   email: Yup.string().required("Please input an email address").email("Please enter a valid email"),
    //   price: Yup.number().required("Please input a price").typeError("Please input only digits not other chars")
    //     .integer("Please input only integers"),
    //   password: Yup.string().required("Please input a password").min(3,"Min of 3 chars for the password"),
    //   password2: Yup.string().required().test('passwords-match', 'Passwords must match ya fool', function(value) {
    //     if(this.parent.password === value){
    //         //change icon on password2
    //         return this.parent.password === value;
    //     }        
    //     })
    // }),
    handleSubmit(values, {setStatus, resetForm }) {
        setStatus(values);
        //resetForm();
    }
  })(DriverProfileForm);

export default FormikDriverForm;