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
    getDoc,
} from 'firebase/firestore';
import { FIREBASE_CONFIG, USERS_COLLECTION } from "../Constants";

const firebaseApp = initializeApp(FIREBASE_CONFIG);
const fireStoreDb = getFirestore(firebaseApp);

export function getFirebaseApp() {
    return firebaseApp;
}

export async function getUserDetails(uid) {

    const userRef = await getDoc(doc(fireStoreDb, USERS_COLLECTION, uid));
    const user = userRef.data();

    return {
        uid,
        name: user.name,
        email: user.email
    }
}

export async function userSignIn(email, password) {

    try {

        const auth = getAuth();

        const response = await signInWithEmailAndPassword(auth, email, password);


        const userDetails = await getUserDetails(response.user.uid);

        return { 
            error: false,
            userDetails
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


        await setDoc(doc(fireStoreDb, USERS_COLLECTION, response.user.uid), {
            name: fullname,
            email: response.user.email,
            uid: response.user.uid,
            photoURL: response.user.photoURL || '',
            myGroups: [],
            pendingRequests: [],
            timestamp: serverTimestamp(),
        });

        const userDetails = await getUserDetails(response.user.uid);

        return {
            error: false,
            userDetails
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


        await setDoc(doc(fireStoreDb, USERS_COLLECTION, user.uid), {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            myGroups: [],
            pendingRequests: [],
            timestamp: serverTimestamp(),
        });

        const userDetails = await getUserDetails(user.uid);

        return {
            error: false,
            userDetails
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