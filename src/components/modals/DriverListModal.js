import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Table, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup, Button} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEye, faCheckSquare, faSquare, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import DriverReviewModalForm from '../modals/DriverReviewModal'

const FakeDrivers = [
    {
        "id": 4,
        "drivers_name": "Speed Racer",
        "drivers_plot": "126",
        "drivers_phone_number": "455-743-4567",
        "drivers_email": "speedrcr@gmail.com",
        "password": "$2a$11$mxRYg747sGwIGz1/TR4ocuTA7Y1okuzqp/g3sWKlDXZrpqAr/oajG",
        "drivers_price": 50,
        "role": "driver"
    },{
        "id": 3,
        "drivers_name": "Speedy Gonzales",
        "drivers_plot": "55",
        "drivers_phone_number": "455-743-4567",
        "drivers_email": "gonzalesspdy@gmail.com",
        "password": "$2a$11$mxRYg747sGwIGz1/TR4ocuTA7Y1okuzqp/g3sWKlDXZrpqAr/Gjao",
        "drivers_price": 45,
        "role": "driver"
    },{
        "id": 5,
        "drivers_name": "Marty McFly",
        "drivers_plot": "88",
        "drivers_phone_number": "455-743-4567",
        "drivers_email": "88mhp@gmail.com",
        "password": "$2a$11$mxYRg747sGwIGz1/TR4ocuTA7Y1okuzqp/g3sWKlDXZrpqAr/oajG",
        "drivers_price": 50,
        "role": "driver"
    }
]

const ModalDriverList = (props) => {
    const {buttonLabel, className, buttonColor, driversList, selectMyDriver, addNewReview} = props;
    const [driverList, setDriverList] = useState([]);    
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    useEffect(() => {
        setDriverList(driversList)
    },[])

    return(
        <>
            <Button color={buttonColor} onClick={toggle}>{props.buttonLabel} Find a Driver</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Available Drivers</ModalHeader>
                <ModalBody>
                    <Table size="sm" hover>
                        <thead>
                            <tr>
                                <th colSpan="5">
                                    <input type="text" className="form-control" name="search" id="search" placeholder="Search" />
                                </th>
                            </tr>
                            <tr>
                                <th>Rating</th>
                                <th>Name</th>
                                <th>Plot</th>
                                <th>Price</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                driversList.map((driver, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{driver.name}</td>
                                            <td>{driver.height}</td>
                                            <td>{driver.mass}</td>
                                            <td>{driver.hair_color}</td>
                                            <td>
                                                <ButtonGroup size="sm">
                                                    <Link to={`/Driver/${index}`} className="btn btn-info"><FontAwesomeIcon icon={faEye} /></Link>
                                                    <Button color="success" ><FontAwesomeIcon icon={faCheckSquare} onClick={() => (selectMyDriver(index))} /></Button>
                                                    <DriverReviewModalForm 
                                                        buttonLabel={<FontAwesomeIcon icon={faPencilAlt} />} 
                                                        reviewData=""
                                                        newReview={true}
                                                        addNewReview={addNewReview}>
                                                    </DriverReviewModalForm>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Done</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default ModalDriverList;