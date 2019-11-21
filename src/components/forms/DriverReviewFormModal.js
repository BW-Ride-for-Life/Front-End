import React, {useState, useEffect} from 'react';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import {withFormik, Field} from 'formik';
import {Form, Datepicker} from 'react-formik-ui';
import * as Yup from 'yup'
import {Container, Row, Col, FormGroup, InputGroup, InputGroupAddon, InputGroupText, ButtonGroup, Button} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';

const ReviewForm = (props) => {
    const {values, errors, touched, status, setFieldValue, updateReview} = props;
    const [driverDate, setDriverDate] = useState(new Date());
    const [driverRating, setDriverRating] = useState(values.driverRating);
    const [formData, setFormData] = useState([]);

    useEffect(() => {
        status && setFormData(status)
        updateReview(status)
    }, [status])

    function changeDate(today) {
        setDriverDate(today)
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

                <Button color="primary" type="submit">Submit</Button>

                <Field type="hidden" name="driverRating" id="driverRating" />
                <Field type="hidden" name="driverId" id="driverId" />
                <Field type="hidden" name="userId" id="userId" />
                <Field type="hidden" name="reviewId" id="reviewId" />
            </Form>
        </>
    )
}

const DriverReviewForm = withFormik({
    mapPropsToValues: ({reviewData}) => {
        return {
            reviewId: reviewData.id || "",
            driverDate: reviewData.review_date || "",
            driverRating: reviewData.rating || 3,
            driverReview: reviewData.review_text || "",
            userId: reviewData.user_id || "",
            driverId: reviewData.driver_id || ""
        }
    },
    validationSchema: Yup.object().shape({
        driverDate: Yup.date().required('Don\'t forget a date!')
    }),
    handleSubmit(values, {resetForm, setStatus}) {
        resetForm();
        setStatus(values);
    }
})(ReviewForm)

export default DriverReviewForm;