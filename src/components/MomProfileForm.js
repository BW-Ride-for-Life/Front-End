import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMobile, faEnvelope, faMapMarkedAlt, faCalendarAlt, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import {Button, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap'

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const isLoggedIn = false;

const OptionContainer = styled.div`
    width: 100%;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
`

const ProfileForm = ({values, errors, touched, status}) => {
    const [formData, setFormData] = useState({});

    const [driverDate, setDriverDate] = useState(new Date());

    function changeDate(today) {
        setDriverDate(today)
    }

    useEffect(() => {
        // api call for user data
        status && setFormData(status)
    }, [status])

    const showMeTheButtons = (isLoggedIn) => {
        if (isLoggedIn) {
            return (
                <>                    
                    <button type="submit" className="btn btn-primary">Update</button>
                    <button type="reset" className="btn btn-danger">Delete</button>
                </>
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
                <h3 className="mb-4">Sign Up with Ride for Life</h3>
                <InputGroup size="" className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><FontAwesomeIcon icon={faUser} /></InputGroupText>
                    </InputGroupAddon>
                    <Field name="user_name" id="user_name" placeholder="Name" className="form-control" />
                    {touched.user_name && errors.user_name ? (<small style={{width: "100%"}} className="form-text text-danger">{errors.user_name}</small>) : null}
                </InputGroup>

                <InputGroup size="" className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><FontAwesomeIcon icon={faMobile} /></InputGroupText>
                    </InputGroupAddon>
                    <Field type="text" name="user_phone_number" id="user_phone_number" placeholder="Phone Number" className="form-control" />
                    {touched.user_phone_number && errors.user_phone_number ? (<small style={{width: "100%"}} className="form-text text-danger">{errors.user_phone_number}</small>) : null}
                </InputGroup>
                
                <InputGroup size="" className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><FontAwesomeIcon icon={faEnvelope} /></InputGroupText>
                    </InputGroupAddon>
                    <Field name="email" placeholder="Email Address" className="form-control" />
                    {touched.user_email && errors.user_email ? (<small style={{width: "100%"}} className="form-text text-danger">{errors.user_email}</small>) : null}
                </InputGroup>

                <InputGroup size="" className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><FontAwesomeIcon icon={faMapMarkedAlt} /></InputGroupText>
                    </InputGroupAddon>
                    <Field name="user_plot" id="user_plot" placeholder="Address" className="form-control" />
                    {touched.user_plot && errors.user_plot ? (<small style={{width: "100%"}} className="form-text text-danger">{errors.user_plot}</small>) : null}
                </InputGroup>

                <InputGroup size="" className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><FontAwesomeIcon icon={faLock} /></InputGroupText>
                    </InputGroupAddon>
                    <Field name="password" id="user_password" placeholder="Password" className="form-control" />
                    {touched.password && errors.password ? (<small style={{width: "100%"}} className="form-text text-danger">{errors.password}</small>) : null}
                </InputGroup>

                <InputGroup size="" className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><FontAwesomeIcon icon={faUnlock} /></InputGroupText>
                    </InputGroupAddon>
                    <Field name="password2" id="user_password2" placeholder="Confirm Password" className="form-control" />
                    {touched.password2 && errors.password2 ? (<small style={{width: "100%"}} className="form-text text-danger">{errors.password2}</small>) : null}
                </InputGroup>

                <InputGroup size="" className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><FontAwesomeIcon icon={faCalendarAlt} /></InputGroupText>
                    </InputGroupAddon>
                    <DatePicker selected={driverDate} onChange={changeDate} className="form-control" />
                    {/* <Field name="due_date" id="due_date" placeholder="Due Date" className="form-control" /> */}
                    {touched.due_date && errors.due_date ? (<small style={{width: "100%"}} className="form-text text-danger">{errors.due_date}</small>) : null}
                </InputGroup>

                <Field type="hidden" name="user_id" id="user_id" />

                <div>
                    {showMeTheButtons(isLoggedIn)}
                </div>
                <OptionContainer>
                        <Link to="/NewDriver">Driver? Sign Up</Link>
                        <Link to="/Login">Already have an accout? Login</Link>
                </OptionContainer>
            </Form>
        </>
    )
}

const MomProfileForm = withFormik({
    mapPropsToValues: values => {
        return {
            user_id: values.user_id || "",
            user_name: values.user_name || "",
            user_email: values.user_email || "",
            user_phone_number: values.user_phone_number || "",
            user_plot: values.user_plot || "",
            password: values.password || "",
            password2: values.password2 || "",
            due_date: values.due_date || ""
        }
    },
    validationSchema: Yup.object().shape({
        user_name: Yup.string().required('Please, tell us your name.'),
        user_email: Yup.string().required('You\'ll use your email address as your login.').email('Check you email address'),
        user_phone_number: Yup.string().required('Please enter a valid phone number'),
        user_plot: Yup.number(),
        password: Yup.string().required(),
        password2: Yup.string().required().test('passwords-match', 'Passwords must match ya fool', function(value) {
            return this.parent.password === value;
        })
    }),
    handleSubmit(values, {resetForm, setStatus}) {
        setStatus(values);
        resetForm();
    }
})(ProfileForm)

export default MomProfileForm;