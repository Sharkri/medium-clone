import { useContext } from "react";
import { Link } from "react-router-dom";
import compactNumber from "../../helper-functions/compactNumber";
import UserData from "../../interfaces/UserDataInterface";
import UserContext from "../../UserContext";
import FollowButton from "./FollowButton";
import ProfilePicture from "./ProfilePicture";

// Component contains User PFP, displayName, followers, bio, follow or edit profile button
export default function UserInfo({ user }: { user: UserData }) {
  const { username, displayName, photoURL } = user;
  const { user: loggedInUser } = useContext(UserContext);

  return (
    <>
      <Link
        to={`/u/${username}`}
        className="block w-12 h-12 lg:w-[88px] lg:h-[88px]"
      >
        <ProfilePicture className="w-full h-full" src={photoURL} />
      </Link>

      <h2 className="text-lighterblack font-sohne-semibold mt-4 line-clamp-1 break-all">
        <Link to={`/u/${username}`}>{displayName}</Link>
      </h2>
      <Link
        to={`/u/${username}/followers`}
        className="text-grey hover:text-lightblack mt-1 inline-block"
      >
        <span>{compactNumber(user.followers.length)} Followers</span>
      </Link>

      <div className="mt-3" />

      {user.bio && (
        <p className="text-grey text-sm mb-6 max-sm:hidden">{user.bio}</p>
      )}

      {loggedInUser?.uid === user.uid ? (
        <Link
          to="/settings"
          className="text-green text-[13px] hover:text-lightblack"
        >
          Edit profile
        </Link>
      ) : (
        <FollowButton
          user={user}
          className="bg-blue-500 border border-blue-500 text-sm text-white rounded-full px-5 py-2"
        />
      )}
    </>
  );
}
