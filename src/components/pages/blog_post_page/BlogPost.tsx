import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import { getPostById, getUserById } from "../../../firebase/firebase-app";

import Post from "../../../interfaces/PostInterface";
import UserData from "../../../interfaces/UserDataInterface";
import BlogMarkdown from "../../helper-components/BlogMarkdown";
import ProfilePicture from "../../helper-components/ProfilePicture";
import formatDate from "../../../helper-functions/formatDate";
import Sidebar from "../../main/Sidebar";
import UserInfo from "../../helper-components/UserInfo";

export default function BlogPost() {
  const [post, setPost] = useState<Post | null>(null);
  const [author, setAuthor] = useState<UserData | null>(null);
  const { title } = useParams();

  const postId = title?.split("-").pop();

  useEffect(() => {
    async function fetchInfo() {
      if (!postId) return;

      const fetchedPost = (await getPostById(postId)) as Post;
      const fetchedAuthor = (await getUserById(
        fetchedPost.authorUid
      )) as UserData;

      setPost(fetchedPost);
      setAuthor(fetchedAuthor);
    }

    fetchInfo();
  }, [postId]);

  if (post == null || author == null) return null;

  return (
    <div className="max-w-[1336px] mx-auto">
      <div className="flex justify-evenly max-lg:block">
        <article className="mx-6 mb-16">
          <main className="mx-auto max-w-[680px]">
            <header className="mb-8 mt-4 flex gap-4">
              <Link to={`/${author.username}`}>
                <ProfilePicture
                  className="w-[48px] h-[48px]"
                  src={author.photoURL}
                />
              </Link>
              <div>
                <Link to={`/${author.username}`}>
                  <h2 className="text-lighterblack mb-1">
                    {author.displayName}
                  </h2>
                </Link>
                <div className="flex text-sm text-grey">
                  <span>{formatDate(post.timestamp.toDate())}</span>
                  <div className="px-2">·</div>
                  <span>{post.readingTimeInMinutes} min read</span>
                </div>
              </div>
            </header>
            <div className="prose max-sm:prose-p:text-[18px] max-sm:prose-h1:text-[20px] max-sm:prose-h2:text-[18px] max-w-full prose-img:mx-auto prose-img:max-h-[696px] prose-pre:bg-[#282c34] font-source-serif-pro prose-headings:font-sohne-bold">
              <div className="not-prose">
                <h1 className="text-[32px] tracking-[-0.256px] font-sohne-bold">
                  {post.title}
                </h1>
                <h2 className="text-grey text-[22px] font-sans">
                  {post.description}
                </h2>
              </div>
              {post.thumbnail && <img src={post.thumbnail} alt="" />}
              <BlogMarkdown text={post.blogContents} />
            </div>
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