// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzqd0TVpFDK3H5vzPwW_4TbrLYch6x8sE",
  authDomain: "skincare-f2d06.firebaseapp.com",
  projectId: "skincare-f2d06",
  storageBucket: "skincare-f2d06.firebasestorage.app",
  messagingSenderId: "651340502703",
  appId: "1:651340502703:web:50e14134a42918bb65a65a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export {auth, provider};