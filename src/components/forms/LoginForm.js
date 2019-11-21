import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Button, InputGroup, InputGroupAddon, InputGroupText, Input} from 'reactstrap'
import {withFormik, Form, Field} from 'formik'
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const OptionContainer = styled.div`
    width: 100%;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
`

const LoginForm = ({values, errors, touched, status}) => {
  
    const [data, setData] = useState({});
    
    //Saves data into local state
    useEffect(() => {
        status && setData(status);
    }, [status]);

    return (
        <>
            <Form>
                <h3 className="mb-4">Sign In to Ride for Life</h3>
                <InputGroup size="" className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><FontAwesomeIcon icon={faEnvelope} /></InputGroupText>
                    </InputGroupAddon>
                    <Field name="email" placeholder="Email Address" className="form-control" />
                    {touched.email && errors.email ? (<small style={{width: "100%"}} className="form-text text-danger">{errors.email}</small>) : null}
                </InputGroup>

                <InputGroup size="" className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><FontAwesomeIcon icon={faLock} /></InputGroupText>
                    </InputGroupAddon>
                    <Field name="password" placeholder="Password" className="form-control" />
                    {touched.password && errors.password ? (<small style={{width: "100%"}} className="form-text text-danger">{errors.password}</small>) : null}
                </InputGroup>

                <InputGroup size="" className="mb-4">
                    <Input name="userType" type="select">
                        <option value="">Your Role</option>
                        <option value="Mom">Mom</option>
                        <option value="Driver">Driver</option>
                    </Input>
                </InputGroup>

                <Button type="submit" color="primary" block>Login</Button>
                <OptionContainer>
                        <Link to="/NewMother">Are you an expecting Mother? Sign Up</Link>
                        <Link to="/NewDriver">Driver? Sign Up</Link>
                </OptionContainer>
            </Form>
        </>
    )

}

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
  
      console.log(values)
      //I don't need the if statements here, as it seems Formik will not execute handleSubmit until
      //touched is true and there are no errors
      
  
    },
    
    
  })(LoginForm);

export default FormikLogin;