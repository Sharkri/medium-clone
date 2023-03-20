import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserDocByName } from "../../../firebase/firebase-app";
import AboutPage from "./AboutPage";
import Sidebar from "../../main/Sidebar";
import UserInfo from "../../helper-components/UserInfo";
import FollowPage from "./FollowPage";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { DocumentReference } from "firebase/firestore";
import UserData from "../../../interfaces/UserDataInterface";
import ProfilePosts from "./ProfilePosts";
import ScrollerItems from "../../helper-components/ScrollerItems";

export default function ProfilePage({
  page,
}: {
  page: "profile" | "about" | "followers" | "following";
}) {
  const { username } = useParams();

  const [userRef, setUserRef] = useState<DocumentReference | null>(null);
  const user = useDocumentData(userRef)[0] as UserData;

  // get user ref
  useEffect(() => {
    if (!username) return;
    getUserDocByName(username).then((doc) => setUserRef(doc ? doc.ref : null));
  }, [username]);

  if (!user) return null;

  return (
    <div className="max-w-[1336px] m-auto">
      <div className="flex justify-evenly">
        <main className="max-w-[680px] grow">
          {page === "followers" || page === "following" ? (
            <FollowPage user={user} type={page} />
          ) : (
            <>
              <header className="m-6 sm:my-12">
                <div className="max-lg:hidden line-clamp-1 break-all text-[42px] leading-tight font-sohne-semibold">
                  {user.displayName}
                </div>

                <div className="lg:hidden mx-auto flex flex-col items-center">
                  <UserInfo user={user} />
                </div>

                <ScrollerItems className="mt-10">
                  <Link
                    to={`/u/${username}`}
                    className={page === "profile" ? "highlight" : undefined}
                  >
                    Home
                  </Link>
                  <Link
                    to={`/u/${username}/about`}
                    className={page === "about" ? "highlight" : undefined}
                  >
                    About
                  </Link>
                </ScrollerItems>
              </header>
              {page === "about" ? (
                <AboutPage user={user} />
              ) : (
                <ProfilePosts user={user} />
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
