import { useContext, useState } from "react";
import {
  useCollectionData,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import {
  addComment,
  getCollectionRef,
  getUserRef,
} from "../../../firebase/firebase-app";
import formatDate from "../../../helper-functions/formatDate";
import getLikeCount from "../../../helper-functions/getLikeCount";
import getRandomId from "../../../helper-functions/getRandomId";
import Comment from "../../../interfaces/CommentInterface";
import Post from "../../../interfaces/PostInterface";
import UserContext from "../../../UserContext";
import ProfilePicture from "../../helper-components/ProfilePicture";
import CreateComment from "./CreateComment";
import LikeButton from "./LikeButton";
import ShowRepliesButton from "./ShowRepliesButton";

export default function PostComment({
  post,
  comment,
  onCommentLike,
  commentPath = `posts/${post.id}/comments/${comment.id}`,
}: {
  post: Post;
  comment: Comment;
  onCommentLike: Function;
  commentPath?: string;
}) {
  const { user: currentUser } = useContext(UserContext);

  const replyRef = getCollectionRef(`${commentPath}/replies`);
  const [replies] = useCollectionData(replyRef);
  const [replying, setReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const [author] = useDocumentDataOnce(getUserRef(comment.authorUid));

  const commentTimestamp = comment.timestamp.toDate();

  async function replyToComment(commentText: string) {
    // only logged in user can reply
    if (!currentUser) return;

    const reply = {
      likes: {},
      text: commentText,
      authorUid: currentUser.uid,
      id: getRandomId(12),
      timestamp: new Date(),
    };

    await addComment(`${commentPath}/replies/${reply.id}`, reply);

    setReplying(false);
    setShowReplies(true);
  }

  if (author == null) return null;

  return (
    <div className="group/comment">
      <div className="pt-6 pb-4 text-sm text-lighterblack">
        <div className="flex gap-3 items-center">
          {<ProfilePicture src={author.photoURL} className="w-8 h-8" />}
          <div className="flex flex-col">
            <div>
              <Link to={`/u/${author.username}`}>{author.displayName}</Link>
              {comment.authorUid === post.authorUid && (
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
          <div className="flex gap-4">
            <LikeButton
              onLike={() => onCommentLike(commentPath)}
              likeCount={getLikeCount(comment.likes)}
              className="text-sm"
              currentUserLikeCount={
                currentUser ? comment.likes[currentUser.uid] : 0
              }
            />

            {replies?.length ? (
              <ShowRepliesButton
                onClick={() => setShowReplies(!showReplies)}
                isOpen={showReplies}
                replyCount={replies.length}
              />
            ) : null}
          </div>
          <button onClick={() => setReplying(true)}>Reply</button>
        </div>
      </div>

      {showReplies && (
        <div className="border-l-[3px] border-l-neutral-200 pl-6 ml-3 mb-6 animate-open">
          {(replies || []).map((reply) => (
            <PostComment
              comment={reply as Comment}
              post={post}
              onCommentLike={onCommentLike}
              commentPath={`${commentPath}/replies/${reply.id}`}
              key={reply.id}
            />
          ))}
        </div>
      )}

      {replying && (
        <CreateComment
          placeholder={`Replying to ${author.displayName}`}
          hideUserInfo
          onSubmit={replyToComment}
        />
      )}

      <div className="border-b border-neutral-200 group-last/comment:border-b-0" />
    </div>
  );
}
