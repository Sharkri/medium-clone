import { useContext, useEffect } from "react";

import { useParams } from "react-router-dom";
import { likeComment, likePost } from "../../../firebase/firebase-app";

import Sidebar from "../../main/Sidebar";
import UserInfo from "../../helper-components/UserInfo";
import BlogMarkdownWithTitleAndDesc from "../../helper-components/BlogMarkdownWithTitleAndDesc";
import InteractionBar from "./InteractionBar";
import BlogPostHeader from "./BlogPostHeader";
import UserContext from "../../../UserContext";
import ModalContext from "../../modal/ModalContext";
import SignUpOptions from "../../sign_in_and_up/SignUpOptions";
import usePost from "../../hooks/usePost";

export default function BlogPost() {
  const { user: currentUser } = useContext(UserContext);
  const { setModalOpen } = useContext(ModalContext);

  const { title } = useParams();

  useEffect(() => {
    if (!title) return;
    const postTitle = title.split("-").slice(0, -1).join(" ");

    document.title = postTitle;
    return () => {
      document.title = "Medium";
    };
  }, [title]);

  const postId = title?.split("-").pop() || "";
  const { post, author, comments } = usePost(postId);

  if (!post || !author || !postId) return null;

  const currentUserLikeCount = currentUser ? post.likes[currentUser.uid] : 0;

  return (
    <div className="max-w-[1336px] mx-auto">
      <div className="flex justify-evenly max-lg:block">
        <article className="mx-6 mb-16 grow-[0.8]">
          <main className="mx-auto max-w-[680px] relative">
            <BlogPostHeader author={author} post={post} />

            <BlogMarkdownWithTitleAndDesc
              title={post.title}
              description={post.description}
              blogContents={post.blogContents}
            />

            <InteractionBar
              post={post}
              comments={comments}
              currentUserLikeCount={currentUserLikeCount}
              onLike={async () => {
                if (!currentUser) setModalOpen(true, <SignUpOptions />);
                else await likePost(postId, currentUser.uid);
              }}
              onCommentLike={async (commentPath: string) => {
                if (!currentUser) setModalOpen(true, <SignUpOptions />);
                else await likeComment(commentPath, currentUser.uid);
              }}
            />
          </main>
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
