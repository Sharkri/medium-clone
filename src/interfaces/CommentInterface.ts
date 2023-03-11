import Likes from "./LikesInterface";

export default interface Comment {
  likes: Likes;
  text: string;
  authorUid: string;
  replies?: Comment[];
  id: string;
  timestamp: any;
}
