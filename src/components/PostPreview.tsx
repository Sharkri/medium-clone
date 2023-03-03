import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserById } from "../firebase/firebase-app";
import formatDate from "../helper-functions/formatDate";
import Post from "../interfaces/PostInterface";
import UserData from "../interfaces/UserDataInterface";
import ProfilePicture from "./helper/ProfilePicture";

export default function PostPreview({ post }: { post: Post }) {
  const [author, setAuthor] = useState<UserData | null>(null);

  useEffect(() => {
    getUserById(post.authorUid).then((user) => setAuthor(user as UserData));
  }, [post.authorUid]);

  if (!author) return null;

  // lowercase title + trim extra whitespace + remove non-alphanumeric + convert spaces to dash
  const linkSafeTitle = post.title
    .toLowerCase()
    .replace(/[\W_]+/g, "")
    .replace(/ /g, "-");

  const postLink = `/${author.username}/posts/${linkSafeTitle}-${post.id}`;

  return (
    <article className="max-w-[680px] mx-6">
      <div className="flex gap-2">
        <Link to={`/${author.username}`}>
          <ProfilePicture
            src={author.photoURL}
            className="min-w-[24px] h-6 rounded-full"
          />
        </Link>

        <div className="flex">
          <Link to={`/${author.username}`}>
            <p className="line-clamp-1 break-all text-sm">
              {author.displayName}
            </p>
          </Link>
          <div className="mx-1 text-sm">·</div>
          <span className="text-gray text-sm whitespace-nowrap">
            {formatDate(post.timestamp.toDate())}
          </span>
        </div>
      </div>
      <div className="flex mt-3">
        <Link to={postLink} className="text-lighterblack">
          <h2 className="pb-2 font-sohne-bold  text-[22px] leading-7 line-clamp-3 max-sm:line-clamp-2 max-sm:text-base">
            {post.title}
          </h2>
          <p className="line-clamp-3 font-source-serif-pro max-sm:hidden">
            {post.description}
          </p>
        </Link>

        {post.thumbnail && (
          <Link to={postLink} className="ml-[60px] min-w-[112px]">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-[112px] h-[112px]"
            />
          </Link>
        )}
      </div>
    </article>
  );
}
