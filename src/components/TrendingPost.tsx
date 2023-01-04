import Post from "./PostInterface";

function TrendingPost({ post }: { post: Post }) {
  return (
    <div>
      <p>{post.title}</p>
      <p>{post.author.name}</p>
      <img src={post.author.avatar} alt="user avatar" />
    </div>
  );
}

export default TrendingPost;
