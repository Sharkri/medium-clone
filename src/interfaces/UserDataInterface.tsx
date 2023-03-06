// prob add more stuff later
export default interface UserData {
  displayName: string;
  photoURL?: string;
  email: string;
  uid: string;
  username: string;
  lowercaseUsername: string;
  // array of uids
  followers: string[];
  following: string[];
  creationTime: any;
  bio: string;
}
