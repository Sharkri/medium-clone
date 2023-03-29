import { orderBy } from "firebase/firestore";
import { useState } from "react";
import Post from "../../interfaces/PostInterface";
import Posts from "./Posts";

export default function LatestPosts({ options = [] }: { options?: any[] }) {
  const [posts, setPosts] = useState<Post[] | null>(null);

  return (
    <Posts
      options={[...options, orderBy("timestamp", "desc")]}
      posts={posts}
      onPostChange={(newPosts: Post[]) =>
        setPosts((posts || []).concat(newPosts))
      }
    />
  );
}
