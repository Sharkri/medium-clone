import { createContext } from "react";
import IUserContext from "./interfaces/UserContextInterface";

const UserContext = createContext<IUserContext>({
  user: null,
  loading: false,
  error: undefined,
});

export default UserContext;
