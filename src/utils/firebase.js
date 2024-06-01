// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2y0o5cZfW6T3mXORb50cAROhdCzIKIrE",
  authDomain: "netflixgpt-ef7a4.firebaseapp.com",
  projectId: "netflixgpt-ef7a4",
  storageBucket: "netflixgpt-ef7a4.appspot.com",
  messagingSenderId: "155566714922",
  appId: "1:155566714922:web:2077988c26ad988f1e5353",
  measurementId: "G-23EPHLRR3C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
