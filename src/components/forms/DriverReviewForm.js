import React, {useState, useEffect} from 'react';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
import {withFormik, Field} from 'formik';
import {Form, Datepicker} from 'react-formik-ui';
import * as Yup from 'yup'
import {Container, Row, Col, FormGroup, InputGroup, InputGroupAddon, InputGroupText, ButtonGroup, Button} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';

const isLoggedIn = false;

const ReviewForm = ({values, errors, touched, status, setFieldValue, updateReview}) => {
    const [driverDate, setDriverDate] = useState(new Date());
    const [driverRating, setDriverRating] = useState(values.driverRating);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        // api call for user data
        updateReview(status)
        status && setFormData(status)
    }, [status])

    function changeDate(today) {
        setDriverDate(today)
    }

    function clickHandleDelete(e, a) {
        e.preventDefault();
        //a == action
        if (a === 'delete'){
            console.log('Delete Driver Review');
        }else if(a === 'logout'){
            console.log('I\m outta here!');
        } 
        
    }

    return (
        <>    
            <Form>
                <FormGroup>
                    <Datepicker id="driverDate" name="driverDate" label="Review Date " className="form-control" dateFormat="MM/dd/yyyy" placeholder="Review Date" />
                </FormGroup>

                <FormGroup>
                    <div>Rating</div>
                    <Rater total={5} rating={driverRating} onRate={({rating}) => {setDriverRating(rating); setFieldValue('driverRating', rating, false);}} />
                </FormGroup>

                <FormGroup>
                    <div>Review</div>
                    <Field component="textarea" className="form-control" name="driverReview" id="driverReview" />
                </FormGroup>

                {!isLoggedIn && (<button type="submit" className="btn btn-primary">Submit</button>)}

                {(isLoggedIn && (
                    <ButtonGroup>
                        <Button type="submit" color="primary">Update</Button>
                        <Button type="button" className="btn btn-danger">Delete</Button>
                    </ButtonGroup>
                ))}

                <Field type="hidden" name="driverRating" id="driverRating" />
                <Field type="hidden" name="driverId" id="driverId" />
                <Field type="hidden" name="userId" id="userId" />
            </Form>
            
            {/* <p>{`Review Date: ${formData.driverDate}`}</p>
            <p>{`Review Rating: ${formData.driverRating}`}</p>
            <p>{`Review Review: ${formData.driverReview}`}</p> */}
        </>
    )
}

const DriverReviewForm = withFormik({
    mapPropsToValues: values => {
        return {
            driverDate: values.driverDate || "",
            driverRating: values.driverRating || 3,
            driverReview: values.driverReview || "",
            userId: values.userId || "",
            driverId: values.driverId || ""
        }
    },
    validationSchema: Yup.object().shape({
        driverDate: Yup.date().required('Don\'t forget a date!')

    }),
    handleSubmit(values, {resetForm, setStatus}) {
        setStatus(values)
        resetForm();
    }
})(ReviewForm)

export default DriverReviewForm;