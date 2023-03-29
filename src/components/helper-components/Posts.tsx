import {
  endBefore,
  limit,
  QueryDocumentSnapshot,
  startAfter,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { getPostDocs } from "../../firebase/firebase-app";
import Post from "../../interfaces/PostInterface";
import PostPreview from "./PostPreview";
import Spinner from "./Spinner";

export default function Posts({
  options = [],
  posts,
  onPostChange,
}: {
  options?: any[];
  posts: Post[] | null;
  onPostChange: Function;
}) {
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);

  async function fetchNewPosts() {
    // if reached bottom, fetch new posts.
    const docs = await getPostDocs(
      ...options,
      lastDoc ? startAfter(lastDoc) : endBefore(null),
      limit(3)
    );
    // if no more posts
    if (!docs.length) {
      setHasMore(false);
    } else {
      setLastDoc(docs[docs.length - 1]);

      const data = docs.map((doc) => doc.data()) as Post[];

      onPostChange(data);
    }
  }

  useEffect(() => {
    // if there are still more posts to load
    fetchNewPosts();
  }, []);

  if (posts == null && !hasMore) {
    return <p className="text-grey text-center my-4">No stories found..</p>;
  }

  if (posts == null) return null;

  return (
    <InfiniteScroll
      loadMore={fetchNewPosts}
      hasMore={hasMore}
      loader={<Spinner className="w-8 h-8 mx-auto" key={0} />}
    >
      {posts.map((post) => (
        <PostPreview post={post} key={post.id} />
      ))}
    </InfiniteScroll>
  );
}
