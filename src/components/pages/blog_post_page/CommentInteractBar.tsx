import Comment from "../../../interfaces/CommentInterface";
import LikeButton from "./LikeButton";

export default function CommentInteractBar({
  onLike,
  onToggleOpenReplies,
  onReply,
  comment,
  currUserUid,
  replyCount,
  isRepliesOpen,
}: {
  onLike: Function;
  onToggleOpenReplies: Function;
  onReply: Function;
  comment: Comment;
  currUserUid: string | null;
  replyCount: number;
  isRepliesOpen: boolean;
}) {
  return (
    <div className="mt-[14px] flex justify-between">
      <div className="flex gap-4">
        <LikeButton
          onLike={() => onLike()}
          likeCount={comment.likeCount}
          className="text-sm"
          currentUserLikeCount={currUserUid ? comment.likes[currUserUid] : 0}
          // author cannot like their own comment
          disabled={currUserUid === comment.authorUid}
        />
        {replyCount ? (
          <button
            className="flex items-center gap-2 text-sm text-lighterblack"
            onClick={() => onToggleOpenReplies()}
          >
            <i className="fa-regular fa-comment text-[1.2rem] rotate-y-180 thinner-icon" />
            {isRepliesOpen ? "Hide replies" : `${replyCount} replies`}
          </button>
        ) : null}
      </div>

      <button onClick={() => onReply()}>Reply</button>
    </div>
  );
}
