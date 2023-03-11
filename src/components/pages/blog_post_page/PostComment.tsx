import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserById } from "../../../firebase/firebase-app";
import formatDate from "../../../helper-functions/formatDate";
import Comment from "../../../interfaces/CommentInterface";
import UserData from "../../../interfaces/UserDataInterface";
import ProfilePicture from "../../helper-components/ProfilePicture";
import LikeButton from "./LikeButton";

export default function PostComment({
  comment,
  isAuthor,
}: {
  comment: Comment;
  isAuthor: boolean;
}) {
  const [author, setAuthor] = useState<UserData | null>(null);

  useEffect(() => {
    getUserById(comment.authorUid).then((user) => setAuthor(user as UserData));
  }, [comment.authorUid]);

  const commentTimestamp = comment.timestamp.toDate();

  if (author == null) return null;

  return (
    <div className="pt-6 pb-4 text-sm text-lighterblack">
      <div className="flex gap-3 items-center">
        {<ProfilePicture src={author.photoURL} className="w-8 h-8" />}
        <div className="flex flex-col">
          <div>
            <Link to={`/u/${author.username}`}>{author.displayName}</Link>
            {isAuthor && (
              <span className="bg-green px-[6px] py-[1px] text-[11px] text-white ml-3">
                AUTHOR
              </span>
            )}
          </div>
          <span className="text-grey" title={commentTimestamp}>
            {formatDate(commentTimestamp, { alwaysRelative: true })}
          </span>
        </div>
      </div>

      <div className="pt-3 pb-[5px]">{comment.text}</div>
      <div className="mt-[14px] flex justify-between">
        <LikeButton onLike={() => {}} likeCount={0} currentUserLikeCount={0} />

        <button>Reply</button>
      </div>
    </div>
  );
}
