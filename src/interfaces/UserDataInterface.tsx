import Notification from "./NotificationInterface";

export default interface UserData {
  displayName: string;
  photoURL: string | null;
  email: string;
  uid: string;
  username: string;
  lowercaseUsername: string;
  // array of uids
  followers: string[];
  following: string[];
  creationTime: any;
  bio: string;
  notifications: Notification[];
}
