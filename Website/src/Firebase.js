// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBLrumA6Ex8JdyM6m8JXMJipgm4JIs0BQ",
  authDomain: "alikidideeplink.firebaseapp.com",
  projectId: "alikidideeplink",
  storageBucket: "alikidideeplink.appspot.com",
  messagingSenderId: "194171433527",
  appId: "1:194171433527:web:830281a21b02d6f2eec5b2",
  measurementId: "G-MBY63PW6HH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);