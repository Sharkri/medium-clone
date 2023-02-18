import TrendingPost from "./TrendingPost";
import Post from "./interfaces/PostInterface";

function TrendingPosts({ posts }: { posts: Post[] }) {
  return (
    <div>
      {posts.map((post: Post) => (
        <TrendingPost post={post} key={post.id} />
      ))}
    </div>
  );
}

export default TrendingPosts;
