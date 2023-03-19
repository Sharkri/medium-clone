import { useEffect, useState } from "react";
import { getAllPosts } from "../../../firebase/firebase-app";
import Post from "../../../interfaces/PostInterface";
import Sidebar from "../../main/Sidebar";
import HomeFeedPosts from "./HomeFeedPosts";

function HomeFeed() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    getAllPosts().then((psts) => setPosts(psts as Post[]));
  });

  if (!posts) return null;

  return (
    <div className="max-w-[1192px] m-auto">
      <div className="flex gap-12 pt-12 mx-12">
        <section className="grow">
          <HomeFeedPosts posts={posts} />
        </section>
        <Sidebar>hello</Sidebar>
      </div>
    </div>
  );
}

export default HomeFeed;
