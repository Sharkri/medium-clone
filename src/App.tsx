import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./components/Home";
import { useAuthState } from "react-firebase-hooks/auth";
import UserContext from "./UserContext";
import Error from "./interfaces/ErrorInterface";
import User from "./interfaces/UserInterface";
import { getAuthInstance } from "./firebase/firebase-app";
import LoggedInHomepage from "./components/LoggedInHomepage";
import Header from "./components/Header";
import useModal from "./components/modal/useModal";
import ModalContext from "./components/modal/ModalContext";
import Modal from "./components/modal/Modal";
import LoggedInHeader from "./components/LoggedInHeader";
import CreatePost from "./components/CreatePost";

function App() {
  const authState = useAuthState(getAuthInstance());

  const user = authState[0] as User;
  const loading = authState[1];
  const error = authState[2] as Error | undefined;

  const { modalContent, setModalOpen, isModalOpen } = useModal();

  return (
    <BrowserRouter>
      <ModalContext.Provider
        value={{
          modalContent,
          setModalOpen,
          isModalOpen,
        }}
      >
        <UserContext.Provider value={{ user, loading, error }}>
          <Modal />

          {user ? <LoggedInHeader user={user} /> : <Header />}

          <Routes>
            <Route element={user ? <LoggedInHomepage /> : <Home />} path="/" />

            <Route element={<CreatePost />} path="/new-story" />
          </Routes>
        </UserContext.Provider>
      </ModalContext.Provider>
    </BrowserRouter>
  );
}

export default App;
