// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_URI,
  authDomain: "raza-estate.firebaseapp.com",
  projectId: "raza-estate",
  storageBucket: "raza-estate.appspot.com",
  messagingSenderId: "91186220669",
  appId: "1:91186220669:web:6c44bc369232faa9102b14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;