import { useState } from "react";
import Post from "../../../interfaces/PostInterface";
import Posts from "../../helper-components/Posts";

export default function ForYouPosts() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  return (
    <Posts
      posts={posts}
      onPostChange={(newPosts: Post[]) =>
        setPosts((posts || []).concat(newPosts))
      }
    />
  );
}
