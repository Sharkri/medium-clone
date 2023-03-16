import Comment from "../../../interfaces/CommentInterface";
import Post from "../../../interfaces/PostInterface";
import PostComment from "./PostComment";

export default function PostReplies({
  replies,
  post,
  currentCommentPath,
  currentNestedLvl,
  className = "",
}: {
  replies: Comment[];
  post: Post;
  currentCommentPath: string;
  currentNestedLvl: number;
  className?: string;
}) {
  const replyPath = `${currentCommentPath}/replies`;

  return (
    <div className={className}>
      {replies.map((reply) => (
        <PostComment
          comment={reply as Comment}
          post={post}
          commentPath={`${replyPath}/${reply.id}`}
          nestedLvl={currentNestedLvl + 1}
          key={reply.id}
        />
      ))}
    </div>
  );
}
