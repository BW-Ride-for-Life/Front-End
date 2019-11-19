import React from 'react';
import { Route } from 'react-router-dom';
import {Container, Row, Col} from 'reactstrap';

import LoginForm from './LoginForm';
import NewMotherForm from './MomProfileForm';
import NewDriverForm from './DriverProfileForm';

import styled from 'styled-components';

const Copyright = styled.div`
    text-align: center;
    font-size: 11px;
`

const LoginPage = () => {

    return (
        <Container id="loginContainer" className="shadow">
            <Row>
                <Col className="d-none d-sm-block"></Col>
                <Col className="formCol" xs="12" sm="7" md="5" >
                    <Route exact path="/Login" component={LoginForm} />
                    
                    <Route path="/NewMother" component={NewMotherForm} />
                    <Route path="/NewDriver" component={NewDriverForm} />

                    <Copyright>Copyright &copy; Ride for Life 2019</Copyright>
                </Col>
            </Row>
        </Container>
    )

}

export default LoginPage;