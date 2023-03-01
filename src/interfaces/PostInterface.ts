import User from "./UserInterface";

export default interface Post {
  title: string;
  author: User;
  date: Date;
  id: string | number;
}
