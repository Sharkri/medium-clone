import { useEffect, useState } from "react";
import { getAllPostsByUser } from "../../../firebase/firebase-app";
import Post from "../../../interfaces/PostInterface";
import UserData from "../../../interfaces/UserDataInterface";
import PostPreview from "../../helper-components/PostPreview";

export default function ProfilePosts({ user }: { user: UserData }) {
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  // get user posts
  useEffect(() => {
    if (!user) return;

    getAllPostsByUser(user.uid).then((posts) => setUserPosts(posts as Post[]));
  }, [user]);

  return (
    <div className="px-6 flex flex-col gap-6">
      {userPosts.length ? (
        userPosts.map((userPost) => (
          <PostPreview post={userPost} key={userPost.id} omitProfile />
        ))
      ) : (
        <p className="text-grey text-center">
          {user.displayName} hasn't written any stories yet.
        </p>
      )}
    </div>
  );
}
