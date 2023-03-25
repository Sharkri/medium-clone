import AllUserData from "./AllUserDataInterface";

export default interface IUserContext {
  user: AllUserData | null;
  loading: Boolean;
  isAnonymous: boolean;
}
