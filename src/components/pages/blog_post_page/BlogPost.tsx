import { useContext, useEffect } from "react";

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
import Topic from "../../helper-components/Topic";

export default function BlogPost() {
  const { user: currentUser } = useContext(UserContext);
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

  if (!post || !author || !postId) return null;

  const currentUserLikeCount = currentUser ? post.likes[currentUser.uid] : 0;

  return (
    <div className="max-w-[1336px] mx-auto">
      <div className="flex justify-evenly max-lg:block">
        <article className="mx-6 mb-4 grow-[0.8]">
          <main className="mx-auto max-w-[680px] relative">
            <div className="mb-12">
              <BlogPostHeader author={author} post={post} />

              <BlogMarkdownWithTitleAndDesc
                title={post.title}
                description={post.description}
                blogContents={post.blogContents}
              />
            </div>

            <div className="flex flex-wrap">
              {post.topics.map((topicName) => (
                <Topic
                  key={topicName}
                  topicName={topicName}
                  className="px-4 py-2 mr-2 text-sm"
                />
              ))}
            </div>

            <InteractionBar
              post={post}
              comments={comments}
              currentUserLikeCount={currentUserLikeCount}
              currUserUid={currentUser?.uid}
              onLike={async () => {
                if (!currentUser) setModalOpen(true, <SignUpOptions />);
                else await likePost(postId, currentUser.uid);
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
