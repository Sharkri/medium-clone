import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { getAllPosts, getAllPostsByUser } from "../../../firebase/firebase-app";

import Post from "../../../interfaces/PostInterface";
import UserContext from "../../../UserContext";
import PostPreview from "../../helper-components/PostPreview";
import ScrollerItems from "../../helper-components/ScrollerItems";
import Spinner from "../../helper-components/Spinner";
import Sidebar from "../../main/Sidebar";

export default function Homepage() {
  const [search] = useSearchParams();
  const { user } = useContext(UserContext);
  const { following } = user || {};
  // feed null means for you page
  const feed = search.get("feed");

  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    if (!following) return;

    // indicate posts are loading
    setPosts(null);

    switch (feed) {
      case null:
        getAllPosts().then((postArr) => setPosts(postArr as Post[]));
        break;

      case "following":
        {
          const followingPosts = Promise.all(following.map(getAllPostsByUser));
          followingPosts.then((p) => setPosts(p.flat() as Post[]));
        }
        break;
    }
  }, [feed, following]);

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

          {posts ? (
            posts.map((post) => <PostPreview post={post} key={post.id} />)
          ) : (
            <div className="mx-auto">
              <Spinner className="w-8 h-8" />
            </div>
          )}
        </main>
        <Sidebar>siderbar!~!! !</Sidebar>
      </div>
    </div>
  );
}
