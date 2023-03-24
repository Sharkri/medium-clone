import { useContext, useEffect, useState } from "react";
import { getPostById } from "../../../firebase/firebase-app";
import Post from "../../../interfaces/PostInterface";
import UserContext from "../../../UserContext";
import PostPreview from "../../helper-components/PostPreview";
import ScrollerItems from "../../helper-components/ScrollerItems";

export default function Library() {
  const { user } = useContext(UserContext);

  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    async function fetchBookmarks() {
      if (!user?.bookmarks) return;
      const bookmarked = await Promise.all(
        user.bookmarks.map((postId) => getPostById(postId))
      );

      setPosts(bookmarked as Post[]);
    }

    fetchBookmarks();
  }, [user?.bookmarks]);

  if (!user || posts == null) return null;

  return (
    <div className="mx-6 mt-12">
      <div className="max-w-[728px] mx-auto">
        <h1 className="font-sohne-semibold text-[42px] break-all mb-10 max-md:text-[22px]">
          Your library
        </h1>

        <ScrollerItems className="w-full mb-2">
          <button className="highlight">Saved posts</button>
        </ScrollerItems>

        {posts.length ? (
          posts.map((post) => <PostPreview post={post} key={post.id} />)
        ) : (
          <p className="text-grey text-center mt-4">
            Posts you bookmark will appear here.
          </p>
        )}
      </div>
    </div>
  );
}
