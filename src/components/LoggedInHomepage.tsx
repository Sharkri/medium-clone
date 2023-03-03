import { useEffect, useState } from "react";
import { getAllPosts } from "../firebase/firebase-app";
import Post from "../interfaces/PostInterface";
import PostPreview from "./PostPreview";
import Sidebar from "./Sidebar";

export default function LoggedInHomepage() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    getAllPosts().then((fetchedPosts) => {
      setPosts(fetchedPosts as Post[]);
    });
  }, []);

  if (posts == null) return null;

  return (
    <div className="pt-[50px] flex justify-evenly">
      <main className="max-w-[728px] flex flex-col gap-6">
        {posts.map((post) => (
          <PostPreview post={post} />
        ))}
      </main>
      <Sidebar>siderbar!~!! !</Sidebar>
    </div>
  );
}
