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
              author: { displayName: "barack obama", photoURL: "" },
              date: new Date(),
              id: "test",
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
