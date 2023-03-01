import Post from "../interfaces/PostInterface";

function TrendingPost({ post }: { post: Post }) {
  const { title, author } = post;

  return (
    <div>
      <p>{title}</p>
      <p>{author.displayName}</p>
      <img src={author.photoURL} alt="user avatar" />
    </div>
  );
}

export default TrendingPost;
