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
import { useDocumentData } from "react-firebase-hooks/firestore";
import PostsWithTopic from "./components/pages/posts_with_topic_page/PostsWithTopic";
import NotificationPage from "./components/pages/notification_page/NotificationPage";
import Library from "./components/pages/library_page/Library";
import SearchPage from "./components/pages/search_page/SearchPage";
import AllUserData from "./interfaces/AllUserData";
import PageNotFound from "./components/pages/404_page/PageNotFound";

function App() {
  const authState = useAuthState(getAuthInstance());
  const [user, loading] = [authState[0] as User, authState[1]];

  const { pathname } = useLocation();

  // if user is not anonymous or signed out
  const isAuthenticated = user && !user.isAnonymous;

  // userData anyone can see
  const [userData] = useDocumentData(
    isAuthenticated ? getUserRef(user.uid) : null
  );

  // private user data (bookmarks, notifications, email)
  const [privateUserData] = useDocumentData(
    isAuthenticated ? getUserRef(`${user.uid}/private/private-info`) : null
  );

  const allUserData = (
    userData && privateUserData
      ? Object.assign({}, userData, privateUserData)
      : null
  ) as AllUserData | null;

  const { modalContent, setModalOpen, isModalOpen } = useModal();

  // hide scrollbar when modal open
  document.body.style.overflow = isModalOpen ? "hidden" : "auto";

  if (loading) return null;

  // anonymous account also counts as logged in
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
          user: allUserData,
          isAnonymous: !!user?.isAnonymous,
          loading,
        }}
      >
        <Modal />

        {
          // show header anywhere except "/" path unless logged in
          (pathname !== "/" || isLoggedIn) && (
            <Header user={allUserData} isAnonymous={user?.isAnonymous} />
          )
        }

        <Routes>
          <Route element={<PageNotFound />} path="*" />

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

          <Route element={<SearchPage />} path="/search" />

          <Route
            element={
              <AuthenticatedRoute isLoggedIn={isLoggedIn}>
                <NotificationPage />
              </AuthenticatedRoute>
            }
            path="/notifications"
          />

          <Route
            element={
              <AuthenticatedRoute isLoggedIn={isLoggedIn}>
                <Library />
              </AuthenticatedRoute>
            }
            path="/library"
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
            element={<ProfilePage page="following" />}
            path="u/:username/following"
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
