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
  query,
  where,
  limit,
  getDocs,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Post from "../interfaces/PostInterface";
import generateUniqueUsername from "../helper-functions/generateUniqueUsername";

const getAuthInstance = getAuth;

const isNewUser = (user: UserCredential) =>
  getAdditionalUserInfo(user)?.isNewUser;

const getCollectionRef = (name: string) => collection(getFirestore(), name);

async function isUniqueUsername(username: string) {
  const lowercaseUsername = username.toLowerCase();

  const docs = await getDocs(
    query(
      getCollectionRef("users"),
      where("lowercaseUsername", "==", lowercaseUsername),
      limit(1)
    )
  );

  return docs.empty;
}

async function addUser(user: User) {
  if (!user.email) return;

  try {
    const username = await generateUniqueUsername(user.email);

    await addDoc(getCollectionRef("users"), {
      uid: user.uid,
      displayName: user.displayName,
      username,
      // for case-insensitive search purposes
      lowercaseUsername: username?.toLowerCase(),
      photoURL: user.photoURL,
      email: user.email,
    });
  } catch (error) {
    console.error("Error writing to Firebase Database", error);
  }
}

async function signInWithGoogle() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  const provider = new GoogleAuthProvider();
  const userCredential: UserCredential = await signInWithPopup(
    getAuthInstance(),
    provider
  );
  // if is new user, add user to database
  if (isNewUser(userCredential)) await addUser(userCredential.user);
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
    return await addDoc(getCollectionRef("posts"), post);
  } catch (error) {
    console.error("Error writing to Firebase Database", error);
  }
}

const signOutUser = () => signOut(getAuthInstance());

// Initialize Firebase
initializeApp(firebaseConfig);

export {
  getAuthInstance,
  signInWithGoogle,
  signOutUser,
  addUser,
  addPost,
  getDocData,
  getImageUrl,
  isUniqueUsername,
};
