import { Link } from "react-router-dom";
import compactNumber from "../../helper-functions/abbreviateNumber";
import UserData from "../../interfaces/UserDataInterface";
import ProfilePicture from "./ProfilePicture";

// Component contains User PFP, displayName, followers, bio, follow button
export default function UserInfo({ user }: { user: UserData }) {
  const { username, displayName, photoURL } = user;

  return (
    <>
      <Link to={`/u/${username}`} className="block w-[88px] h-[88px]">
        <ProfilePicture className="w-full h-full" src={photoURL} />
      </Link>

      <h2 className="text-lighterblack font-sohne-semibold mt-4">
        <Link to={`/u/${username}`}>{displayName}</Link>
      </h2>

      <Link
        to={`/u/${username}/followers`}
        className="text-grey hover:text-lightblack mt-1 inline-block"
      >
        <span>{compactNumber(user.followers.length)} Followers</span>
      </Link>

      <p className="text-grey text-sm mt-3">{user.bio}</p>

      <button className="mt-6 bg-blue-500 border border-blue-500 text-sm text-white rounded-full px-5 py-2">
        Follow
      </button>
    </>
  );
}
