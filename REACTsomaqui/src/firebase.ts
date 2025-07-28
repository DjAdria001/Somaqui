import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getAuth } from "firebase/auth";  // <-- IMPORTA auth

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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);  // <-- INICIALIZA auth

export { database, auth };  // <-- EXPORTA auth también

