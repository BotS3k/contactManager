// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDVCe7Y1ObVQcQ90v1HPNZ8THnphDCG-MM",
  authDomain: "my-contacts-37b00.firebaseapp.com",
  projectId: "my-contacts-37b00",
  storageBucket: "my-contacts-37b00.appspot.com",
  messagingSenderId: "69634756585",
  appId: "1:69634756585:web:0a8af3e28859cbc13c0578",
  measurementId: "G-MD1Z6WWRRV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider;
// const analytics = getAnalytics(app);
export {auth, provider};