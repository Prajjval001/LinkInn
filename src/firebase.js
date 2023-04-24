import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAy9Yxyjo_DZelidt_GCgLZL7qKLnIcyOM",
  authDomain: "linkedin-clone-f6b91.firebaseapp.com",
  projectId: "linkedin-clone-f6b91",
  storageBucket: "linkedin-clone-f6b91.appspot.com",
  messagingSenderId: "613978714015",
  appId: "1:613978714015:web:2a5db8ab90cc91676397aa",
  measurementId: "G-5KR4D8Z7S4"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebaseApp.firestore();

export { db , auth };