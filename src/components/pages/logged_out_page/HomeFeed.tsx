import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "../../../firebase/firebase-app";
import Post from "../../../interfaces/PostInterface";
import Sidebar from "../../main/Sidebar";
import HomeFeedPosts from "./HomeFeedPosts";

function HomeFeed() {
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

  if (!posts) return null;

  return (
    <div className="max-w-[1192px] m-auto">
      <div className="flex gap-12 pt-12 mx-12">
        <section className="grow">
          <HomeFeedPosts posts={posts} />
        </section>
        <Sidebar>
          <div className="flex flex-col gap-4">
            <h2 className="font-sohne-semibold text-lg">
              Discover more of what matters to you
            </h2>

            <div className="text-[15px] text-grey flex flex-wrap">
              {DEFAULT_TOPICS.map((topicName) => (
                <Link
                  to={`/tag/${topicName}`}
                  className="border border-neutral-200 mb-2 mr-2 rounded-sm py-[6px] px-4"
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
