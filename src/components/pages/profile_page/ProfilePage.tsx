import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getAllPostsByUser,
  getUserDocByName,
} from "../../../firebase/firebase-app";
import Post from "../../../interfaces/PostInterface";
import AboutPage from "./AboutPage";
import PostPreview from "../../helper-components/PostPreview";
import Sidebar from "../../main/Sidebar";
import UserInfo from "../../helper-components/UserInfo";
import FollowersPage from "./FollowersPage";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { DocumentReference } from "firebase/firestore";
import UserData from "../../../interfaces/UserDataInterface";

export default function ProfilePage({
  page,
}: {
  page: "profile" | "about" | "followers";
}) {
  const { username } = useParams();

  const [userRef, setUserRef] = useState<DocumentReference | null>(null);
  const user = useDocumentData(userRef)[0] as UserData;
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  // get user ref
  useEffect(() => {
    if (!username) return;
    getUserDocByName(username).then((doc) => setUserRef(doc ? doc.ref : null));
  }, [username]);

  // get user posts
  useEffect(() => {
    if (!user) return;

    getAllPostsByUser(user.uid).then((posts) => setUserPosts(posts as Post[]));
  }, [user]);

  const highlight = "border-b border-lighterblack text-lighterblack";

  if (!user) return null;

  return (
    <div className="max-w-[1336px] m-auto">
      <div className="flex justify-evenly">
        <main className="max-w-[680px] grow">
          {page === "followers" ? (
            <FollowersPage user={user} />
          ) : (
            <>
              <div className="m-6 sm:my-12">
                <div className="max-lg:hidden line-clamp-1 break-all text-[42px] leading-tight font-sohne-semibold">
                  {user.displayName}
                </div>
                <div className="lg:hidden mx-auto flex flex-col items-center">
                  <UserInfo user={user} />
                </div>
                <nav className="mt-10 flex border-b border-neutral-200 text-sm text-grey [&>a]:pb-4 [&>a]:mr-8">
                  <Link
                    className={
                      page === "profile" ? highlight : "hover:text-lighterblack"
                    }
                    to={`/u/${username}`}
                  >
                    Home
                  </Link>
                  <Link
                    className={
                      page === "about" ? highlight : "hover:text-lighterblack"
                    }
                    to={`/u/${username}/about`}
                  >
                    About
                  </Link>
                </nav>
              </div>
              {page === "about" ? (
                <AboutPage user={user} />
              ) : (
                <div className="px-6 flex flex-col gap-6">
                  {userPosts.length ? (
                    userPosts.map((userPost) => (
                      <PostPreview
                        post={userPost}
                        key={userPost.id}
                        omitProfile
                      />
                    ))
                  ) : (
                    <p className="text-grey text-center">
                      {user.displayName} hasn't written any stories yet.
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </main>

        <Sidebar>
          <div className="mt-10">
            <UserInfo user={user} />
          </div>
        </Sidebar>
      </div>
    </div>
  );
}
