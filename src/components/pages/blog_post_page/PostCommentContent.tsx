import { useContext } from "react";
import { Link } from "react-router-dom";
import formatDate from "../../../helper-functions/formatDate";
import removeExtraWhitespace from "../../../helper-functions/removeExtraWhitespace";
import Comment from "../../../interfaces/CommentInterface";
import Post from "../../../interfaces/PostInterface";
import UserData from "../../../interfaces/UserDataInterface";
import UserContext from "../../../UserContext";
import Dropdown from "../../helper-components/Dropdown";
import ProfilePicture from "../../helper-components/ProfilePicture";
import CommentInteractBar from "./CommentInteractBar";

export default function PostCommentContent({
  comment,
  replies,
  post,
  author,
  onEditComment,
  onDeleteComment,
  onReplyComment,
  onLikeComment,
  onToggleOpenReplies,
  isRepliesOpen,
}: {
  comment: Comment;
  replies: Comment[];
  post: Post;
  author: UserData;
  onEditComment: Function;
  onDeleteComment: Function;
  onReplyComment: Function;
  onLikeComment: Function;
  onToggleOpenReplies: Function;
  isRepliesOpen: boolean;
}) {
  const commentTimestamp = comment.timestamp.toDate();
  const { user } = useContext(UserContext);

  const isAuthor = comment.authorUid === post.authorUid;
  const commentDate = formatDate(commentTimestamp, { alwaysRelative: true });

  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <ProfilePicture src={author.photoURL} className="w-8 h-8" />
          <div className="flex flex-col">
            <div>
              <Link to={`/u/${author.username}`}>{author.displayName}</Link>
              {isAuthor && (
                <span className="uppercase bg-green px-[6px] py-[1px] text-[11px] text-white ml-3">
                  Author
                </span>
              )}
            </div>
            <span className="text-grey" title={commentTimestamp}>
              {commentDate}
              {comment.edited && " (edited)"}
            </span>
          </div>
        </div>

        {
          // only original poster can edit/delete their comment
          comment.authorUid === user?.uid && (
            <Dropdown
              buttonStyles="px-[6px]"
              dropdownStyles="min-w-[150px] py-2"
            >
              <i className="fa-solid fa-ellipsis text-zinc-700 text-lg" />
              <div className="text-grey text-sm">
                <button
                  className="py-2 px-5 hover:text-lighterblack whitespace-nowrap"
                  onClick={() => onEditComment()}
                >
                  Edit this response
                </button>

                <button
                  className="py-2 px-5 hover:text-lighterblack"
                  onClick={() => onDeleteComment()}
                >
                  Delete
                </button>
              </div>
            </Dropdown>
          )
        }
      </div>

      <p className="pt-3 pb-[5px] break-word whitespace-pre-wrap max-h-96 overflow-y-auto">
        {removeExtraWhitespace(comment.text)}
      </p>

      <CommentInteractBar
        onReply={onReplyComment}
        onLike={onLikeComment}
        comment={comment}
        currUserUid={user ? user.uid : null}
        onToggleOpenReplies={onToggleOpenReplies}
        isRepliesOpen={isRepliesOpen}
        replyCount={replies?.length || 0}
      />
    </>
  );
}
