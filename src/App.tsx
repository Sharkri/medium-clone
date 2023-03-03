import { Route, Routes, useLocation } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./components/Home";
import { useAuthState } from "react-firebase-hooks/auth";
import UserContext from "./UserContext";
import { getAuthInstance } from "./firebase/firebase-app";
import LoggedInHomepage from "./components/LoggedInHomepage";
import useModal from "./components/modal/useModal";
import ModalContext from "./components/modal/ModalContext";
import Modal from "./components/modal/Modal";
import Header from "./components/Header";
import CreatePost from "./components/CreatePost";
import AuthenticatedRoute from "./AuthenticatedRoute";
import { FirebaseError } from "firebase/app";
import BlogPost from "./components/BlogPost";
import { User } from "firebase/auth";

function App() {
  const authState = useAuthState(getAuthInstance());

  const { pathname } = useLocation();

  const [user, loading, error] = [
    authState[0] as User | null,
    authState[1],
    authState[2] as FirebaseError,
  ];

  const { modalContent, setModalOpen, isModalOpen } = useModal();

  // hide scrollbar when modal open
  document.body.style.overflow = isModalOpen ? "hidden" : "unset";

  if (loading) return null;

  const isLoggedIn = !!user;

  return (
    <ModalContext.Provider
      value={{
        modalContent,
        setModalOpen,
        isModalOpen,
      }}
    >
      <UserContext.Provider value={{ user, loading, error }}>
        <Modal />

        {
          // show header anywhere except "/" path unless logged in
          (pathname !== "/" || isLoggedIn) && <Header user={user} />
        }

        <Routes>
          <Route
            element={isLoggedIn ? <LoggedInHomepage /> : <Home />}
            path="/"
          />

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
  );
}

export default App;
