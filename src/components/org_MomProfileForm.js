import React from 'react';
import {useFormik, Form, Field} from 'formik'

import { makeStyles, Container, CssBaseline, FormGroup, Input, InputLabel, InputAdornment, FormControl, Grid } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));

const ProfileForm = (props) => {

    const classes = useStyles();
    
    const formik = useFormik({
        initialValues: {
            user_name: "",
            user_email: "",
            user_phone_number: "",
            user_plot: "",
            due_date: "",
            password: ""
        }
    })

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <AccountCircle />
                    </Grid>
                    <Grid item>
                        <Input id="user_email_address" label="Email Address" />
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default ProfileForm;
