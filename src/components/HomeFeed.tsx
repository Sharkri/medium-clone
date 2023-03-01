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
              postContent: "a",
              authorUid: "123",
              timestamp: serverTimestamp(),
              thumbnail: ".aa",
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
