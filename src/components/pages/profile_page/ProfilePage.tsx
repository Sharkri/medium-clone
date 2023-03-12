import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getAllPostsByUser,
  getUserByName,
} from "../../../firebase/firebase-app";
import Post from "../../../interfaces/PostInterface";
import UserData from "../../../interfaces/UserDataInterface";
import AboutPage from "./AboutPage";
import PostPreview from "../../helper-components/PostPreview";
import Sidebar from "../../main/Sidebar";
import UserInfo from "../../helper-components/UserInfo";

export default function ProfilePage({ page }: { page: "profile" | "about" }) {
  const { username } = useParams();

  const [user, setUser] = useState<UserData | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchInfo() {
      if (!username) return;

      const userData = (await getUserByName(username)) as UserData | null;
      if (!userData) return;

      setUser(userData);

      const allUserPosts = (await getAllPostsByUser(userData.uid)) as Post[];

      setUserPosts(allUserPosts);
    }

    fetchInfo();
  }, [username]);

  if (!user) return null;

  return (
    <div className="max-w-[1336px] m-auto">
      <div className="flex justify-evenly">
        <main className="max-w-[728px] grow">
          <div className="flex flex-col max-w-[680px] mx-6 mt-[52px] mb-12 max-sm:mb-0 max-sm:mt-6">
            <div className="mb-10">
              <span className="line-clamp-1 break-all text-[42px] leading-[52px] font-sohne-semibold">
                {user.displayName}
              </span>
            </div>

            <nav className="flex border-b border-neutral-200 text-sm text-grey">
              <Link
                to={`/u/${username}`}
                className={`pb-4 mr-8 ${
                  page === "profile"
                    ? "border-b border-lighterblack text-lighterblack"
                    : "hover:text-lighterblack"
                }`}
              >
                Home
              </Link>

              <Link
                to={`/u/${username}/about`}
                className={`pb-4 mr-8 ${
                  page === "about"
                    ? "border-b border-lighterblack text-lighterblack"
                    : "hover:text-lighterblack"
                }`}
              >
                About
              </Link>
            </nav>
          </div>
          <div className="grow">
            {page === "about" ? (
              <AboutPage user={user} />
            ) : (
              <div className="p-2 flex flex-col gap-6">
                {userPosts.map((userPost) => (
                  <PostPreview post={userPost} key={userPost.id} omitProfile />
                ))}
              </div>
            )}
          </div>
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
