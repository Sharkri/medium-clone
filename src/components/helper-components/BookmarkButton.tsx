import { useContext } from "react";
import { bookmarkPost, unBookmarkPost } from "../../firebase/firebase-app";
import ModalContext from "../modal/ModalContext";
import SignUpOptions from "../sign_in_and_up/SignUpOptions";

export default function BookmarkButton({
  uid,
  postId,
  isBookmarked,
}: {
  uid?: string;
  postId: string;
  isBookmarked: boolean | undefined;
}) {
  const { setModalOpen } = useContext(ModalContext);

  return (
    <button
      onClick={() => {
        if (!uid) {
          setModalOpen(true, <SignUpOptions />);
          return;
        }

        if (isBookmarked) unBookmarkPost(uid, postId);
        else bookmarkPost(uid, postId);
      }}
      className="text-grey hover:text-zinc-700 text-lg px-2"
    >
      <i
        className={`${isBookmarked ? "fa-solid" : "fa-regular"} fa-bookmark`}
      />
    </button>
  );
}
