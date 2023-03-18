import { Link } from "react-router-dom";
import UserData from "../../../interfaces/UserDataInterface";
import FollowButton from "../../helper-components/FollowButton";
import ProfilePicture from "../../helper-components/ProfilePicture";

export default function FollowerUserInfo({ follower }: { follower: UserData }) {
  return (
    <div className="flex justify-between items-center">
      <Link className="flex gap-6" to={`/u/${follower.username}`}>
        <ProfilePicture src={follower.photoURL} className="w-12 h-12" />

        <div>
          <p className="line-clamp-1 break-all font-sohne-semibold">
            {follower.displayName}
          </p>
          <p className="line-clamp-2 break-all text-grey text-sm">
            {follower.bio}
          </p>
        </div>
      </Link>

      <FollowButton
        className="px-4 py-[6px] bg-green text-sm text-white rounded-full"
        user={follower}
      />
    </div>
  );
}
