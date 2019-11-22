import React from 'react';
import { Route } from 'react-router-dom';
import {Container, Row, Col} from 'reactstrap';

import LoginForm from './forms/LoginForm';
import NewMotherForm from './forms/MomProfileForm';
import NewDriverForm from './forms/DriverProfileForm';

// import {AnimatedSwitch} from 'react-router-transition';

import styled from 'styled-components';

const Copyright = styled.div`
    text-align: center;
    font-size: 11px;
`

const FormList = {
    default : LoginForm,
    newMother: NewMotherForm,
    newDriver: NewDriverForm
}

const LoginPage = (props) => {

    const SelectedForm = FormList[props.formToDisplay];
    
    return (
        <Container id="loginContainer" className="mt-5 shadow">
            <Row>
                <Col className="d-none d-sm-block"></Col>
                <Col className="formCol" xs="12" sm="7" md="5" >
                    
                    <SelectedForm isLoggedIn={false} />
                    
                    <Copyright>Copyright &copy; Ride for Life 2019</Copyright>
                </Col>
            </Row>
        </Container>
    )

}

export default LoginPage;