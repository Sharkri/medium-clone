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
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Post from "../interfaces/PostInterface";
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

async function getDocData(path: string) {
  const reference = doc(getFirestore(), path);
  const docInfo = await getDoc(reference);
  return docInfo.data();
}

async function getImageUrl(file: File, filePath: string) {
  try {
    // Upload the image to Cloud Storage.
    const newImageRef = ref(getStorage(), filePath);
    await uploadBytesResumable(newImageRef, file);

    // Generate a public URL for the file.
    return await getDownloadURL(newImageRef);
  } catch (error) {
    console.error("Error uploading image to Firebase Storage", error);
  }
}

async function addPost(post: Post) {
  try {
    return await addDoc(collection(getFirestore(), "posts"), post);
  } catch (error) {
    console.error("Error writing to Firebase Database", error);
  }
}

const signOutUser = () => signOut(getAuthInstance());

export {
  getAuthInstance,
  signInWithGoogle,
  signOutUser,
  addUser,
  isNewUser,
  addPost,
  getDocData,
  getImageUrl,
};
