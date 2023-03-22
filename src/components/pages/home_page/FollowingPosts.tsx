import { useEffect, useState } from "react";
import { getPostsByUser } from "../../../firebase/firebase-app";
import Post from "../../../interfaces/PostInterface";
import PostPreview from "../../helper-components/PostPreview";
import Spinner from "../../helper-components/Spinner";

// TODO?: don't fetch all at once. i.e. infinite scrolling
export default function FollowingPosts({
  following,
}: {
  following: string[] | undefined;
}) {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    if (!following) return;

    // get all posts by following uids
    const followingPosts = following.map((uid) => getPostsByUser(uid));

    Promise.all(followingPosts).then((p) => setPosts(p.flat() as Post[]));
  }, [following]);

  return posts ? (
    <>
      {posts.length ? (
        posts.map((post) => <PostPreview post={post} key={post.id} />)
      ) : (
        <p className="text-grey text-center">
          No one you follow has posted anything yet.
        </p>
      )}
    </>
  ) : (
    <div className="mx-auto">
      <Spinner className="w-8 h-8" />
    </div>
  );
}
