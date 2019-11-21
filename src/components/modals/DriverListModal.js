import React, {useState} from 'react';
import {Table, Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

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
    const {buttonLabel, className, buttonColor} = props;
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

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
                                FakeDrivers.map(driver => {
                                    return (
                                        <tr key={driver.id}>
                                            <td>rating</td>
                                            <td>{driver.drivers_name}</td>
                                            <td>{driver.drivers_plot}</td>
                                            <td>{driver.drivers_price}</td>
                                            <td>
                                                <Button color="primary" ><FontAwesomeIcon icon={faCheckSquare} /></Button>
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