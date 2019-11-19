import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup'
import styled from 'styled-components';

import {Col, FormGroup, Label, Button, InputGroup, InputGroupAddon, InputGroupText, Input} from 'reactstrap'

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
                <h3>Sign Up with Ride for Life</h3>
                <InputGroup size="" className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>N</InputGroupText>
                    </InputGroupAddon>
                    <Input name="user_name" id="user_name" placeholder="Name" />
                    {touched.user_name && errors.user_name ? (<small>{errors.user_name}</small>) : null}
                </InputGroup>

                <InputGroup size="" className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>P</InputGroupText>
                    </InputGroupAddon>
                    <Input name="user_phone_number" id="user_phone_number" placeholder="Phone Number" onChange="" />
                    {touched.user_phone_number && errors.user_phone_number ? (<small>{errors.user_phone_number}</small>) : null}
                </InputGroup>
                
                <InputGroup size="" className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>E</InputGroupText>
                    </InputGroupAddon>
                    <Input name="email" placeholder="Email Address" />
                    {touched.user_email && errors.user_email ? (<small className="form-text text-danger">{errors.user_email}</small>) : null}
                </InputGroup>

                {/* <FormGroup row>
                    <Label htmlFor="user_email" sm={3}>Email</Label>
                    <Col sm={9}>
                        <Field type="text" name="user_email" id="user_email" className="form-control" />
                        {touched.user_email && errors.user_email ? (<small className="form-text text-danger">{errors.user_email}</small>) : null}
                    </Col>
                </FormGroup> */}

                {/* <InputGroup size="" className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>A</InputGroupText>
                    </InputGroupAddon>
                    <Input name="user_address" id="user_address" placeholder="Address" />
                    {touched.user_address && errors.user_address ? (<small>{errors.user_address}</small>) : null}
                </InputGroup> */}

                <InputGroup size="" className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>PL</InputGroupText>
                    </InputGroupAddon>
                    <Input name="user_plot" id="user_plot" placeholder="Plot" />
                    {touched.user_plot && errors.user_plot ? (<small>{errors.user_plot}</small>) : null}
                </InputGroup>

                <InputGroup size="" className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>P</InputGroupText>
                    </InputGroupAddon>
                    <Input name="password" id="user_password" placeholder="Password" />
                    {touched.password && errors.password ? (<small>{errors.password}</small>) : null}
                </InputGroup>

                <InputGroup size="" className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>P</InputGroupText>
                    </InputGroupAddon>
                    <Input name="password2" id="user_password2" placeholder="Confirm Password" />
                    {touched.password2 && errors.password2 ? (<small>{errors.password2}</small>) : null}
                </InputGroup>

                <InputGroup size="" className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>D</InputGroupText>
                    </InputGroupAddon>
                    <Input name="due_date" id="due_date" placeholder="Due Date" />
                    {touched.due_date && errors.due_date ? (<small>{errors.due_date}</small>) : null}
                </InputGroup>

                {/* <FormGroup row>
                    <Label htmlFor="user_plot" sm={3}>Address</Label>
                    <Col sm={9}>
                        <Field type="text" name="user_plot" id="user_plot" className="form-control" />
                        {touched.user_plot && errors.user_plot ? (<small className="form-text text-danger">{errors.user_plot}</small>) : null}
                    </Col>
                </FormGroup> */}

                {/* <FormGroup row>
                    <Label htmlFor="user_password" sm={3}>Password</Label>
                    <Col sm={9}>
                        <Field type="password" name="password" id="user_password" className="form-control" />
                        {touched.password && errors.password ? (<small className="form-text text-danger">{errors.password}</small>) : null}
                    </Col>
                </FormGroup> */}

                {/* <FormGroup row>
                    <Label htmlFor="user_password2" sm={3}>Password</Label>
                    <Col sm={9}>
                        <Field type="password" name="password2" id="user_password2" className="form-control" />
                        {touched.password2 && errors.password2 ? (<small className="form-text text-danger">{errors.password2}</small>) : null}
                    </Col>
                </FormGroup> */}

                {/* <FormGroup row>
                    <Label htmlFor="due_date" sm={3}>Due Date</Label>
                    <Col sm={9}>
                        <Field type="text" name="due_date" id="due_date" className="form-control" />
                        {touched.due_date && errors.due_date ? (<small className="form-text text-danger">{errors.due_date}</small>) : null}
                    </Col>
                </FormGroup> */}
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