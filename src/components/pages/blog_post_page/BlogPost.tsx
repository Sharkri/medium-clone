import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { getPostRef, getUserById } from "../../../firebase/firebase-app";

import UserData from "../../../interfaces/UserDataInterface";
import Sidebar from "../../main/Sidebar";
import UserInfo from "../../helper-components/UserInfo";
import BlogMarkdownWithTitleAndDesc from "../../helper-components/BlogMarkdownWithTitleAndDesc";
import InteractionBar from "./InteractionBar";
import { DocumentReference } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Post from "../../../interfaces/PostInterface";
import BlogPostHeader from "./BlogPostHeader";

export default function BlogPost() {
  const [postRef, setPostRef] = useState<DocumentReference | null>(null);
  const documentData = useDocumentData(postRef);

  const post = documentData[0] as Post;

  const [author, setAuthor] = useState<UserData | null>(null);
  const { title } = useParams();

  const postId = title?.split("-").pop();

  useEffect(() => {
    if (!postId) return;
    getPostRef(postId).then((ref) => setPostRef(ref as DocumentReference));
  }, [postId]);

  useEffect(() => {
    if (!post?.authorUid) return;
    getUserById(post.authorUid).then((user) => setAuthor(user as UserData));
  }, [post?.authorUid]);

  if (post == null || author == null) return null;

  return (
    <div className="max-w-[1336px] mx-auto h-[calc(100vh-57px)]">
      <div className="flex justify-evenly max-lg:block h-full">
        <article className="mx-6 mb-16 grow-[0.8] relative h-full">
          <main className="mx-auto max-w-[680px] min-h-full">
            <BlogPostHeader author={author} post={post} />

            <BlogMarkdownWithTitleAndDesc
              title={post.title}
              description={post.description}
              blogContents={post.blogContents}
            />
          </main>

          <InteractionBar post={post} />
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
