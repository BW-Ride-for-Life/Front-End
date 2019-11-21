import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Container, Row, Col, Button, ListGroup, ListGroupItem, Table, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt, faMapMarkerAlt, faEnvelope, faMobile, faSearch, faExclamationTriangle, faCalendar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ModalForm from './modals/DriverReviewModal'
import ModalDriverList from './modals/DriverListModal'

const fakeUser = {
    users_name: "Example User", 
    users_plot: "165", 
    users_phone_number: "164-1535-1256", 
    users_email: "exampleuser@gmail.com", 
    password: "password", 
    due_date: "2019-12-15"
};

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

const UserProfile = (props) => {
    const [reviewList, setReviewList] = useState(fakeReviews);
    const [driversList, setDriversList] = useState([])
    const [myDriver, setMyDriver] = useState({});

    useEffect(() => {
        axios.get('https://swapi.co/api/people')
            .then(res => setDriversList(res.data.results))
            .catch(err => console.log(`Error: ${err}`))
    },[])

    const notify = () => {
        toast.success('Your driver has been notified!',{
            position: toast.POSITION.TOP_RIGHT
        });
    }

    function selectMyDriver(driver) {
        let driverName = driversList[driver].name;
        toast.info(`${driverName} has been selected as your preferred driver.`,{
            position: toast.POSITION.TOP_RIGHT
        });
        setMyDriver(driversList[driver]);
    }

    function RemoveReview(index) {
        const newList = reviewList.filter((review, i) => {
            if(index !== i){
                return review
            }
        });
        
        toast.success('You have deleted a review.',{
            position: toast.POSITION.TOP_RIGHT
        });

        setReviewList(newList);
    }

    function updateReviewList(change){
        const updateReview = {
            "id": change.reviewId,
            "reviewer": "seeduser1",
            "review_date": change.driverDate,
            "rating": change.driverRating,
            "review_text": change.driverReview,
            "user_id": change.userId,
            "driver_id": change.driverId
        }
        
        let curPos = reviewList.findIndex(rev => {return rev.id === change.reviewId});
        reviewList.splice(curPos, 1, updateReview);
        setReviewList([...reviewList])
        
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
        setReviewList([...reviewList, newReview]);
    }

    return (
        <Container className="mt-4 bg-container">
            <Row className="">
                <Col xs="12" sm="4">
                    {/* Profile Pic */}
                    {/* <div className="profile-header"> */}
                        <div className="profile mt-5 p-5">
                            <img src="https://images.unsplash.com/photo-1520974735194-9e0ce82759fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="" className="rounded mb-2 img-thumbnail" />
                            {/* <a href="#" className="btn btn-info btn-sm btn-block">Edit profile</a> */}
                        </div>
                    {/* </div> */}

                     {/* User Data Below */}
                     <ListGroup flush className="mt-3">
                        <ListGroupItem className="p-2"><FontAwesomeIcon icon={faEnvelope} className="mr-2" /> {fakeUser.users_email}</ListGroupItem>
                        <ListGroupItem className="p-2"><FontAwesomeIcon icon={faMobile} className="mr-2" /> {fakeUser.users_phone_number}</ListGroupItem>
                        <ListGroupItem className="p-2"><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" /> Plot {fakeUser.users_plot}</ListGroupItem>
                        {fakeUser.due_date &&
                            <ListGroupItem className="p-2"><FontAwesomeIcon icon={faCalendar} className="mr-2" /> {fakeUser.due_date}</ListGroupItem>
                        }
                    </ListGroup>
                </Col>

                <Col xs="12" sm="8">
                    <Row className="d-flex justify-content-between" style={{marginTop: "8.75rem"}}>
                        <div className="text-white mt-5">
                            <h4 className="mt-0 mb-0">{fakeUser.users_name}</h4>
                            <p className="small mb-4"><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" /> Plot {fakeUser.users_plot}</p>
                        </div>
                        <div className="mt-4">
                            <div className="mb-1 text-white">{myDriver.name}</div>
                            <Button color="primary" onClick={notify} className="mr-5 custom-btn"><FontAwesomeIcon icon={faExclamationTriangle} /> Hail Your Driver</Button>
                        </div>
                    </Row>
                    
                    <Row className="mt-4">
                        <div className="d-flex justify-content-between" style={{width: '100%'}}>
                            <ModalDriverList 
                                buttonLabel={<FontAwesomeIcon icon={faSearch} />} 
                                className="modal-lg" 
                                buttonColor="primary" 
                                driversList={driversList} 
                                selectMyDriver={selectMyDriver}
                                addNewReview={addNewReview}>
                            </ModalDriverList>
                        </div>
                    </Row>

                    <Row className="mt-4">
                        <h5>My Reviews</h5>
                        <Table size="sm" hover className="reviewTable">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Rating</th>
                                    <th>Driver</th>
                                    <th>Review</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    reviewList.map((review, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{review.review_date}</td>
                                                <td>{review.rating}</td>
                                                <td>{review.driver_id}</td>
                                                <td>{review.review_text}</td>
                                                <td>
                                                    <ButtonGroup size="sm">
                                                        <ModalForm
                                                            buttonLabel={<FontAwesomeIcon icon={faPencilAlt} />} 
                                                            myReview={reviewList[index]} 
                                                            updateReviewList={updateReviewList}
                                                            newReview={false}>
                                                        </ModalForm>
                                                        <Button color="danger" onClick={() => RemoveReview(index)}><FontAwesomeIcon icon={faTrash} /></Button>
                                                    </ButtonGroup>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
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

export default UserProfile;