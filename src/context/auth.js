import React, { createContext, useState } from 'react';
import { getUserDetails } from '../services/firbaseChat';
import { googleSignIn, userSignIn, userSignUp } from '../services/firebaseAuth';

const AuthenticationContext = createContext();

const AuthenticationProvider = (props) => {

    const setCurrentUser = async (uid) => {

        const userDetails = await getUserDetails(uid);
        setLoggedInUser(userDetails);
    }

    const [loggedInUser, setLoggedInUser] = useState(null);

    const signIn = async (email, password) => { 
       const response = await userSignIn(email, password); 

       if(response.error) return response;
       setCurrentUser(response.uid);
    }
    const signUp = async (fullname, email, password) => { 
        const response = await userSignUp(fullname, email, password); 

        if(response.error) return response;
        setCurrentUser(response.uid);
    }
    const SignInWithGoogle = async () => { 
        const response = await googleSignIn(); 

        if(response.error) return response;
        setCurrentUser(response.uid);
    }

    const value = { loggedInUser, signIn, signUp, SignInWithGoogle, setLoggedInUser };

    return <AuthenticationContext.Provider value={value} {...props} />
}

export { AuthenticationContext, AuthenticationProvider }
