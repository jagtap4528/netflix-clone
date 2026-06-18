import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3V_OrPPZpkVy4r-XV19QExjsKF4lrdrA",
  authDomain: "netflix-clone-7f9c0.firebaseapp.com",
  projectId: "netflix-clone-7f9c0",
  storageBucket: "netflix-clone-7f9c0.firebasestorage.app",
  messagingSenderId: "778586765693",
  appId: "1:778586765693:web:71537ca512c6acc686f414",
  measurementId: "G-RQ5VX62CW1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);