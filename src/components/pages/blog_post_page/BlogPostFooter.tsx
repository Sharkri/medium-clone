import AllUserData from "../../../interfaces/AllUserDataInterface";
import Comment from "../../../interfaces/CommentInterface";
import Post from "../../../interfaces/PostInterface";
import BookmarkButton from "../../helper-components/BookmarkButton";
import OpenCommentSection from "../../helper-components/OpenCommentSection";
import Topic from "../../helper-components/Topic";
import CopyLink from "./CopyLink";
import LikeButton from "./LikeButton";

export default function BlogPostFooter({
  post,
  onPostLike,
  comments,
  user,
  onCommentsOpen,
}: {
  post: Post;
  onPostLike: Function;
  comments: Comment[];
  user: AllUserData | null;
  onCommentsOpen: Function;
}) {
  return (
    <>
      <div className="flex flex-wrap mb-6">
        {post.topics.map((topicName) => (
          <Topic
            key={topicName}
            topicName={topicName}
            className="px-4 py-2 mr-2 mb-2 text-sm"
          />
        ))}
      </div>

      <div className="flex justify-between mb-12 mx-2">
        <div className="flex items-center gap-6">
          <LikeButton
            onLike={onPostLike}
            currentUserLikeCount={user ? post.likes[user.uid] : 0}
            likeCount={post.likeCount}
            disabled={user?.uid === post.authorUid}
          />

          <OpenCommentSection
            commentsLength={comments.length}
            onOpen={onCommentsOpen}
          />
        </div>

        <div className="flex items-center gap-4">
          <CopyLink link={window.location.href} />
          <BookmarkButton postId={post.id} />
        </div>
      </div>
    </>
  );
}
