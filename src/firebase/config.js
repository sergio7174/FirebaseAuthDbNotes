// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  updateProfil, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut 
  } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getFirestore, collection} from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {

 /****** YOUR FIREBASE DATA HERE ********/

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore };

export default app;

export { auth,createUserWithEmailAndPassword, 
  updateProfil, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut };
