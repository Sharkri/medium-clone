import Post from "../../../interfaces/PostInterface";
import PostPreview from "../../helper-components/PostPreview";

function HomeFeedPosts({ posts }: { posts: Post[] }) {
  return (
    <div className="max-w-[658px]">
      {posts.map((post) => (
        <PostPreview post={post} initialThumbnailSize="w-[200px] h-[134px]" />
      ))}

      <div className="text-center mt-8 text-grey">No more posts to load...</div>
    </div>
  );
}

export default HomeFeedPosts;
