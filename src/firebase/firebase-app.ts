import firebaseConfig from "./firebase-config";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const getAuthInstance = getAuth;

// Initialize Firebase
try {
  initializeApp(firebaseConfig);
} catch (error) {
  console.error("Error initializing:", error);
}

async function signInWithGoogle() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuthInstance(), provider);
}

export { getAuthInstance, signInWithGoogle };
