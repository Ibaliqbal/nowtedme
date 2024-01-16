// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVAHiIyVVH4dgXQdX0DcplZUTq_jLFImM",
  authDomain: "nowtedme-7153e.firebaseapp.com",
  projectId: "nowtedme-7153e",
  storageBucket: "nowtedme-7153e.appspot.com",
  messagingSenderId: "1024033906583",
  appId: "1:1024033906583:web:a288f927f7fda7000beed2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
 