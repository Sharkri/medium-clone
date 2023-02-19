import Error from "./ErrorInterface";
import User from "./UserInterface";

// will add other stuff to User later

export default interface IUserContext {
  user: User | null | undefined;
  loading: Boolean;
  error?: Error;
}
