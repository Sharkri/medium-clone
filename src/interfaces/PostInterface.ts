import Comment from "./CommentInterface";

export default interface Post {
  title: string;
  description: string;
  blogContents: string;
  thumbnail: string;
  authorUid: string;
  timestamp: any;
  likes: number;
  readingTimeInMinutes: number;
  comments?: Comment[];
  id: string;
}
