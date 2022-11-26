import React, { createContext, useState } from 'react';
import { googleSignIn, userSignIn, userSignUp } from '../services/firebaseAuth';

const AuthenticationContext = createContext();

const AuthenticationProvider = (props) => {

    const [loggedInUser, setLoggedInUser] = useState(null);

    const signIn = async (email, password) => { 
       const response = await userSignIn(email, password); 

       if(response.error) return response;
       setLoggedInUser(response.userDetails);
    }
    const signUp = async (fullname, email, password) => { 
        const response = await userSignUp(fullname, email, password); 

        if(response.error) return response;
        setLoggedInUser(response.userDetails);
    }
    const SignInWithGoogle = async () => { 
        const response = await googleSignIn(); 

        if(response.error) return response;
        setLoggedInUser(response.userDetails);
    }

    const value = { loggedInUser, signIn, signUp, SignInWithGoogle, setLoggedInUser };

    return <AuthenticationContext.Provider value={value} {...props} />
}

export { AuthenticationContext, AuthenticationProvider }
