import React, {useState} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
import DriverReviewForm from '../forms/DriverReviewFormModal';

const ModalForm = (props) => {
    const {buttonLabel, className, myReview, updateReviewList} = props;
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    function updateReview(dets) {
        if(dets){
            // Object.entries(dets).forEach(([k, v]) => {
            //     console.log(`${k} ${v}`);
            // });
            updateReviewList(dets);
        }    
    }

    // fakeReviews[myReview]

    return(
        <>
            <Button color='primary' onClick={toggle}>{props.buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Edit Your Review</ModalHeader>
                <ModalBody>
                    <DriverReviewForm reviewData={myReview} updateReview={updateReview} />
                </ModalBody>
                {/* <ModalFooter>
                    <Button color="primary" onClick={toggle}>Update</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter> */}
            </Modal>
        </>
    );
}

export default ModalForm;