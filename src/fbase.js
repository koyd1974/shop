import firebase from 'firebase/compat/app'
import { getAuth } from "firebase/auth"
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SEND_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
  };

firebase.initializeApp(firebaseConfig);
export const firebaseInstance = firebase;
export const authService = getAuth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();


