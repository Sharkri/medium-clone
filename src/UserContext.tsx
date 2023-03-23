import { createContext } from "react";
import IUserContext from "./interfaces/UserContextInterface";

const UserContext = createContext<IUserContext>({
  user: null,
  isAnonymous: false,
  loading: false,
});

export default UserContext;
