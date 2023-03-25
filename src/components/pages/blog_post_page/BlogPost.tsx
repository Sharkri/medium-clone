import { useContext, useEffect, useRef, useState } from "react";

import { useParams } from "react-router-dom";
import { likePost } from "../../../firebase/firebase-app";

import Sidebar from "../../main/Sidebar";
import UserInfo from "../../helper-components/UserInfo";
import BlogMarkdownWithTitleAndDesc from "../../helper-components/BlogMarkdownWithTitleAndDesc";
import InteractionBar from "./InteractionBar";
import BlogPostHeader from "./BlogPostHeader";
import UserContext from "../../../UserContext";
import ModalContext from "../../modal/ModalContext";
import SignUpOptions from "../../sign_in_and_up/SignUpOptions";
import usePost from "../../hooks/usePost";
import LikeButton from "./LikeButton";
import OpenCommentSection from "../../helper-components/OpenCommentSection";
import CommentSection from "./CommentSection";
import useIsBottom from "../../hooks/useIsBottom";
import BlogPostFooter from "./BlogPostFooter";

export default function BlogPost() {
  const { user } = useContext(UserContext);
  const { setModalOpen } = useContext(ModalContext);

  const { title } = useParams();

  const postId = title?.split("-").pop() || "";
  const { post, author, comments } = usePost(postId);

  useEffect(() => {
    if (!post) return;

    document.title = post.title;
    return () => {
      document.title = "Medium";
    };
  }, [post]);

  const [commentsOpen, setCommentsOpen] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const isBottom = useIsBottom(bottomRef);

  if (!post || !author || !comments || !postId) return null;

  async function onLike() {
    if (!user) setModalOpen(true, <SignUpOptions hideAnonymousOption />);
    else await likePost(postId, user.uid);
  }

  return (
    <div className="max-w-[1336px] mx-auto">
      <div className="flex justify-evenly max-lg:block">
        <article className="mx-6 mb-4 grow-[0.7]">
          <main className="mx-auto max-w-[680px] relative">
            <div className="mb-12">
              <BlogPostHeader author={author} post={post} />
              <BlogMarkdownWithTitleAndDesc
                title={post.title}
                description={post.description}
                blogContents={post.blogContents}
              />
            </div>

            <footer ref={bottomRef}>
              <BlogPostFooter
                post={post}
                comments={comments}
                onPostLike={onLike}
                onCommentsOpen={() => setCommentsOpen(true)}
                user={user}
              />
            </footer>

            <InteractionBar isVisible={!isBottom}>
              <LikeButton
                onLike={onLike}
                currentUserLikeCount={user ? post.likes[user.uid] : 0}
                likeCount={post.likeCount}
                disabled={user?.uid === post.authorUid}
              />
              <div className="border border-neutral-200 h-3 mx-4" />
              <OpenCommentSection
                commentsLength={comments.length}
                onOpen={() => setCommentsOpen(true)}
              />
            </InteractionBar>
          </main>

          <CommentSection
            onClose={() => setCommentsOpen(false)}
            post={post}
            comments={comments}
            commentSectionOpen={commentsOpen}
          />
        </article>

        <Sidebar>
          <div className="mt-10">
            <UserInfo user={author} />
          </div>
        </Sidebar>
      </div>
    </div>
  );
}
