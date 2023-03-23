import { orderBy, where } from "firebase/firestore";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Post from "../../../interfaces/PostInterface";
import Posts from "../../helper-components/Posts";
import ScrollerItems from "../../helper-components/ScrollerItems";

export default function SearchPage() {
  const [search] = useSearchParams();
  const [posts, setPosts] = useState<Post[] | null>(null);

  const query = search.get("q");

  if (!query) return null;

  return (
    <div className="mx-6 mt-12">
      <div className="max-w-[728px] mx-auto">
        <h1 className="font-sohne-semibold text-[42px] break-all mb-10 max-md:text-[22px]">
          <span className="text-grey">Results for </span>
          {query}
        </h1>

        <ScrollerItems className="w-full mb-4">
          <button className="highlight">Stories</button>
        </ScrollerItems>

        <Posts
          posts={posts}
          onPostChange={setPosts}
          options={[
            orderBy("title"),
            where("title", ">=", query),
            where("title", "<=", query + "\uf8ff"),
          ]}
        />
      </div>
    </div>
  );
}
