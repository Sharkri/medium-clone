import { Link } from "react-router-dom";
import compactNumber from "../../../helper-functions/compactNumber";
import formatDate from "../../../helper-functions/formatDate";
import UserData from "../../../interfaces/UserDataInterface";

export default function AboutPage({ user }: { user: UserData }) {
  console.log(user);
  return (
    <div className="mx-6 flex flex-col gap-6">
      <span className="text-sm text-grey">
        Medium member since {formatDate(user.creationTime.toDate())}
      </span>

      <div className="">
        <Link
          to={`/u/${user.username}/followers`}
          className="text-green text-sm"
        >
          {compactNumber(user.followers.length)} Followers
        </Link>

        <span className="mx-3">·</span>

        <Link
          to={`/u/${user.username}/following`}
          className="text-green text-sm"
        >
          {compactNumber(user.following.length)} Following
        </Link>
      </div>
    </div>
  );
}
