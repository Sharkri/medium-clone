import { useRef } from "react";
import Comment from "../../../interfaces/CommentInterface";
import CreateComment from "./CreateComment";

export default function CommentSection({
  isCommentSectionOpen,
  comments,
  onClose,
}: {
  isCommentSectionOpen: boolean;
  comments: Comment[];
  onClose: Function;
}) {
  const commentModalRef = useRef(null);

  if (!isCommentSectionOpen) return null;
  return (
    <div
      className="fixed w-full h-full flex justify-end bg-black/20 left-0 top-0 animate-fade-in cursor-pointer"
      onMouseDown={(e) => {
        const modalEdgeClicked =
          (e.target as HTMLElement) === commentModalRef?.current;

        // Close modal if clicked outside of modal-content (i.e. the edge of modal)
        if (modalEdgeClicked) onClose();
      }}
      ref={commentModalRef}
    >
      <aside className="shadow-lg bg-white overflow-auto max-w-[414px] w-full cursor-auto">
        <div className="p-6 flex justify-between">
          <h2 className="text-xl font-sohne-semibold">
            Responses ({comments.length})
          </h2>
          <button onClick={() => onClose()}>
            <i className="fa-solid fa-xmark thinnest-icon text-2xl text-grey" />
          </button>
        </div>

        <div className="mx-6 mb-5">
          <CreateComment />
        </div>
      </aside>
    </div>
  );
}
