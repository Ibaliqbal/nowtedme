// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_APIKEY_FIREBASE}`,
  authDomain: `${import.meta.env.VITE_AUTHDOMAIN_FIREBASE}`,
  projectId: `${import.meta.env.VITE_PROJECTID_FIREBASE}`,
  storageBucket: `${import.meta.env.VITE_STORAGEBUCKET_FIREBASE}`,
  messagingSenderId: `${import.meta.env.VITE_MSG_FIREBASE}`,
  appId: `${import.meta.env.VITE_APPID_FIREBASE}`
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };
