import { serverTimestamp } from "firebase/firestore";
import HomeFeedPosts from "./HomeFeedPosts";
import TrendingPosts from "./TrendingPosts";

function HomeFeed() {
  return (
    <div>
      <section>
        <TrendingPosts
          posts={[
            {
              title: "test",
              description: "xd",
              blogContents: "a",
              authorUid: "123",
              timestamp: serverTimestamp(),
              thumbnail: ".aa",
              likes: {},
              id: ".",
              comments: [],
              readingTimeInMinutes: 5,
            },
          ]}
        />
      </section>

      <section>
        <HomeFeedPosts />
      </section>
    </div>
  );
}

export default HomeFeed;
