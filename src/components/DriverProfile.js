import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import DriverReviewModal from './modals/DriverReviewModal';

import {Container, Row, Col, Button, ListGroup, ListGroupItem, Table, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter, TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faUser, faCheckSquare, faSquare, faPencil, faTrash, faPencilAlt, faMapMarkerAlt, faEnvelope, faMobile, faSearch, faExclamationTriangle, faCalendar, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';

import styled from 'styled-components'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DriverPofileForm from './forms/DriverProfileForm'

const ReviewBlock = styled.div`
    color: #fff;
    background-color: #A68B05;
    border: 1px solid gray;
    border-radius: 4px;
    font-size: .9rem;
    width: 30%;
    padding: .5rem;
`

const fakeUser = {
    "id": 4,
    "drivers_name": "Example Driver",
    "drivers_plot": "126",
    "drivers_phone_number": "455-743-4567",
    "drivers_email": "exampledriver@gmail.com",
    "password": "$2a$11$mxRYg747sGwIGz1/TR4ocuTA7Y1okuzqp/g3sWKlDXZrpqAr/oajG",
    "drivers_price": 50,
    "role": "driver"
}

const fakeReviews = [
    {
        "id": 0,
        "reviewer": "seeduser1",
        "review_date": "2005-08-10",
        "rating": 0,
        "review_text": "The driver hit a car on the way! Don't use this driver!",
        "user_id": 1,
        "driver_id": 8
    },{
        "id": 1,
        "reviewer": "seeduser1",
        "review_date": "2007-08-11",
        "rating": 2,
        "review_text": "We stopped for a warm cup of joe one the way.",
        "user_id": 1,
        "driver_id": 7
    },{
        "id": 2,
        "reviewer": "seeduser1",
        "review_date": "2009-08-12",
        "rating": 3,
        "review_text": "Took a long time to get to my house but otherwise good",
        "user_id": 1,
        "driver_id": 6
    },{
        "id": 3,
        "reviewer": "seeduser1",
        "review_date": "2011-08-13",
        "rating": 4,
        "review_text": "Ran every stop sign and traffic light once my water broke.",
        "user_id": 1,
        "driver_id": 5
    },{
        "id": 4,
        "reviewer": "seeduser1",
        "review_date": "2013-08-14",
        "rating": 3,
        "review_text": "Took a long time to get to my house but otherwise good",
        "user_id": 1,
        "driver_id": 4
    },{
        "id": 5,
        "reviewer": "seeduser1",
        "review_date": "2015-08-15",
        "rating": 3,
        "review_text": "Quite the run!  Had two other women on the motorcycle with me.",
        "user_id": 1,
        "driver_id": 1
    },{
        "id": 6,
        "reviewer": "seeduser1",
        "review_date": "2017-08-16",
        "rating": 3,
        "review_text": "Took a long time to get to my house but otherwise good",
        "user_id": 1,
        "driver_id": 2
    },{
        "id": 7,
        "reviewer": "seeduser1",
        "review_date": "2019-08-17",
        "rating": 3,
        "review_text": "Eighth kid, you think I'd be done with this motorcycle thing.",
        "user_id": 1,
        "driver_id": 3
    }
]

toast.configure({
    autoClose: 3000,
    draggable: false,
    hideProgressBar: true,
    pauseOnHover: false
});

const DriverProfile = (props) => {
    const [newDriver, setNewDriver] = useState(props.driver);
    const [driverProfile, setDriverProfile] = useState((props.driver) ? props.driver : fakeUser);
    //const [driverProfile, setDriverProfile] = useState({fakeUser});
    const [reviewList, setReviewList] = useState(fakeReviews);

    useEffect(() => {
        if(props.driver){
            const newDriverProfile = {
                "id": 4,
                "drivers_name": props.driver.name,
                "drivers_plot": props.driver.height,
                "drivers_phone_number": props.driver.mass,
                "drivers_email": props.driver.skin_color,
                "password": "$2a$11$mxRYg747sGwIGz1/TR4ocuTA7Y1okuzqp/g3sWKlDXZrpqAr/oajG",
                "drivers_price": props.driver.mass,
                "role": "driver"
            }
            setDriverProfile(newDriverProfile)
        }
    }, [props])

    console.log(driverProfile)

    function updateDriverProfile(newProfile) {

        axios.post('https://reqres.in/api/users', newProfile)
            .then(res => {
                // setDriverProfile(res.data)
                const updateProfile = {
                    "id": 4,
                    "drivers_name": res.data.drivers_name,
                    "drivers_plot": res.data.drivers_plot,
                    "drivers_phone_number": res.data.drivers_phone_number,
                    "drivers_email": res.data.drivers_email,
                    "password": "$2a$11$mxRYg747sGwIGz1/TR4ocuTA7Y1okuzqp/g3sWKlDXZrpqAr/oajG",
                    "drivers_price": res.data.drivers_price,
                    "role": "driver"
                }
                setDriverProfile(updateProfile)
            })
            .catch(err => console.log(`Error: ${err.response}`));
    }

    function addNewReview(review){
        // Adds a new review for a driver
        const newReview = {
            "id": reviewList.length,
            "reviewer": "seeduser1",
            "review_date": review.driverDate.toISOString().split('T')[0],
            "rating": review.driverRating,
            "review_text": review.driverReview,
            "user_id": 1,
            "driver_id": 3
        }
        setReviewList([newReview, ...reviewList]);
    }

    const [activeTab, setActiveTab] = useState('1');
    const [driverSelectIcon, setDriverSelectIcon] = useState(faSquare);

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    const select = () => {
        
        setDriverSelectIcon((driverSelectIcon === faCheckSquare) ? faSquare : faCheckSquare);
        if(driverSelectIcon === faCheckSquare){
            toast.error('Driver unselected. Looking for a better one?', {
                posittion: toast.POSITION.TOP_RIGHT
            })
        }else{
            toast.success('Selected as your preferred driver', {
                posittion: toast.POSITION.TOP_RIGHT
            })
        }
        
    }

    const notify = () => {
        toast.success('Your driver has been notified!',{
            position: toast.POSITION.TOP_RIGHT
        });
    }

    return (
        <Container className="mt-4 driver-bg-container driverContainer">
            <Row className="">
                <Col xs="12" sm="4">
                    {/* Profile Pic */}
                    {/* <div className="profile-header"> */}
                        <div className="profile mt-5 p-5">
                            <img src="https://images.unsplash.com/photo-1525340520934-bdf4d323f830?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80" alt="" className="rounded mb-2 img-thumbnail" style={{backgroundColor: '#F28907', borderColor: '#F2CB07'}} />
                            {/* <a href="#" className="btn btn-info btn-sm btn-block">Edit profile</a> */}
                        </div>
                    {/* </div> */}

                     {/* User Data Below */}
                     <ListGroup flush className="mt-3">
                        <ListGroupItem className="p-2"><FontAwesomeIcon icon={faEnvelope} className="mr-2" /> {driverProfile.drivers_email}</ListGroupItem>
                        <ListGroupItem className="p-2"><FontAwesomeIcon icon={faMobile} className="mr-2" /> {driverProfile.drivers_phone_number}</ListGroupItem>
                        <ListGroupItem className="p-2"><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" /> Plot {driverProfile.drivers_plot}</ListGroupItem>
                        {driverProfile.drivers_price &&
                            <ListGroupItem className="p-2"><FontAwesomeIcon icon={faMoneyBill} className="mr-2" /> {driverProfile.drivers_price}</ListGroupItem>
                        }
                    </ListGroup>
                </Col>

                <Col xs="12" sm="8">
                    <Row className="d-flex justify-content-between" style={{marginTop: "8.75rem"}}>
                        <div className="text-white mt-5">
                            <h4 className="mt-0 mb-0">{driverProfile.drivers_name}</h4>
                            <p className="small mb-4"><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" /> Plot {driverProfile.drivers_plot}</p>
                        </div>
                        <div className="mt-5">
                            {!props.isLoggedIn &&
                                <ButtonGroup className="mr-5">
                                    <Button color="primary" onClick={select} className="custom-btn"><FontAwesomeIcon icon={driverSelectIcon} /> Select as Driver</Button>
                                    <DriverReviewModal 
                                        buttonLabel={<FontAwesomeIcon icon={faPencilAlt} />} 
                                        reviewData=""
                                        newReview={true}
                                        addNewReview={addNewReview}>
                                    </DriverReviewModal>
                                    {/* <Button color="primary" className=""><FontAwesomeIcon icon={faPencilAlt} /></Button> */}
                                </ButtonGroup>
                            }
                        </div>
                    </Row>
                    
                    <Row className="mt-4">
                        <div className="d-flex justify-content-between" style={{width: '100%'}}>
                            
                        </div>
                    </Row>

                    <Row className="mt-4">
                        <Col>
                            { props.isLoggedIn && 
                                <Nav tabs>
                                    <NavItem><NavLink className={classnames({active: activeTab === '1'})} onClick={() => {toggle('1')}}><FontAwesomeIcon icon={faCommentAlt} style={{color: '#F28907'}} /> Reviews</NavLink></NavItem>
                                    <NavItem><NavLink className={classnames({active: activeTab === '2'})} onClick={() => {toggle('2')}}><FontAwesomeIcon icon={faUser} style={{color: '#F28907'}} /> Profile</NavLink></NavItem>
                                </Nav>
                            }
                            
                            <TabContent activeTab={activeTab}>
                                {/* Review Quote boxes */}    
                                <TabPane tabId="1">
                                    <Row><Col><h4 className="mt-4 mb-4">Reviews</h4></Col></Row>
                                    <Row>
                                        {
                                            reviewList.map(review => {
                                                return (
                                                    <ReviewBlock className="m-2 d-flex flex-column align-items-stretch" key={review.id}>
                                                        <div className="d-flex justify-content-between align-self-stretch">
                                                            <div>
                                                                <Rater total={review.rating} rating={review.rating} interactive={false} style={{fontSize: '22px'}} />
                                                            </div>
                                                            <div>{review.review_date}</div>
                                                        </div>
                                                        <div>{review.review_text}</div>
                                                    </ReviewBlock>
                                                )
                                            })
                                        }
                                    </Row>
                                </TabPane>
                                {/* Profile form */}
                                <TabPane tabId="2">
                                    <Row>
                                        <Col sm={{size: 8, offset: 1}}>
                                            <DriverPofileForm profileData={driverProfile} updateDriverProfile={updateDriverProfile} isLoggedIn={true} />
                                        </Col>
                                    </Row>
                                </TabPane>
                            </TabContent>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col xs="12" md="4">
                   
                </Col>

                <Col xs="12" sm="6" md="8">
                    
                </Col>
                <Row>
                    <Col>
                        
                    </Col>
                </Row>
            </Row>
        </Container>
    )
}

export default DriverProfile;