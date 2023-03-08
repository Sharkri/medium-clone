import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import { getPostById, getUserById } from "../../../firebase/firebase-app";

import Post from "../../../interfaces/PostInterface";
import UserData from "../../../interfaces/UserDataInterface";
import ProfilePicture from "../../helper-components/ProfilePicture";
import formatDate from "../../../helper-functions/formatDate";
import Sidebar from "../../main/Sidebar";
import UserInfo from "../../helper-components/UserInfo";
import BlogMarkdownWithTitleAndDesc from "../../helper-components/BlogMarkdownWithTitleAndDesc";

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
        <article className="mx-6 mb-16 grow-[0.8]">
          <main className="mx-auto max-w-[680px]">
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
