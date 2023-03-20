import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "../../../firebase/firebase-app";
import Post from "../../../interfaces/PostInterface";
import Spinner from "../../helper-components/Spinner";
import Sidebar from "../../main/Sidebar";
import HomeFeedPosts from "./HomeFeedPosts";

function HomeFeed({ headerTop }: { headerTop: string }) {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const DEFAULT_TOPICS = [
    "Programming",
    "Data Science",
    "Technology",
    "Writing",
  ];

  useEffect(() => {
    getAllPosts().then((psts) => setPosts(psts as Post[]));
  }, []);

  return (
    <div className="max-w-[1192px] mx-auto">
      <div className="flex gap-12 mx-12">
        <section className="grow flex justify-center pt-12">
          {posts ? (
            <HomeFeedPosts posts={posts} />
          ) : (
            <Spinner className="w-10 h-10" />
          )}
        </section>

        <Sidebar headerTop={headerTop}>
          <div className="pt-12">
            <h2 className="font-sohne-semibold text-lg mb-4">
              Discover more of what matters to you
            </h2>

            <div className="text-[15px] text-grey flex flex-wrap">
              {DEFAULT_TOPICS.map((topicName) => (
                <Link
                  to={`/tag/${topicName}`}
                  key={topicName}
                  className="border border-neutral-200 mb-3 mr-3 rounded-sm py-[6px] px-4"
                >
                  {topicName}
                </Link>
              ))}
            </div>
          </div>
        </Sidebar>
      </div>
    </div>
  );
}

export default HomeFeed;
