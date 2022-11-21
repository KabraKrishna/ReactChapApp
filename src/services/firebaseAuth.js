import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    getAuth,
} from 'firebase/auth';
import {
    setDoc,
    doc,
    serverTimestamp,
    getFirestore,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBam2dZw9XIZfcKbZk1B6z4U4ybQ_HeuhI",
    authDomain: "mychat-55ca4.firebaseapp.com",
    projectId: "mychat-55ca4",
    storageBucket: "mychat-55ca4.appspot.com",
    messagingSenderId: "942641481739",
    appId: "1:942641481739:web:8799851e75310a38b9df0e"
}

const firebaseApp = initializeApp(firebaseConfig);
const fireStoreDb = getFirestore(firebaseApp);

export function getFirebaseApp() {
    return firebaseApp;
}

export async function userSignIn(email, password) {

    try {

        const auth = getAuth();

        const response = await signInWithEmailAndPassword(auth, email, password);

        return { 
            error: false,
            uid: response.user.uid,
            name: response.user.displayName,
            email: response.user.email
        };

    } catch (error) {

        return {
            error: true,
            errorCode: error.code,
            errorMessage: error.message
        };
    }

}

export async function userSignUp(fullname, email, password) {

    try {

        const auth = getAuth();

        const response = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(fireStoreDb, 'USERS', response.user.uid), {
            name: fullname,
            email: response.user.email,
            uid: response.user.uid,
            photoURL: response.user.photoURL || '',
            myChats: [],
            timestamp: serverTimestamp(),
        });

        return {
            error: false,
            uid: response.user.uid,
            name: fullname,
            email: response.user.email,
        }

    } catch (error) {

        console.log("error.code: ", error.code);
        console.log("error.message: ", error.message);

        return {
            error: true,
            errorCode: error.code,
            errorMessage: error.message
        };
    }

}

export async function googleSignIn() {

    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        const { user } = await signInWithPopup(auth, provider);

        await setDoc(doc(fireStoreDb, 'USERS', user.uid), {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            myChats: [],
            timestamp: serverTimestamp(),
        });

        return {
            error: false,
            uid: user.uid,
            name: user.displayName,
            email: user.email
        };

    } catch (error) {

        if (error.code !== 'auth/cancelled-popup-request') {
            console.error(error);
        }

        return {
            error: true,
            errorCode: error.code,
            errorMessage: error.message
        };
    }

}