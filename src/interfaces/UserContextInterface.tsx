import { FirebaseError } from "firebase/app";
import { User } from "firebase/auth";

export default interface IUserContext {
  user: User | null;
  loading: Boolean;
  error?: FirebaseError;
}
