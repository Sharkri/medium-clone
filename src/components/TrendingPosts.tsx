import TrendingPost from "./TrendingPost";

interface Post {
  title: string;
  author: string;
  date: Date;
  id: string | number;
}
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
