import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/firestore';
import {getAuth , GoogleAuthProvider} from "firebase/auth";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRRd7dglBhHD4YWY5p2b_I8O7To6AP-Io",
  authDomain: "linkedin-clone-yt-b17cd.firebaseapp.com",
  projectId: "linkedin-clone-yt-b17cd",
  storageBucket: "linkedin-clone-yt-b17cd.appspot.com",
  messagingSenderId: "788689102717",
  appId: "1:788689102717:web:f528541599e9deaebb8e14",
  measurementId: "G-WR4X4R9M71"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebaseApp.firestore();
const googleProvider = new GoogleAuthProvider();
export { db , auth , googleProvider };