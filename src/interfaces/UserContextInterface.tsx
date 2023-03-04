import { FirebaseError } from "firebase/app";
import UserData from "./UserDataInterface";

export default interface IUserContext {
  user: UserData | null;
  loading: Boolean;
  error?: FirebaseError;
}
