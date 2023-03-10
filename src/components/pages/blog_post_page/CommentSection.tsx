import { useRef } from "react";
import Post from "../../../interfaces/PostInterface";
import CreateComment from "./CreateComment";
import PostComment from "./PostComment";

export default function CommentSection({
  commentSectionOpen,
  post,
  onClose,
}: {
  commentSectionOpen: boolean;
  post: Post;
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
      <aside className="shadow-lg bg-white overflow-auto max-w-[414px] w-full cursor-auto">
        <div className="p-6 flex justify-between">
          <h2 className="text-xl font-sohne-semibold">
            Responses ({post.comments.length})
          </h2>
          <button onClick={() => onClose()}>
            <i className="fa-solid fa-xmark thinnest-icon text-2xl text-grey" />
          </button>
        </div>

        <div>
          <div className="mx-6 mb-5">
            <CreateComment post={post} />
          </div>

          <div className="mb-4 border-b border-b-neutral-200 pt-5 px-5 pb-3">
            <button className="text-xs px-3">
              <strong className="uppercase font-sohne-bold mr-2">
                Most relevant
              </strong>
              <i className="fa-solid fa-chevron-down thin-icon" />
            </button>
          </div>

          <div className="mx-6 mb-5">
            {post.comments.map((comment) => (
              <PostComment
                comment={comment}
                key={comment.id}
                isAuthor={comment.authorUid === post.authorUid}
              />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
