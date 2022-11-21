import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import GoogleIcon from '@mui/icons-material/Google';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import formValidator from '../../Hooks/formValidator';
import { useAuthentication } from "../../Hooks/useAuthentication";
import { useNavigate } from "react-router-dom";

export default function Register() {

    const pageNavigate = useNavigate();

    const defaultValue = { 'email': '', 'password': '', 'fullname': '' };

    const [isBackDropShown, toggleBackDrop] = useState(false);
    const [errorValues, setErrorValues] = useState(defaultValue);
    const [isFormValid, setIsFormValid] = useState(false);
    const [authError, setAuthError] = useState(null);

    const { signUp, SignInWithGoogle } = useAuthentication();

    const handleSignInWithGoogle = async () => {

        toggleBackDrop(true);

        const resp = await SignInWithGoogle();

        toggleBackDrop(false);

        if (resp && resp.error) {
            setAuthError(resp.errorMessage);
        } else {
            setAuthError(null);
            pageNavigate("/home");
        }
    }

    const handleValueChange = (event) => {

        let name = event.target.name;
        let value = event.target.value;

        const { errors, isValid } = formValidator(errorValues, name, value);

        setIsFormValid(isValid);

        setErrorValues(errors);

    }

    const handleSignUp = (event) => {

        event.preventDefault();

        let formValues = {
            ...defaultValue,
            fullname: event.target[0].value,
            email: event.target[2].value,
            password: event.target[4].value
        };

        let errors = { ...errorValues };

        toggleBackDrop(true);

        if (!isFormValid) {

            if (!formValues['fullname']) {

                errors = {
                    ...errors,
                    fullname: errorValues['fullname'] || 'Full Name is required'
                }
            }

            if (!formValues['email']) {

                errors = {
                    ...errors,
                    email: errorValues['email'] || 'Email is required'
                }
            }

            if (!formValues['password']) {

                errors = {
                    ...errors,
                    password: errorValues['password'] || 'Password is required'
                }
            }

            setErrorValues(errors);
        } else {

            toggleBackDrop(true);

            const resp = signUp(formValues.fullname, formValues.email, formValues.password);

            if (resp.error) {

                toggleBackDrop(false);
                setAuthError(resp.errorMessage);
            } else {

                setAuthError(null);
                toggleBackDrop(false);
                pageNavigate("/home");
            }
        }

    }

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isBackDropShown}
                onClick={() => { toggleBackDrop(false) }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {
                authError ? (<Alert severity="error" sx={{ width: '100%' }}>{authError}</Alert>) : ''
            }
            <Box component="form" onSubmit={handleSignUp} noValidate>
                <TextField
                    margin="normal"
                    required
                    size="small"
                    fullWidth
                    id="fullname"
                    label="Full Name"
                    name="fullname"
                    error={errorValues['fullname'] ? true : false}
                    helperText={errorValues['fullname']}
                    onChange={(e) => { handleValueChange(e) }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    error={errorValues['email'] ? true : false}
                    helperText={errorValues['email']}
                    onChange={(e) => { handleValueChange(e) }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    size="small"
                    name="password"
                    label="Password"
                    type="text"
                    id="password"
                    autoComplete="current-password"
                    error={errorValues['password'] ? true : false}
                    helperText={errorValues['password']}
                    onChange={(e) => { handleValueChange(e) }}
                />
                <Grid container spacing={2}>
                    <Grid item>
                        <Button
                            fullWidth
                            variant="contained"
                            size="medium"
                            type="submit"
                            sx={{ mt: 2, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                    </Grid>
                    <Grid item xs>
                        <Button
                            fullWidth
                            variant="outlined"
                            size="medium"
                            sx={{ mt: 2, mb: 2 }}
                            startIcon={<GoogleIcon />}
                            onClick={() => { handleSignInWithGoogle() }}
                        >
                            Sign In with google
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}