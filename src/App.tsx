import { Route, Routes, useLocation } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import LoggedOutHomepage from "./components/pages/logged_out_page/LoggedOutHomepage";
import { useAuthState } from "react-firebase-hooks/auth";
import UserContext from "./UserContext";
import { getAuthInstance, getUserRef } from "./firebase/firebase-app";
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
import UserData from "./interfaces/UserDataInterface";
import { useDocumentData } from "react-firebase-hooks/firestore";
import PostsWithTopic from "./components/pages/posts_with_topic_page/PostsWithTopic";

function App() {
  const authState = useAuthState(getAuthInstance());
  const [user, loading] = [authState[0] as User, authState[1]];

  const { pathname } = useLocation();

  const userRef = user ? getUserRef(user.uid) : null;
  const userData = useDocumentData(userRef)[0] as UserData;

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
      <UserContext.Provider
        value={{
          user: userData,
          loading,
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
            element={<ProfilePage page="followers" />}
            path="u/:username/followers"
          />

          <Route
            element={
              <AuthenticatedRoute isLoggedIn={isLoggedIn}>
                <Settings />
              </AuthenticatedRoute>
            }
            path="/settings"
          ></Route>

          <Route
            element={<PostsWithTopic sortBy="latest" />}
            path="/tag/:topicName"
          />
          <Route
            element={<PostsWithTopic sortBy="best" />}
            path="/tag/:topicName/best"
          />
        </Routes>
      </UserContext.Provider>
    </ModalContext.Provider>
  );
}

export default App;
