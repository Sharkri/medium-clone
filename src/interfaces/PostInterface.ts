interface Comment {
  likes: number;
  text: string;
  authorUid: string;
  replies?: Comment[];
}

export default interface Post {
  title: string;
  description: string;
  blogContents: string;
  thumbnail: string;
  authorUid: string;
  timestamp: any;
  likes: number;
  comments?: Comment[];
}
