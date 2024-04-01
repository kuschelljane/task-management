// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkusnRR30xglpOA37Sv-1sq6thaOO6s_w",
  authDomain: "taskmanagement-7e253.firebaseapp.com",
  databaseURL: "https://taskmanagement-7e253-default-rtdb.asia-southeast1.firebasedatabase.app/", 
  projectId: "taskmanagement-7e253",
  storageBucket: "taskmanagement-7e253.appspot.com",
  messagingSenderId: "530921829803",
  appId: "1:530921829803:web:9087e3bb0419c696178eee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app; 