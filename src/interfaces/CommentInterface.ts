export default interface Comment {
  likes: number;
  text: string;
  authorUid: string;
  replies?: Comment[];
  id: string;
}
