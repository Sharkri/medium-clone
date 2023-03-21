import Post from "../../../interfaces/PostInterface";
import PostPreview from "../../helper-components/PostPreview";

function HomeFeedPosts({ posts }: { posts: Post[] }) {
  return (
    <div className="max-w-[658px]">
      {posts.map((post) => (
        <PostPreview
          post={post}
          initialThumbnailSize="w-[200px] h-[134px]"
          key={post.id}
        />
      ))}

      <div className="text-center mt-6 text-grey">
        You've reached the end...
      </div>
    </div>
  );
}

export default HomeFeedPosts;
