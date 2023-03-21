import { useEffect, useState } from "react";
import { getAllPostsByUser } from "../../../firebase/firebase-app";
import Post from "../../../interfaces/PostInterface";
import PostPreview from "../../helper-components/PostPreview";
import Spinner from "../../helper-components/Spinner";

export default function FollowingPosts({
  following,
}: {
  following: string[] | undefined;
}) {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    if (!following) return;

    const followingPosts = Promise.all(following.map(getAllPostsByUser));
    followingPosts.then((p) => setPosts(p.flat() as Post[]));
  }, [following]);

  return posts ? (
    <>
      {posts.map((post) => (
        <PostPreview post={post} key={post.id} />
      ))}
    </>
  ) : (
    <div className="mx-auto">
      <Spinner className="w-8 h-8" />
    </div>
  );
}
