import React, {useState} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
import DriverReviewForm from '../forms/DriverReviewFormModal';

const ModalForm = (props) => {
    const {buttonLabel, className, myReview, updateReviewList, addNewReview, newReview} = props;
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    function updateReview(dets) {
        if(dets){
            updateReviewList(dets);
        }    
    }

    return(
        <>
            <Button color='primary' onClick={toggle}>{props.buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>
                    { newReview && (`Leave a Review`)}
                    { !newReview && (`Edit Your Review`)}
                </ModalHeader>
                <ModalBody>
                    <DriverReviewForm reviewData={myReview} updateReview={updateReview} addNewReview={addNewReview} newReview={newReview}/>
                </ModalBody>
            </Modal>
        </>
    );
}

export default ModalForm;