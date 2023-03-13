import firebaseConfig from "./firebase-config";
import { initializeApp } from "firebase/app";
import {
  getAdditionalUserInfo,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateEmail,
  User,
  UserCredential,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  limit,
  getDocs,
  updateDoc,
  increment,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Post from "../interfaces/PostInterface";
import generateUniqueUsername from "../helper-functions/generateUniqueUsername";
import Comment from "../interfaces/CommentInterface";

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

    await setDoc(doc(getFirestore(), "users", user.uid), {
      uid: user.uid,
      displayName: user.displayName,
      username,
      // for case-insensitive search purposes
      lowercaseUsername: username.toLowerCase(),
      photoURL: user.photoURL,
      email: user.email,
      followers: [],
      following: [],
      creationTime: user.metadata.creationTime,
      bio: "",
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

  const newUser = isNewUser(userCredential);

  // if is new user, add user to database
  if (newUser) await addUser(userCredential.user);

  return { user: userCredential.user, newUser };
}

function getDocRef(path: string) {
  return doc(getFirestore(), path);
}

async function searchForDoc(
  collectionToSearch: string,
  field: string,
  equalTo: string
) {
  const docs = await getDocs(
    query(
      getCollectionRef(collectionToSearch),
      where(field, "==", equalTo),
      limit(1)
    )
  );

  if (docs.empty) return null;

  return docs.docs[0].data();
}

async function getDocData(path: string) {
  const document = await getDoc(doc(getFirestore(), path));

  return document?.data();
}

const getPostRef = (id: string) => getDocRef(`posts/${id}`);
const getUserRef = (uid: string) => getDocRef(`users/${uid}`);

const getPostById = async (id: string) => getDocData(`posts/${id}`);
const getUserById = async (uid: string) => getDocData(`users/${uid}`);

const getUserByName = async (name: string) =>
  searchForDoc("users", "username", name);

async function changeUsername(userUid: string, newUsername: string) {
  try {
    await updateDoc(getUserRef(userUid), {
      username: newUsername,
      lowercaseUsername: newUsername.toLowerCase(),
    });
  } catch (error) {
    console.error("Error writing to Firebase Database", error);
  }
}

async function changeEmail(newEmail: string) {
  const { currentUser } = getAuthInstance();
  if (!currentUser) return;

  await updateEmail(currentUser, newEmail);
  await updateDoc(getUserRef(currentUser.uid), { email: newEmail });
}

async function updateUser(
  uid: string,
  newData: {
    photoURL?: string | null;
    displayName?: string;
    bio?: string;
  }
) {
  try {
    await updateDoc(getUserRef(uid), newData);
  } catch (error) {
    console.error("Error writing to Firebase Database", error);
  }
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
    await setDoc(doc(getFirestore(), "posts", post.id), post);
  } catch (error) {
    console.error("Error writing to Firebase Database", error);
  }
}

async function addComment(commentPath: string, comment: Comment) {
  setDoc(doc(getFirestore(), commentPath), comment);
}

// TODO: refactor later to only get 4-12 posts and infinite scrolling
async function getAllPosts() {
  const { docs } = await getDocs(collection(getFirestore(), "posts"));

  return docs.map((document) => document.data());
}

async function likePost(postId: string, userUid: string) {
  updateDoc(getPostRef(postId), { [`likes.${userUid}`]: increment(1) });
}

async function likeComment(postId: string, userUid: string, commentId: string) {
  updateDoc(getDocRef(`posts/${postId}/comments/${commentId}`), {
    [`likes.${userUid}`]: increment(1),
  });
}

async function getAllPostsByUser(uid: string) {
  const { docs } = await getDocs(
    query(getCollectionRef("posts"), where("authorUid", "==", uid))
  );

  return docs.map((document) => document.data());
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
  getImageUrl,
  isUniqueUsername,
  getPostById,
  getUserById,
  getAllPosts,
  getUserByName,
  getAllPostsByUser,
  changeUsername,
  getUserRef,
  updateUser,
  addComment,
  getPostRef,
  likePost,
  likeComment,
  changeEmail,
  getCollectionRef,
};
