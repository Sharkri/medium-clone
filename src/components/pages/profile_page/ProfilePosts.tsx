import { where } from "firebase/firestore";
import { useState } from "react";
import Post from "../../../interfaces/PostInterface";
import UserData from "../../../interfaces/UserDataInterface";
import Posts from "../../helper-components/Posts";

export default function ProfilePosts({ user }: { user: UserData }) {
  // only posts where author is the user
  const options = [where("authorUid", "==", user.uid)];

  const [posts, setPosts] = useState<Post[]>([]);

  return (
    <div className="px-6 flex flex-col gap-6">
      <Posts
        options={options}
        posts={posts}
        onPostChange={(newPosts: Post[]) => setPosts(posts.concat(newPosts))}
      />
    </div>
  );
}
