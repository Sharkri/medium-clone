import { useEffect, useState } from "react";
import { getAllPosts } from "../firebase/firebase-app";
import Post from "../interfaces/PostInterface";
import PostPreview from "./PostPreview";

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
      {posts.map((post) => (
        <PostPreview post={post} />
      ))}
    </div>
  );
}
