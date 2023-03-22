import { useContext, useState } from "react";
import {
  followUser,
  sendNotificationToFollowers,
  unfollowUser,
} from "../../firebase/firebase-app";
import getRandomId from "../../helper-functions/getRandomId";
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
    else {
      await followUser(currentUser.uid, userToFollow.uid);

      await sendNotificationToFollowers(currentUser.followers, {
        uid: currentUser.uid,
        message: "started following you",
        timestamp: new Date(),
        id: getRandomId(12),
      });
    }

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
