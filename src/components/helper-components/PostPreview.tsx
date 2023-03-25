import { Link } from "react-router-dom";
import formatDate from "../../helper-functions/formatDate";
import getLinkForPost from "../../helper-functions/getLinkForPost";
import Post from "../../interfaces/PostInterface";
import useUser from "../hooks/useUser";
import BookmarkButton from "./BookmarkButton";
import ProfilePicture from "./ProfilePicture";
import Topic from "./Topic";

export default function PostPreview({
  post,
  initialThumbnailSize,
  omitProfile,
}: {
  post: Post;
  initialThumbnailSize?: string;
  omitProfile?: Boolean;
}) {
  const author = useUser(post.authorUid);

  if (!author) return null;
  const postLink = getLinkForPost(author.username, post.title, post.id);

  return (
    <article className="border-b border-neutral-200 py-6">
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
            <div className="ml-[60px] max-sm:ml-6">
              <Link
                to={postLink}
                className={`block ${
                  initialThumbnailSize || "w-[112px] h-[112px]"
                } max-sm:w-[80px] max-sm:h-[56px]`}
              >
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className={`w-full h-full max-w-full max-h-full object-cover`}
                />
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center mt-8 max-sm:mt-4 ">
          <div className="grow text-[13px]">
            {post.topics.length > 0 && (
              <Topic
                topicName={post.topics[0]}
                className="px-2 py-[2px] mr-2"
              />
            )}

            <Link to={postLink}>
              {post.readingTimeInMinutes > 0 && (
                <span className="text-grey">
                  {post.readingTimeInMinutes} min read
                </span>
              )}
            </Link>
          </div>

          <BookmarkButton postId={post.id} />
        </div>
      </div>
    </article>
  );
}
