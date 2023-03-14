import { useEffect, useState } from "react";

import { getAllPosts } from "../../../firebase/firebase-app";

import Post from "../../../interfaces/PostInterface";
import PostPreview from "../../helper-components/PostPreview";
import Sidebar from "../../main/Sidebar";

export default function Homepage() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    getAllPosts().then((fetchedPosts) => {
      setPosts(fetchedPosts as Post[]);
    });
  }, []);

  if (posts == null) return null;

  return (
    <div className="max-w-[1336px] m-auto">
      <div className="flex justify-evenly">
        <main className="pt-[50px] w-full max-w-[728px] flex flex-col gap-6">
          {posts.map((post) => (
            <PostPreview post={post} key={post.id} />
          ))}
        </main>
        <Sidebar>siderbar!~!! !</Sidebar>
      </div>
    </div>
  );
}
