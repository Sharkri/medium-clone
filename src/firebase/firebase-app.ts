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
  query,
  where,
  limit,
  getDocs,
  updateDoc,
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

    await addDoc(getCollectionRef("users"), {
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

async function getDoc(
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

  return docs.docs[0];
}

async function getDocData(
  collectionToSearch: string,
  field: string,
  equalTo: string
) {
  const doc = await getDoc(collectionToSearch, field, equalTo);

  return doc ? doc.data() : doc;
}

async function changeUsername(userUid: string, newUsername: string) {
  try {
    const docs = await getDocs(
      query(getCollectionRef("users"), where("uid", "==", userUid), limit(1))
    );

    const reference = docs.docs[0].ref;

    await updateDoc(reference, {
      username: newUsername,
      lowercaseUsername: newUsername.toLowerCase(),
    });
  } catch (error) {
    console.error("Error writing to Firebase Database", error);
  }
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
    const doc = await getDoc("users", "uid", uid);
    if (!doc) throw Error(`User with uid ${uid} does not exist`);

    await updateDoc(doc.ref, newData);
  } catch (error) {
    console.error("Error writing to Firebase Database", error);
  }
}

const getPostById = async (id: string) => getDocData("posts", "id", id);
const getUserById = async (uid: string) => getDocData("users", "uid", uid);
const getUserRefById = async (uid: string) => {
  const x = await getDoc("users", "uid", uid);
  return x?.ref;
};

const getUserByName = async (name: string) =>
  getDocData("users", "username", name);

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

async function addComment(postId: string, comment: Comment) {
  const postDoc = await getDoc("posts", "id", postId);

  if (!postDoc) return;

  const postData = postDoc.data() as Post;

  updateDoc(postDoc.ref, { comments: [...postData.comments, comment] });
}

// refactor later to only get 4-12 posts and infinite scrolling
async function getAllPosts() {
  const { docs } = await getDocs(collection(getFirestore(), "posts"));

  return docs.map((document) => document.data());
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
  getUserRefById,
  updateUser,
  addComment,
};
