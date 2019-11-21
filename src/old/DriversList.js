import React from 'react'
import {Container, Row, Col, Button, ListGroup, ListGroupItem, Table, ButtonGroup, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt, faMapMarkerAlt, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

const driverData = [
    {
        "id": 4,
        "drivers_name": "Example Driver",
        "drivers_plot": "126",
        "drivers_phone_number": "455-743-4567",
        "drivers_email": "exampledriver@gmail.com",
        "password": "$2a$11$mxRYg747sGwIGz1/TR4ocuTA7Y1okuzqp/g3sWKlDXZrpqAr/oajG",
        "drivers_price": 50,
        "role": "driver"
    }
]

const DriverList = () => {
    return (
        <Container className="mt-4 bg-container">
            <Row className="mb-5">
                <Col className="profile mt-5 text-white" xs="12">
                    <h4 className="mt-0 mb-0">Registered Drivers</h4>
                </Col>
            </Row>
            <Row className="mt-5">
                {
                    driverData.map(driver => {
                        return (
                            <Card>
                                <CardImg />
                                <CardBody>
                                    <CardTitle>{driver.drivers_name}</CardTitle>
                                    <CardSubtitle><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />{driver.drivers_plot}</CardSubtitle>
                                    <CardSubtitle><FontAwesomeIcon icon={faMoneyBill} className="mr-1" />{driver.drivers_price}</CardSubtitle>
                                </CardBody>
                            </Card>
                        )
                    })
                }
            </Row>
        </Container>
    )
}

export default DriverList;