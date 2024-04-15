// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJ2YSKBiCXPmXNFfG0z-aQP-pz9nfTZmQ",
  authDomain: "review-4a6c5.firebaseapp.com",
  projectId: "review-4a6c5",
  storageBucket: "review-4a6c5.appspot.com",
  messagingSenderId: "222718526995",
  appId: "1:222718526995:web:846233b29af598c60361e6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const logout = () => {
  signOut(auth)
    .then(console.log("User signed out!"))
    .catch((err) => console.log(err));
};

export { auth, logout };
