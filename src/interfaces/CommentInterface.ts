import Likes from "./LikesInterface";

export default interface Comment {
  likes: Likes;
  likeCount: number;
  text: string;
  authorUid: string;
  replies?: Comment[];
  id: string;
  timestamp: any;
  edited?: boolean;
}
