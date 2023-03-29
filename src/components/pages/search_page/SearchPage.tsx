import { orderBy, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Post from "../../../interfaces/PostInterface";
import Posts from "../../helper-components/Posts";
import ScrollerItems from "../../helper-components/ScrollerItems";

export default function SearchPage() {
  const [search] = useSearchParams();
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [seed, setSeed] = useState(0);

  const query = search.get("q");

  useEffect(() => {
    // on query change, reset posts and re-render posts
    if (query) {
      setPosts([]);
      setSeed(Math.random());
    }
  }, [query]);

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
            orderBy("title", "desc"),
            where("title", ">=", query),
            where("title", "<=", query + "\uf8ff"),
          ]}
          key={seed}
        />
      </div>
    </div>
  );
}
