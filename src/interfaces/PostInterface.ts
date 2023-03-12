import Likes from "./LikesInterface";

export default interface Post {
  title: string;
  description: string;
  blogContents: string;
  thumbnail: string;
  authorUid: string;
  timestamp: any;
  // array-like object
  likes: Likes;
  readingTimeInMinutes: number;
  id: string;
}
