import firebaseConfig from "./firebase-config";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const getAuthInstance = getAuth;

// Initialize Firebase
initializeApp(firebaseConfig);

export { getAuthInstance };
