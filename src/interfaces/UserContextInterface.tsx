import AllUserData from "./AllUserData";

export default interface IUserContext {
  user: AllUserData | null;
  loading: Boolean;
  isAnonymous: boolean;
}
