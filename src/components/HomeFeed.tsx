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
              likeCount: 0,
              id: ".",
              readingTimeInMinutes: 5,
              topics: [],
              lowercaseTopics: [],
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
