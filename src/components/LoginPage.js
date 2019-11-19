import React from 'react';
import {Container, Row, Col, Button, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Input} from 'reactstrap'
import {withFormik, Form, Field} from 'formik'
import * as Yup from 'yup';
import styled from 'styled-components';

const OptionContainer = styled.div`
    width: 100%;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
`

const Copyright = styled.div`
    text-align: center;
    font-size: 11px;
`

const LoginForm = ({values, errors, touched, status}) => {

    return (
        <Container id="loginContainer" className="shadow">
            <Row>
                <Col className="d-none d-sm-block"></Col>
                <Col className="formCol" xs="12" sm="5">
                    <Form>
                        <h2>Sign In to Ride for Life</h2>
                        <InputGroup size="" className="mb-4">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><span className="oi oi-envelope-closed"></span></InputGroupText>
                            </InputGroupAddon>
                            <Input name="email" placeholder="Email Address" />
                            {touched.email && errors.email ? (<small className="form-text text-danger">{errors.email}</small>) : null}
                        </InputGroup>

                        <InputGroup size="" className="mb-4">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><span className="oi oi-envelope-closed"></span></InputGroupText>
                            </InputGroupAddon>
                            <Input name="password" placeholder="Password" />
                            {touched.password && errors.password ? (<small className="form-text text-danger">{errors.password}</small>) : null}
                        </InputGroup>

                        <InputGroup size="" className="mb-4">
                            <Input name="userType" type="select">
                                <option value="">Your Role</option>
                                <option value="Mom">Mom</option>
                                <option value="Driver">Driver</option>
                            </Input>
                        </InputGroup>

                        <Button type="submit" color="primary" size="" block>Login</Button>
                        <OptionContainer>
                             <div>Forgot Password</div>
                             <div>Don't have an account? Sign Up</div>
                        </OptionContainer>
                    </Form>
                    <Copyright>Copyright &copy; Ride for Life 2019</Copyright>
                </Col>
            </Row>
        </Container>
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
  
      //I don't need the if statements here, as it seems Formik will not execute handleSubmit until
      //touched is true and there are no errors
      
  
    },
    
    
  })(LoginForm);

export default FormikLogin;