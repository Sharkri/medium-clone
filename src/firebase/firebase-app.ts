import firebaseConfig from "./firebase-config";
import { initializeApp } from "firebase/app";
import {
  getAdditionalUserInfo,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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
  return signInWithPopup(getAuthInstance(), provider);
}

function isNewUser(user: UserCredential) {
  return getAdditionalUserInfo(user)?.isNewUser;
}

async function addUser(user: User) {
  try {
    await addDoc(collection(getFirestore(), `users/${user.uid}/userData`), {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
    });
  } catch (error) {
    console.error("Error writing to Firebase Database", error);
  }
}

const signOutUser = () => signOut(getAuthInstance());

export { getAuthInstance, signInWithGoogle, signOutUser, addUser, isNewUser };
