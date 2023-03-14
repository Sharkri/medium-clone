import { useState } from "react";
import getLikeCount from "../../../helper-functions/getLikeCount";
import Comment from "../../../interfaces/CommentInterface";
import Post from "../../../interfaces/PostInterface";
import CommentSection from "./CommentSection";
import LikeButton from "./LikeButton";

export default function InteractionBar({
  post,
  comments,
  onLike,
  onCommentLike,
  currentUserLikeCount,
}: {
  post: Post;
  comments: Comment[];
  onLike: Function;
  onCommentLike: Function;
  currentUserLikeCount: number;
}) {
  const [commentSectionOpen, setCommentSectionOpen] = useState(false);
  const closeCommentSection = () => setCommentSectionOpen(false);

  return (
    <div className="fixed h-[40px] bottom-4 w-full max-w-[680px] flex justify-center z-20">
      <div className="flex items-center h-[40px] shadow-lg pl-4 pr-[14px] rounded-full text-grey bg-white">
        <LikeButton
          likeCount={getLikeCount(post.likes)}
          currentUserLikeCount={currentUserLikeCount}
          onLike={onLike}
        />

        <div className="border border-neutral-200 h-3 mx-4" />

        <button
          className="flex gap-1 items-center"
          onClick={() => setCommentSectionOpen(true)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            aria-label="responses"
            fill="currentColor"
          >
            <path d="M18 16.8a7.14 7.14 0 0 0 2.24-5.32c0-4.12-3.53-7.48-8.05-7.48C7.67 4 4 7.36 4 11.48c0 4.13 3.67 7.48 8.2 7.48a8.9 8.9 0 0 0 2.38-.32c.23.2.48.39.75.56 1.06.69 2.2 1.04 3.4 1.04.22 0 .4-.11.48-.29a.5.5 0 0 0-.04-.52 6.4 6.4 0 0 1-1.16-2.65v.02zm-3.12 1.06l-.06-.22-.32.1a8 8 0 0 1-2.3.33c-4.03 0-7.3-2.96-7.3-6.59S8.17 4.9 12.2 4.9c4 0 7.1 2.96 7.1 6.6 0 1.8-.6 3.47-2.02 4.72l-.2.16v.26l.02.3a6.74 6.74 0 0 0 .88 2.4 5.27 5.27 0 0 1-2.17-.86c-.28-.17-.72-.38-.94-.59l.01-.02z"></path>
          </svg>

          <span className="text-[13px]">{comments.length}</span>
        </button>
      </div>

      <CommentSection
        commentSectionOpen={commentSectionOpen}
        onClose={closeCommentSection}
        post={post}
        comments={comments}
        onCommentLike={onCommentLike}
      />
    </div>
  );
}
