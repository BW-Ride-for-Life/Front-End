import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup'

import {Col, FormGroup, Label} from 'reactstrap'

const isLoggedIn = false;

const ProfileForm = ({values, errors, touched, status}) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        // api call for user data
        status && setFormData(status)
    }, [status])

    const showMeTheButtons = (isLoggedIn) => {
        if (isLoggedIn) {
            return (
                <>                    
                    <button type="submit" className="btn btn-primary">Update</button>
                    <button type="reset" className="btn btn-danger">Delete</button>
                </>
            )
        }else{
            return (
                <>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </>
            )
        }
    } 

    return (
        <>
            <Form>
                <FormGroup row>
                    <Label htmlFor="user_name" sm={3}>Name</Label>
                    <Col sm={9}>
                        <Field type="text" name="user_name" id="user_name" className="form-control" />
                        {touched.user_name && errors.user_name ? (<small className="form-text text-danger">{errors.user_name}</small>) : null}
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label htmlFor="user_phone_number" sm={3}>Phone</Label>
                    <Col sm={9}>
                        <Field type="text" name="user_phone_number" id="user_phone_number" className="form-control" />
                        {touched.user_phone_number && errors.user_phone_number ? (<small className="form-text text-danger">{errors.user_phone_number}</small>) : null}
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label htmlFor="user_email" sm={3}>Email</Label>
                    <Col sm={9}>
                        <Field type="text" name="user_email" id="user_email" className="form-control" />
                        {touched.user_email && errors.user_email ? (<small className="form-text text-danger">{errors.user_email}</small>) : null}
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label htmlFor="user_plot" sm={3}>Address</Label>
                    <Col sm={9}>
                        <Field type="text" name="user_plot" id="user_plot" className="form-control" />
                        {touched.user_plot && errors.user_plot ? (<small className="form-text text-danger">{errors.user_plot}</small>) : null}
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label htmlFor="user_password" sm={3}>Password</Label>
                    <Col sm={9}>
                        <Field type="password" name="password" id="user_password" className="form-control" />
                        {touched.password && errors.password ? (<small className="form-text text-danger">{errors.password}</small>) : null}
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label htmlFor="user_password2" sm={3}>Password</Label>
                    <Col sm={9}>
                        <Field type="password" name="password2" id="user_password2" className="form-control" />
                        {touched.password2 && errors.password2 ? (<small className="form-text text-danger">{errors.password2}</small>) : null}
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label htmlFor="due_date" sm={3}>Due Date</Label>
                    <Col sm={9}>
                        <Field type="text" name="due_date" id="due_date" className="form-control" />
                        {touched.due_date && errors.due_date ? (<small className="form-text text-danger">{errors.due_date}</small>) : null}
                    </Col>
                </FormGroup>
                <Field type="hidden" name="user_id" id="user_id" />
                <div>
                    {showMeTheButtons(isLoggedIn)}
                </div>
                
            </Form>
            <p>{`Email Address : ${formData.user_email}`}</p>
        </>
    )
}

const MomProfileForm = withFormik({
    mapPropsToValues: values => {
        return {
            user_id: values.user_id || "",
            user_name: values.user_name || "",
            user_email: values.user_email || "",
            user_phone_number: values.user_phone_number || "",
            user_plot: values.user_plot || "",
            password: values.password || "",
            password2: values.password2 || "",
            due_date: values.due_date || ""
        }
    },
    validationSchema: Yup.object().shape({
        user_name: Yup.string().required('Please, tell us your name.'),
        user_email: Yup.string().required('You\'ll use your email address as your login.').email('Check you email address'),
        user_phone_number: Yup.string().required('Please enter a valid phone number'),
        user_plot: Yup.number(),
        password: Yup.string().required(),
        password2: Yup.string().required().test('passwords-match', 'Passwords must match ya fool', function(value) {
            return this.parent.password === value;
          })
    }),
    handleSubmit(values, {resetForm, setStatus}) {
        setStatus(values);
        resetForm();
    }
})(ProfileForm)

export default MomProfileForm;