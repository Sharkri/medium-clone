// import TrendingPost from "./TrendingPost";
import Post from "../interfaces/PostInterface";

function TrendingPosts({ posts }: { posts: Post[] }) {
  return (
    <div>
      {posts.map((post: Post) => (
        <div>{post.title}</div>
      ))}
    </div>
  );
}

export default TrendingPosts;
