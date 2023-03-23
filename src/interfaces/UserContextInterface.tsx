import UserData from "./UserDataInterface";

export default interface IUserContext {
  user: UserData | null;
  loading: Boolean;
  isAnonymous: boolean;
}
