import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./components/Home";
import { useAuthState } from "react-firebase-hooks/auth";
import UserContext from "./UserContext";
import { getAuthInstance } from "./firebase/firebase-app";
import LoggedInHomepage from "./components/LoggedInHomepage";
import Header from "./components/Header";
import useModal from "./components/modal/useModal";
import ModalContext from "./components/modal/ModalContext";
import Modal from "./components/modal/Modal";
import LoggedInHeader from "./components/LoggedInHeader";
import CreatePost from "./components/CreatePost";
import AuthenticatedRoute from "./AuthenticatedRoute";
import { FirebaseError } from "firebase/app";
import BlogPost from "./components/BlogPost";
import { User } from "firebase/auth";

function App() {
  const authState = useAuthState(getAuthInstance());

  const [user, loading, error] = [
    authState[0] as User | null,
    authState[1],
    authState[2] as FirebaseError,
  ];

  const { modalContent, setModalOpen, isModalOpen } = useModal();

  if (loading) return null;

  const isLoggedIn = !!user;

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

            <Route
              element={
                <AuthenticatedRoute isLoggedIn={isLoggedIn}>
                  <CreatePost />
                </AuthenticatedRoute>
              }
              path="/new-story"
            />

            <Route element={<BlogPost />} path=":username/posts/:title" />
          </Routes>
        </UserContext.Provider>
      </ModalContext.Provider>
    </BrowserRouter>
  );
}

export default App;
