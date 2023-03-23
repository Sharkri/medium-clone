import { useRef } from "react";
import { addComment } from "../../../firebase/firebase-app";
import getRandomId from "../../../helper-functions/getRandomId";
import Comment from "../../../interfaces/CommentInterface";
import Post from "../../../interfaces/PostInterface";
import CreateComment from "./CreateComment";
import PostComment from "./PostComment";

export default function CommentSection({
  commentSectionOpen,
  post,
  comments,
  onClose,
}: {
  commentSectionOpen: boolean;
  post: Post;
  comments: Comment[];
  onClose: Function;
}) {
  const commentModalRef = useRef(null);

  if (!commentSectionOpen) return null;

  return (
    <div
      className="fixed w-full h-full flex justify-end bg-black/20 left-0 top-0 animate-fade-in cursor-pointer"
      onMouseDown={(e) => {
        const modalEdgeClicked =
          (e.target as HTMLElement) === commentModalRef.current;

        // Close modal if clicked outside of modal-content (i.e. the edge of modal)
        if (modalEdgeClicked) onClose();
      }}
      ref={commentModalRef}
    >
      <aside className="flex flex-col shadow-lg bg-white overflow-auto max-w-[414px] w-full cursor-auto">
        <div className="p-6 flex justify-between">
          <h2 className="text-xl font-sohne-semibold">
            Responses ({comments.length})
          </h2>
          <button onClick={() => onClose()}>
            <i className="fa-solid fa-xmark thinnest-icon text-2xl text-grey" />
          </button>
        </div>

        <div className="grow flex flex-col">
          <div className="mx-6 mb-5">
            <CreateComment
              onSubmit={async (commentText: string, authorUid: string) => {
                const comment = {
                  likes: {},
                  likeCount: 0,
                  text: commentText,
                  authorUid,
                  id: getRandomId(12),
                  timestamp: new Date(),
                };

                await addComment(
                  `posts/${post.id}/comments/${comment.id}`,
                  comment
                );
              }}
            />
          </div>

          <div className="mb-4 border-b border-b-neutral-200 pt-5 px-5 pb-3" />

          {comments.length ? (
            <div className="mx-6 mb-5">
              {comments.map((comment) => (
                <PostComment post={post} comment={comment} key={comment.id} />
              ))}
            </div>
          ) : (
            <div className="font-sohne-italic text-grey grow flex flex-col justify-center items-center">
              <p>There are currently no responses for this story.</p>
              <p>Be the first to respond.</p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
