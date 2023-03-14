import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserById } from "../../firebase/firebase-app";
import formatDate from "../../helper-functions/formatDate";
import getLinkForPost from "../../helper-functions/getLinkForPost";
import Post from "../../interfaces/PostInterface";
import UserData from "../../interfaces/UserDataInterface";
import ProfilePicture from "./ProfilePicture";

export default function PostPreview({
  post,
  omitProfile,
}: {
  post: Post;
  omitProfile?: Boolean;
}) {
  const [author, setAuthor] = useState<UserData | null>(null);

  useEffect(() => {
    getUserById(post.authorUid).then((user) => setAuthor(user as UserData));
  }, [post.authorUid]);

  if (!author) return null;

  const postLink = getLinkForPost(author.username, post.title, post.id);

  return (
    <article className="max-w-[680px] mx-6 border-b border-neutral-200">
      <div className="flex gap-2">
        {!omitProfile && (
          <Link to={`/u/${author.username}`}>
            <ProfilePicture
              src={author.photoURL}
              className="min-w-[24px] max-w-[24px] h-6"
            />
          </Link>
        )}

        <div className="flex">
          {!omitProfile && (
            <>
              <Link to={`/u/${author.username}`}>
                <p className="line-clamp-1 break-all text-sm">
                  {author.displayName}
                </p>
              </Link>
              <div className="mx-1 text-sm">·</div>
            </>
          )}
          <span className="text-grey text-sm whitespace-nowrap">
            {formatDate(post.timestamp.toDate(), {
              relativeIfLast7Days: true,
              omitIfCurrentYear: true,
            })}
          </span>
        </div>
      </div>

      <div className="flex flex-col mt-3">
        <div className="grow flex">
          <Link to={postLink} className="text-lighterblack grow">
            <div className="pb-2">
              <h2 className="font-sohne-bold text-[22px] leading-7 line-clamp-3 max-sm:line-clamp-2 max-sm:text-base">
                {post.title}
              </h2>
            </div>
            <p className="line-clamp-3 font-source-serif-pro max-sm:hidden">
              {post.description}
            </p>
          </Link>

          {post.thumbnail && (
            <div className="ml-[60px] min-w-[112px] max-sm:min-w-[80px] max-sm:ml-6">
              <Link to={postLink}>
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-[112px] h-[112px] max-sm:w-[80px] max-sm:h-14 object-cover"
                />
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center py-8 max-sm:py-4">
          <div className="grow">
            <Link to={postLink}>
              <span className="text-grey text-sm">
                {post.readingTimeInMinutes} min read
              </span>
            </Link>
          </div>
          <button className="p-2 flex">
            <i className="fa-regular fa-bookmark thin-icon text-black/80 text-lg" />
          </button>
        </div>
      </div>
    </article>
  );
}
