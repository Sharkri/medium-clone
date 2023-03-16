import LikeButton from "./LikeButton";

export default function CommentInteractBar({
  onLike,
  onToggleOpenReplies,
  onReply,
  likeCount,
  currentUserLikeCount,
  replyCount,
  isRepliesOpen,
}: {
  onLike: Function;
  onToggleOpenReplies: Function;
  onReply: Function;
  likeCount: number;
  currentUserLikeCount: number;
  replyCount: number;
  isRepliesOpen: boolean;
}) {
  return (
    <div className="mt-[14px] flex justify-between">
      <div className="flex gap-4">
        <LikeButton
          onLike={() => onLike()}
          likeCount={likeCount}
          className="text-sm"
          currentUserLikeCount={currentUserLikeCount}
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
