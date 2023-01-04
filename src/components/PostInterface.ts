export default interface Post {
  title: string;
  author: { name: string; avatar: string };
  date: Date;
  id: string | number;
}
