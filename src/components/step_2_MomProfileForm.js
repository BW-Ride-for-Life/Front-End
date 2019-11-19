import React, {useState, useEffect} from 'react';
import {useFormik, Form, Field} from 'formik'
import * as Yup from 'yup';

const ProfileForm = ({values, errors, touched, status}) => {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        status && setUserList(userList => [...userList, status]);
    }, [status]);

    const formik = useFormik({
        initialValues: {
            user_name: "",
            user_email: "",
            user_phone_number: "",
            user_plot: "",
            password: "",
            due_date: ""
        },
        onSubmit: (values, {resetForm, setStatus}) => {
            console.log(JSON.stringify(values))
            setStatus(JSON.stringify(values));
            resetForm();
        },
        validationSchema: Yup.object({
            user_name: Yup.string().required('Please, tell us your name.'),
            user_email: Yup.string().email().required('You\'ll user your email address as your login.'),
            //user_phone_number: Yup.string().matches(/^[6-9]\d{9}$/, {message: 'Please enter a valid phone number.', excludeEmptyString: false}),
            user_plot: Yup.number(),
            password: Yup.string().required()
        })

    })

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                
                <label htmlFor="user_name">Name</label><input type="text" name="user_name" id="user_name" onChange={formik.handleChange} value={formik.values.user_name} />
                {formik.touched.user_name && formik.errors.user_name ? (<div>{formik.errors.user_name}</div>) : null}
                <label htmlFor="user_phone_number">Phone</label><input type="text" name="user_phone_number" id="user_phone_number" onChange={formik.handleChange} value={formik.values.user_phone_number} />
                {formik.touched.user_phone_number && formik.errors.user_phone_number ? (<div>{formik.errors.user_phone_number}</div>) : null}
                <label htmlFor="user_email">Email Address</label><input type="text" name="user_email" id="user_email" onChange={formik.handleChange} value={formik.values.user_email} />
                {formik.touched.user_email && formik.errors.user_email ? (<div>{formik.errors.user_email}</div>) : null}
                <label htmlFor="user_plot">Address (Plot Number</label><input type="text" name="user_plot" id="user_plot" onChange={formik.handleChange} value={formik.values.user_plot} />
                {formik.touched.user_plot && formik.errors.user_plot ? (<div>{formik.errors.user_plot}</div>) : null}
                <label htmlFor="user_password">Password</label><input type="password" name="password" id="user_password" onChange={formik.handleChange} value={formik.values.password} />
                {formik.touched.password && formik.errors.password ? (<div>{formik.errors.password}</div>) : null}
                <label htmlFor="due_date">Due Date <sup>*</sup></label><input type="text" name="due_date" id="due_date" onChange={formik.handleChange} value={formik.values.due_date} />
                {formik.touched.due_date && formik.errors.due_date ? (<div>{formik.errors.due_date}</div>) : null}
                <button type="submit">Submit</button>

            </form>
        </>
    )
}

export default ProfileForm;
