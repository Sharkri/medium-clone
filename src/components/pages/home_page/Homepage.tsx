import { useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";

import UserContext from "../../../UserContext";
import Posts from "../../helper-components/Posts";
import ScrollerItems from "../../helper-components/ScrollerItems";
import Sidebar from "../../main/Sidebar";
import FollowingPosts from "./FollowingPosts";

export default function Homepage() {
  const [search] = useSearchParams();
  const { user } = useContext(UserContext);

  // null feed means for you page
  const feed = search.get("feed");

  return (
    <div className="max-w-[1336px] m-auto">
      <div className="flex justify-evenly">
        <main className="w-full max-w-[680px] flex flex-col mx-6">
          <ScrollerItems className="pt-10 mb-8">
            <Link to="/" className={!feed ? "highlight" : undefined}>
              For you
            </Link>
            <Link
              to="?feed=following"
              className={feed === "following" ? "highlight" : undefined}
            >
              Following
            </Link>
          </ScrollerItems>

          {feed === "following" ? (
            <FollowingPosts following={user?.following} />
          ) : (
            <Posts />
          )}
        </main>
        <Sidebar>siderbar!~!! !</Sidebar>
      </div>
    </div>
  );
}
