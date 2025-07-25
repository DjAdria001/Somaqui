// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoMMmcbrpDhtLuKIdxCxIoB7cIcEB4So8",
  authDomain: "somaqui-23447.firebaseapp.com",
  databaseURL: "https://somaqui-23447-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "somaqui-23447",
  storageBucket: "somaqui-23447.firebasestorage.app",
  messagingSenderId: "364554008068",
  appId: "1:364554008068:web:4616e6e578611605d72751",
  measurementId: "G-4BQ9G568KQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { database };