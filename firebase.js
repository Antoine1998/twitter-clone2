// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQBd0U-ItHwhLOwkfkfA5zPIP6tzNn9DM",
  authDomain: "twitter-clone-13adb.firebaseapp.com",
  projectId: "twitter-clone-13adb",
  storageBucket: "twitter-clone-13adb.appspot.com",
  messagingSenderId: "919076841860",
  appId: "1:919076841860:web:19ace1d8d2a81e4a5f55d1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
