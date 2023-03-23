import { limit, orderBy, startAfter } from "firebase/firestore";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
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
  const [lastDoc, setLastDoc] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  function filterDuplicatePosts(array: Post[]) {
    return Array.from(new Map(array.map((v) => [v.id, v])).values());
  }

  async function fetchNewPosts() {
    // if reached bottom, fetch new posts.
    const docs = await getPostDocs(
      ...options,
      orderBy("id"),
      startAfter(lastDoc),
      limit(3)
    );
    // if no more posts
    if (!docs.length) {
      setHasMore(false);
    } else {
      setLastDoc(docs[docs.length - 1].id);

      const data = docs.map((doc) => doc.data()) as Post[];

      onPostChange(filterDuplicatePosts(data));
    }
  }

  useEffect(() => {
    // workaround: https://github.com/ankeetmaini/react-infinite-scroll-component/issues/47
    // if there is no scrollbar
    if (document.body.clientHeight <= window.innerHeight) {
      // if there are still more posts to load
      if (hasMore) fetchNewPosts();
    }
  }, [posts, hasMore]);

  if (posts == null && !hasMore)
    return <p className="text-grey text-center my-4">No stories found..</p>;
  if (posts == null) return null;

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchNewPosts}
      hasMore={hasMore}
      loader={<Spinner className="w-8 h-8 mx-auto" />}
      endMessage={
        <p className="text-center text-grey my-4">You've reached the end</p>
      }
      style={{ overflowY: "hidden" }}
    >
      {posts.map((post) => (
        <PostPreview post={post} key={post.id} />
      ))}
    </InfiniteScroll>
  );
}
