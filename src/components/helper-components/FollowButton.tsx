import { useContext, useState } from "react";
import { followUser, unfollowUser } from "../../firebase/firebase-app";
import UserData from "../../interfaces/UserDataInterface";
import UserContext from "../../UserContext";
import ModalContext from "../modal/ModalContext";
import SignUpOptions from "../sign_in_and_up/SignUpOptions";

export default function FollowButton({
  user: userToFollow,
  className,
}: {
  user: UserData;
  className?: string;
}) {
  const { user: currentUser } = useContext(UserContext);
  const { setModalOpen } = useContext(ModalContext);

  const isFollowing = currentUser?.following.includes(userToFollow.uid);
  const [loading, setLoading] = useState(false);

  async function handleFollow() {
    if (!currentUser) {
      setModalOpen(true, <SignUpOptions />);
      return;
    }

    setLoading(true);

    if (isFollowing) await unfollowUser(currentUser.uid, userToFollow.uid);
    else await followUser(currentUser.uid, userToFollow.uid);

    setLoading(false);
  }

  // users should not be allowed to follow themselves
  if (userToFollow.uid === currentUser?.uid) return null;

  return (
    <button className={className} disabled={loading} onClick={handleFollow}>
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
}
