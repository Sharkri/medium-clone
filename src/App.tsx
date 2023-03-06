import { Route, Routes, useLocation } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import LoggedOutHomepage from "./components/pages/logged_out_page/LoggedOutHomepage";
import { useAuthState } from "react-firebase-hooks/auth";
import UserContext from "./UserContext";
import { getAuthInstance, getUserRefById } from "./firebase/firebase-app";
import Homepage from "./components/pages/home_page/Homepage";
import useModal from "./components/modal/useModal";
import ModalContext from "./components/modal/ModalContext";
import Modal from "./components/modal/Modal";
import Header from "./components/main/Header";
import CreatePost from "./components/pages/create_post_page/CreatePost";
import AuthenticatedRoute from "./AuthenticatedRoute";
import BlogPost from "./components/pages/blog_post_page/BlogPost";
import { User } from "firebase/auth";
import ProfilePage from "./components/pages/profile_page/ProfilePage";
import Settings from "./components/pages/settings_page/Settings";
import { useEffect, useState } from "react";
import UserData from "./interfaces/UserDataInterface";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { DocumentReference } from "firebase/firestore";

function App() {
  const authState = useAuthState(getAuthInstance());

  const { pathname } = useLocation();

  const [user, loading] = [authState[0] as User | null, authState[1]];

  const [userRef, setUserRef] = useState<DocumentReference | null>(null);

  const [value, fetchingUserData] = useDocumentData(userRef);
  const userData = value as UserData;

  const [fetchingUserRef, setFetchingUserRef] = useState(false);

  const reloadUserData = async (uid: string) => {
    setFetchingUserRef(true);

    const fetchedUserRef = (await getUserRefById(uid)) as DocumentReference;
    setUserRef(fetchedUserRef);

    setFetchingUserRef(false);
  };

  useEffect(() => {
    if (!user) {
      setUserRef(null);
      return;
    }

    if (userRef) return;

    reloadUserData(user.uid);
  }, [user]);

  const { modalContent, setModalOpen, isModalOpen } = useModal();

  // hide scrollbar when modal open
  document.body.style.overflow = isModalOpen ? "hidden" : "unset";

  if (loading || fetchingUserData || fetchingUserRef) return null;

  const isLoggedIn = !!user;
  return (
    <ModalContext.Provider
      value={{
        modalContent,
        setModalOpen,
        isModalOpen,
      }}
    >
      <UserContext.Provider
        value={{
          user: userData,
          loading,
          reloadUserData,
        }}
      >
        <Modal />

        {
          // show header anywhere except "/" path unless logged in
          (pathname !== "/" || isLoggedIn) && <Header user={userData} />
        }

        <Routes>
          <Route
            element={isLoggedIn ? <Homepage /> : <LoggedOutHomepage />}
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

          <Route element={<ProfilePage page="profile" />} path="u/:username" />
          <Route
            element={<ProfilePage page="about" />}
            path="u/:username/about"
          />

          <Route
            element={
              <AuthenticatedRoute isLoggedIn={isLoggedIn}>
                <Settings />
              </AuthenticatedRoute>
            }
            path="/settings"
          ></Route>
        </Routes>
      </UserContext.Provider>
    </ModalContext.Provider>
  );
}

export default App;
