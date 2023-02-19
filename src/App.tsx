import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./components/Home";
import { useAuthState } from "react-firebase-hooks/auth";
import UserContext from "./UserContext";
import Error from "./interfaces/ErrorInterface";
import User from "./interfaces/UserInterface";
import { getAuthInstance } from "./firebase/firebase-app";

function App() {
  const authState = useAuthState(getAuthInstance());

  const user = authState[0] as User;
  const loading = authState[1];
  const error = authState[2] as Error | undefined;

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, loading, error }}>
        <Routes>
          <Route element={<Home />} path="/" />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
