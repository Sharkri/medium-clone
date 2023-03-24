import firebaseConfig from "./firebase-config";
import { initializeApp } from "firebase/app";
import {
  getAdditionalUserInfo,
  getAuth,
  GoogleAuthProvider,
  signInAnonymously,
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
  deleteDoc,
  arrayUnion,
  arrayRemove,
  getCountFromServer,
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
import UserData from "../interfaces/UserDataInterface";
import Notification from "../interfaces/NotificationInterface";
import PrivateUserData from "../interfaces/PrivateUserData";

const getAuthInstance = getAuth;

const isNewUser = (user: UserCredential) =>
  getAdditionalUserInfo(user)?.isNewUser;

const getCollectionRef = (name: string) => collection(getFirestore(), name);

async function getUsernameDoc(username: string) {
  const document = await getDoc(
    doc(getFirestore(), "usernames", username.toLowerCase())
  );

  return document;
}

const isUsernameTaken = async (username: string) =>
  (await getUsernameDoc(username)).exists();

async function addUser(user: User) {
  if (!user.email || !user.displayName) return;

  const { uid, displayName, photoURL, email } = user;

  try {
    const username = await generateUniqueUsername(email);
    const lowercaseUsername = username.toLowerCase();
    const userData: UserData = {
      uid: uid,
      displayName,
      username,
      // for case-insensitive search purposes
      lowercaseUsername,
      photoURL,
      followers: [],
      following: [],
      creationTime: new Date(),
      bio: "",
    };

    const privateUserData: PrivateUserData = {
      bookmarks: [],
      email,
      notifications: [],
    };

    await setDoc(doc(getFirestore(), "users", uid), userData);
    await setDoc(
      doc(getFirestore(), `users/${uid}/private`, "private-info"),
      privateUserData
    );
    // for checking if username and email is unique.
    await setDoc(doc(getFirestore(), `usernames`, lowercaseUsername), { uid });
    await setDoc(doc(getFirestore(), "emails", email), { uid });
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
async function getDocData(path: string) {
  const document = await getDoc(doc(getFirestore(), path));

  return document?.data();
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

  return docs.docs[0];
}

const getPostRef = (id: string) => getDocRef(`posts/${id}`);
const getUserRef = (uid: string) => getDocRef(`users/${uid}`);

const getPostById = async (id: string) => getDocData(`posts/${id}`);
const getUserById = async (uid: string) => getDocData(`users/${uid}`);

const getUserDocByName = async (name: string) =>
  searchForDoc("users", "username", name);

async function updateUser(uid: string, obj: {}) {
  updateDoc(getUserRef(uid), obj);
}

// private user info. bookmarks, notifications, email
async function updatePrivateUserInfo(uid: string, obj: {}) {
  updateDoc(getUserRef(`${uid}/private/private-info`), obj);
}

async function changeUsername(
  uid: string,
  oldUsername: string,
  newUsername: string
) {
  const lowercaseUsername = newUsername.toLowerCase();
  // delete old username
  await deleteDoc(getDocRef(`usernames/${oldUsername.toLowerCase()}`));
  // set new username
  await setDoc(doc(getFirestore(), "usernames", lowercaseUsername), { uid });

  await updateUser(uid, { username: newUsername, lowercaseUsername });
}

async function changeEmail(oldEmail: string, newEmail: string) {
  const lowercaseEmail = newEmail.toLowerCase();

  const { currentUser } = getAuthInstance();
  if (!currentUser) return;

  await updateEmail(currentUser, newEmail);

  await deleteDoc(getDocRef(`emails/${oldEmail.toLowerCase()}`));
  await setDoc(doc(getFirestore(), "emails", lowercaseEmail), {
    uid: currentUser.uid,
  });

  await updatePrivateUserInfo(currentUser.uid, { email: lowercaseEmail });
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

async function getPostDocs(...options: any[]) {
  const q = query(getCollectionRef("posts"), ...options);

  const { docs } = await getDocs(q);

  return docs;
}

async function getPosts(...options: any[]) {
  const docs = await getPostDocs(...options);

  return docs.map((document) => document.data());
}

async function getPostCount(...options: any) {
  const q = query(getCollectionRef("posts"), ...options);

  const snapshot = await getCountFromServer(q);

  return snapshot.data().count;
}

async function getPostsByUser(uid: string, ...options: any[]) {
  return getPosts(where("authorUid", "==", uid), ...options);
}

async function likePost(postId: string, userUid: string) {
  updateDoc(getPostRef(postId), {
    [`likes.${userUid}`]: increment(1),
    likeCount: increment(1),
  });
}

async function likeComment(commentPath: string, userUid: string) {
  updateDoc(doc(getFirestore(), commentPath), {
    [`likes.${userUid}`]: increment(1),
    likeCount: increment(1),
  });
}

const deleteComment = async (commentPath: string) =>
  deleteDoc(doc(getFirestore(), commentPath));

const editComment = async (commentPath: string, commentText: string) =>
  updateDoc(doc(getFirestore(), commentPath), {
    text: commentText,
    edited: true,
  });

async function followUser(userUid: string, userToFollowUid: string) {
  updateDoc(getDocRef(`users/${userUid}`), {
    following: arrayUnion(userToFollowUid),
  });

  updateDoc(getDocRef(`users/${userToFollowUid}`), {
    followers: arrayUnion(userUid),
  });
}

async function unfollowUser(userUid: string, userToFollowUid: string) {
  updateDoc(getDocRef(`users/${userUid}`), {
    following: arrayRemove(userToFollowUid),
  });

  updateDoc(getDocRef(`users/${userToFollowUid}`), {
    followers: arrayRemove(userUid),
  });
}

async function sendNotificationToUser(uid: string, notification: Notification) {
  const user = await getUserById(uid);

  if (!user) return;

  // limit notifications to 100
  if (user.notifications.length > 99) user.notifications.pop();

  user.notifications.unshift(notification);

  await updatePrivateUserInfo(uid, { notifications: user.notifications });
}

async function sendNotificationToUsers(
  uids: string[],
  notification: Notification
) {
  for (const uid of uids) {
    await sendNotificationToUser(uid, notification);
  }
}

async function continueAnonymously() {
  await signInAnonymously(getAuthInstance());
}

const signOutUser = () => signOut(getAuthInstance());

// Initialize Firebase
initializeApp(firebaseConfig);

export {
  getAuthInstance,
  signInWithGoogle,
  changeUsername,
  signOutUser,
  addUser,
  addPost,
  getImageUrl,
  isUsernameTaken,
  getPostById,
  getUserById,
  getPosts,
  getUserDocByName,
  getPostsByUser,
  getUserRef,
  updateUser,
  addComment,
  getPostRef,
  likePost,
  likeComment,
  changeEmail,
  getCollectionRef,
  deleteComment,
  editComment,
  followUser,
  unfollowUser,
  getPostDocs,
  getPostCount,
  sendNotificationToUsers,
  sendNotificationToUser,
  continueAnonymously,
  updatePrivateUserInfo,
  getUsernameDoc,
};
