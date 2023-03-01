import { FieldValue } from "firebase/firestore";

interface Comment {
  likes: number;
  text: string;
  authorUid: string;
  replies?: Comment[];
}

export default interface Post {
  title: string;
  postContent: string;
  thumbnail: string;
  authorUid: string;
  timestamp: FieldValue;
  likes: number;
  comments?: Comment[];
}
