import { arrayRemove, arrayUnion } from "firebase/firestore";
import { useContext } from "react";
import { updateUser } from "../../firebase/firebase-app";
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

  const unBookmarkPost = () =>
    updateUser(uid!, { bookmarks: arrayRemove(postId) });
  const bookmarkPost = () =>
    updateUser(uid!, { bookmarks: arrayUnion(postId) });

  return (
    <button
      onClick={() => {
        if (!uid) {
          setModalOpen(true, <SignUpOptions />);
          return;
        }

        if (isBookmarked) unBookmarkPost();
        else bookmarkPost();
      }}
      className={`text-grey ${
        isBookmarked ? "hover:text-black/60" : "hover:text-zinc-700"
      } text-lg px-2`}
    >
      <i
        className={`${isBookmarked ? "fa-solid" : "fa-regular"} fa-bookmark`}
      />
    </button>
  );
}
