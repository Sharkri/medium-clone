import { useContext, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Post from "../../../interfaces/PostInterface";

import UserContext from "../../../UserContext";
import Posts from "../../helper-components/Posts";
import ScrollerItems from "../../helper-components/ScrollerItems";
import Topic from "../../helper-components/Topic";
import Sidebar from "../../main/Sidebar";
import FollowingPosts from "./FollowingPosts";

export default function Homepage() {
  const [search] = useSearchParams();
  const { user } = useContext(UserContext);

  // null feed means for you page
  const feed = search.get("feed");
  const [posts, setPosts] = useState<Post[]>([]);

  const RECOMMENDED_TOPICS = [
    "Programming",
    "Data Science",
    "Technology",
    "Writing",
  ];

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
            <Posts
              posts={posts}
              onPostChange={(newPosts: Post[]) =>
                setPosts(posts.concat(newPosts))
              }
            />
          )}
        </main>
        <Sidebar>
          <div className="mt-10">
            <h2 className="font-sohne-semibold mb-4">Recommended topics</h2>

            <div className="flex flex-wrap">
              {RECOMMENDED_TOPICS.map((topic) => (
                <Topic
                  topicName={topic}
                  className="py-2 px-4 mr-2 mb-[10px] text-sm"
                />
              ))}
            </div>
          </div>
        </Sidebar>
      </div>
    </div>
  );
}
