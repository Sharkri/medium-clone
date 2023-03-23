import { arrayRemove, arrayUnion } from "firebase/firestore";
import { useContext } from "react";
import { updatePrivateUserInfo } from "../../firebase/firebase-app";
import ModalContext from "../modal/ModalContext";
import SignUpOptions from "../sign_in_and_up/SignUpOptions";

export default function BookmarkButton({
  uid,
  postId,
  isBookmarked,
  isAnonymous,
}: {
  uid?: string;
  postId: string;
  isBookmarked: boolean | undefined;
  isAnonymous: boolean;
}) {
  const { setModalOpen } = useContext(ModalContext);

  const unBookmarkPost = () => {
    updatePrivateUserInfo(uid!, { bookmarks: arrayRemove(postId) });
  };
  const bookmarkPost = () => {
    updatePrivateUserInfo(uid!, { bookmarks: arrayUnion(postId) });
  };

  return (
    <button
      onClick={() => {
        if (isAnonymous) return;

        // if there is no user
        if (!uid) {
          setModalOpen(true, <SignUpOptions hideAnonymousOption />);
          return;
        }

        if (isBookmarked) unBookmarkPost();
        else bookmarkPost();
      }}
      className={`text-grey ${
        isBookmarked ? "hover:text-black/60" : "hover:text-zinc-700"
      } text-lg px-2 disabled:opacity-40 disabled:cursor-not-allowed`}
      disabled={isAnonymous}
      title={isAnonymous ? "Anonymous users cannot have bookmarks" : undefined}
    >
      <i
        className={`${isBookmarked ? "fa-solid" : "fa-regular"} fa-bookmark`}
      />
    </button>
  );
}
