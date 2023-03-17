import { useContext, useState } from "react";
import {
  useCollectionData,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import {
  addComment,
  deleteComment,
  editComment,
  getCollectionRef,
  getUserRef,
  likeComment,
} from "../../../firebase/firebase-app";
import getRandomId from "../../../helper-functions/getRandomId";
import Comment from "../../../interfaces/CommentInterface";
import Post from "../../../interfaces/PostInterface";
import UserData from "../../../interfaces/UserDataInterface";
import UserContext from "../../../UserContext";
import ModalContext from "../../modal/ModalContext";
import SignUpOptions from "../../sign_in_and_up/SignUpOptions";
import CreateComment from "./CreateComment";
import PostCommentContent from "./PostCommentContent";
import PostReplies from "./PostReplies";

export default function PostComment({
  post,
  comment,
  commentPath = `posts/${post.id}/comments/${comment.id}`,
  nestedLvl = 0,
}: {
  post: Post;
  comment: Comment;
  commentPath?: string;
  nestedLvl?: number;
}) {
  const { user: currentUser } = useContext(UserContext);
  const { setModalOpen } = useContext(ModalContext);

  const replyRef = getCollectionRef(`${commentPath}/replies`);
  const [replies] = useCollectionData(replyRef);
  const [replying, setReplying] = useState(false);
  const [editingComment, setEditing] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const [author] = useDocumentDataOnce(getUserRef(comment.authorUid));

  async function replyToComment(commentText: string) {
    // only logged in user can reply
    if (!currentUser) return;

    const reply = {
      likes: {},
      likeCount: 0,
      text: commentText,
      authorUid: currentUser.uid,
      id: getRandomId(12),
      timestamp: new Date(),
    };

    await addComment(`${commentPath}/replies/${reply.id}`, reply);

    setReplying(false);
    setShowReplies(true);
  }

  async function onLikeComment() {
    if (!currentUser) setModalOpen(true, <SignUpOptions />);
    else await likeComment(commentPath, currentUser.uid);
  }

  if (author == null) return null;

  return (
    <div className="group/comment">
      <div className="relative pt-6 pb-4 text-sm text-lighterblack">
        {editingComment ? (
          <CreateComment
            initialText={comment.text}
            onSubmit={async (newCommentText: string) => {
              await editComment(commentPath, newCommentText);
              setEditing(false);
            }}
            onCancel={() => setEditing(false)}
            hideUserInfo
          />
        ) : (
          <PostCommentContent
            comment={comment}
            replies={replies as Comment[]}
            post={post}
            author={author as UserData}
            onEditComment={() => setEditing(true)}
            onDeleteComment={() => deleteComment(commentPath)}
            onReplyComment={() => setReplying(true)}
            onLikeComment={onLikeComment}
            onToggleOpenReplies={() => setShowReplies(!showReplies)}
            isRepliesOpen={showReplies}
          />
        )}
      </div>

      {replying && (
        <div
          className={
            nestedLvl < 3
              ? "border-l-[3px] border-l-neutral-200 pl-6 ml-3"
              : undefined
          }
        >
          <CreateComment
            placeholder={`Replying to ${author.displayName}`}
            hideUserInfo
            onCancel={() => setReplying(false)}
            onSubmit={replyToComment}
          />
        </div>
      )}

      {showReplies && (
        <PostReplies
          currentNestedLvl={nestedLvl}
          post={post}
          currentCommentPath={commentPath}
          replies={(replies || []) as Comment[]}
          className={
            "mb-6 animate-open" +
            (nestedLvl < 3 && " border-l-[3px] border-l-neutral-200 pl-6 ml-3")
          }
        />
      )}

      <div className="border-b border-neutral-200 group-last/comment:border-b-0" />
    </div>
  );
}
