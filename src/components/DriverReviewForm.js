import React, {useState} from 'react';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup'

import {Col, FormGroup, Label} from 'reactstrap'

const isLoggedIn = false;

const ReviewForm = ({values, errors, touched, status}) => {
    const [driverDate, setDriverDate] = useState(new Date());

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
                <FormGroup row>
                    <Label htmlFor="driverDate" sm={3}>Date</Label>
                    <Col sm={9}>
                        {/* <Field type="text" name="driverDate" id="driverDate" className="form-control" /> */}
                        <DatePicker selected={driverDate} onChange={changeDate} />
                        {touched.driverDate && errors.driverDate ? (<small className="form-text text-danger">{errors.driverDate}</small>) : null}
                    </Col>
                </FormGroup>
                
                <FormGroup row>
                    <Label htmlFor="driverRating" sm={3}>Rating</Label>
                    <Col sm={9}>
                        <Rater total={5} rating={0} />
                        {/* <Field type="text" name="driverRating" id="driverRating" className="form-control" />
                        {touched.driverRating && errors.driverRating ? (<small className="form-text text-danger">{errors.driverRating}</small>) : null} */}
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label htmlFor="driverReview" sm={3}>Review</Label>
                    <Col sm={9}>
                        <Field type="text" name="driverReview" id="driverReview" className="form-control" />
                        {touched.driverReview && errors.driverReview ? (<small className="form-text text-danger">{errors.driverReview}</small>) : null}
                    </Col>
                </FormGroup>

                {isLoggedIn && (<button type="submit" className="btn btn-primary">Submit</button>)}
                {(!isLoggedIn && (
                    <>
                        <button type="submit" className="btn btn-primary">Delete</button>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </>
                ))}

                <Field type="hidden" name="driverDate" id="driverDate" />
                <Field type="hidden" name="driverRating" id="driverRating" />
                <Field type="hidden" name="driverId" id="driverId" />
                <Field type="hidden" name="userId" id="userId" />
            </Form>
        </>
    )
}

const DriverReviewForm = withFormik({
    mapPropsToValues: values => {
        return {
            driverDate: values.driverDate || "",
            driverRating: values.driverRating || "",
            driverReview: values.driverReview || ""
        }
    },
    validationSchema: Yup.object().shape({

    }),
    handleSubmit(values, {resetForm, setStatus}) {
        console.log(values)
        setStatus(values)
        resetForm();
    }
})(ReviewForm)

export default DriverReviewForm;