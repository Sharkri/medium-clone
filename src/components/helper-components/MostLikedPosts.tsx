import { useState } from "react";
import Post from "../../interfaces/PostInterface";
import Posts from "./Posts";

export default function MostLikedPosts() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  const mostLikedPosts = posts
    ? posts.sort((a, b) => b.likeCount - a.likeCount)
    : null;

  return (
    <Posts
      posts={mostLikedPosts}
      onPostChange={(newPosts: Post[]) =>
        setPosts((posts || []).concat(newPosts))
      }
    />
  );
}
