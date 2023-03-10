import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import { getPostRef, getUserById } from "../../../firebase/firebase-app";

import UserData from "../../../interfaces/UserDataInterface";
import ProfilePicture from "../../helper-components/ProfilePicture";
import formatDate from "../../../helper-functions/formatDate";
import Sidebar from "../../main/Sidebar";
import UserInfo from "../../helper-components/UserInfo";
import BlogMarkdownWithTitleAndDesc from "../../helper-components/BlogMarkdownWithTitleAndDesc";
import InteractionBar from "./InteractionBar";
import { DocumentReference } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Post from "../../../interfaces/PostInterface";

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
            <header className="mb-8 mt-14 max-lg:mt-8 max-lg:mb-6 flex gap-4">
              <Link to={`/u/${author.username}`}>
                <ProfilePicture
                  className="w-[48px] h-[48px]"
                  src={author.photoURL}
                />
              </Link>
              <div>
                <div className="flex items-center mb-1">
                  <Link to={`/u/${author.username}`}>
                    <h2 className="text-lighterblack">{author.displayName}</h2>
                  </Link>
                  <button className="lg:hidden ml-3 bg-blue-500 border border-blue-500 text-[13px] text-white rounded-full px-2 pb-[1px]">
                    Follow
                  </button>
                </div>

                <div className="flex text-sm text-grey">
                  <span>
                    {formatDate(post.timestamp.toDate(), {
                      omitIfCurrentYear: true,
                    })}
                  </span>
                  <div className="px-2">·</div>
                  <span>{post.readingTimeInMinutes} min read</span>
                </div>
              </div>
            </header>

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
