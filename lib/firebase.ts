// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbLKEcJPdiIGf1yY4ByMPkMhtTudvj15k",
  authDomain: "electrologics-b3a70.firebaseapp.com",
  projectId: "electrologics-b3a70",
  storageBucket: "electrologics-b3a70.firebasestorage.app",
  messagingSenderId: "241896444371",
  appId: "1:241896444371:web:e3c0f75e28d482a9701f26",
  measurementId: "G-5PZC9949E8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);