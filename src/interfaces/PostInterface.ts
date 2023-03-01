import { FieldValue } from "firebase/firestore";

export default interface Post {
  title: string;
  postContent: string;
  thumbnail: string;
  authorUid: string;
  timestamp: FieldValue;
}
