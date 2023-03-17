import { Link } from "react-router-dom";
import formatDate from "../../../helper-functions/formatDate";
import Post from "../../../interfaces/PostInterface";
import UserData from "../../../interfaces/UserDataInterface";
import FollowButton from "../../helper-components/FollowButton";
import ProfilePicture from "../../helper-components/ProfilePicture";

export default function BlogPostHeader({
  author,
  post,
}: {
  author: UserData;
  post: Post;
}) {
  return (
    <header className="mb-8 mt-14 max-lg:mt-8 max-lg:mb-6 flex gap-4">
      <Link to={`/u/${author.username}`}>
        <ProfilePicture className="w-[48px] h-[48px]" src={author.photoURL} />
      </Link>
      <div>
        <div className="flex items-center mb-1">
          <Link to={`/u/${author.username}`}>
            <h2 className="text-lighterblack">{author.displayName}</h2>
          </Link>

          <FollowButton
            className="lg:hidden ml-3 bg-blue-500 border border-blue-500 text-[13px] text-white rounded-full px-2 pb-[1px]"
            user={author}
          />
        </div>

        <div className="flex text-sm text-grey">
          <span>
            {formatDate(post.timestamp.toDate(), {
              omitIfCurrentYear: true,
            })}
          </span>
          <div className="px-2">·</div>
          <span>{post.readingTimeInMinutes} min read</span>
        </div>
      </div>
    </header>
  );
}
