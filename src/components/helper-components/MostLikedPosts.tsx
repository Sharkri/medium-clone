import { sub } from "date-fns";
import { orderBy } from "firebase/firestore";
import { useState } from "react";
import Post from "../../interfaces/PostInterface";
import Posts from "./Posts";

export default function MostLikedPosts({
  timeRange,
  options = [],
}: {
  timeRange?: 0 | 365 | 30 | 7;
  options?: any[];
}) {
  const [posts, setPosts] = useState<Post[] | null>(null);

  const minDate = timeRange ? sub(new Date(), { days: timeRange }) : 0;

  return (
    <Posts
      options={[...options, orderBy("likeCount", "desc")]}
      posts={
        posts ? posts.filter((post) => post.timestamp.toDate() > minDate) : null
      }
      onPostChange={(newPosts: Post[]) =>
        setPosts((posts || []).concat(newPosts))
      }
    />
  );
}
