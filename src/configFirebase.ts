// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAADvB-xIsopA3mfU1lHVYfW1V5UDSlWQk",
  authDomain: "nowted-me.firebaseapp.com",
  projectId: "nowted-me",
  storageBucket: "nowted-me.appspot.com",
  messagingSenderId: "1008780008918",
  appId: "1:1008780008918:web:9ca6bbb9066eb03a8ed877",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };
