import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
// import Snackbar from '@mui/material/Snackbar';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import './form.css';
import Login from "../components/Formtemplates/login";
import Register from "../components/Formtemplates/register";

export default function Form() {

    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100vh',
                width: '100%',
                margin: 'auto'
            }}
            className="background-class"
        >
            <Box
                sx={{
                    height: '100%',
                    width: '60%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>

                <img src="assets/backgroun-02.png" alt='test' className='backgroun-image' />

            </Box>
            <Box
                sx={{
                    height: '100%',
                    width: '40%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 6
                }}>

                <Avatar sx={{ m: 1, background: '#000' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h3" variant="h5">
                    {isSignUp ? 'Create Account' : 'Sign In'}
                </Typography>
                <Box sx={{ my: 1, mx: 2 }}>

                    {/* <Snackbar open={isToastOpen} autoHideDuration={6000} onClose={setIsToastOpen(false)}>
                        
                    </Snackbar> */}
                    {
                        isSignUp ? (
                            <>
                                <Register />
                                <Typography sx={{ size: '10' }}>
                                    Already have an account ? <Link
                                        href="#" variant="body2" underline="none"
                                        onClick={() => { setIsSignUp(false) }}>
                                        Sign In
                                    </Link>
                                </Typography>
                            </>
                        ) : (
                            <>
                                <Login />
                                <Typography sx={{ size: '10' }}>
                                    Don't have an account ? <Link
                                        href="#" variant="body2" underline="none"
                                        onClick={() => { setIsSignUp(true) }}>
                                        Sign Up
                                    </Link>
                                </Typography>
                            </>
                        )

                    }
                </Box>
            </Box>
        </Box >
    );

}