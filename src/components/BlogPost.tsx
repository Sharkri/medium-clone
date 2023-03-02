import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostByTitle, getUserById } from "../firebase/firebase-app";
import Post from "../interfaces/PostInterface";
import UserData from "../interfaces/UserDataInterface";
import BlogMarkdown from "./BlogMarkdown";
import ProfilePicture from "./helper/ProfilePicture";

export default function BlogPost() {
  const [post, setPost] = useState<Post | null>(null);
  const [author, setAuthor] = useState<UserData | null>(null);
  const { title } = useParams();

  useEffect(() => {
    async function fetchInfo() {
      if (!title) return;

      const fetchedPost = (await getPostByTitle(title)) as Post;
      const fetchedAuthor = (await getUserById(
        fetchedPost.authorUid
      )) as UserData;

      setPost(fetchedPost);
      setAuthor(fetchedAuthor);
    }

    fetchInfo();
  }, [title]);

  if (post == null || author == null) return null;

  return (
    <div className="flex">
      <article className="grow m-6">
        <header className="mb-8 mt-4 flex gap-4">
          <Link to={`/${author.username}`}>
            <ProfilePicture
              className="rounded-full w-[48px] h-[48px]"
              src={author.photoURL}
            />
          </Link>

          <div>
            <Link to={`/${author.username}`}>
              <h2 className="text-lighterblack mb-1">{author.displayName}</h2>
            </Link>

            <div className="flex text-sm text-[#757575]">
              <span>
                {/* {post.timestamp.toDate().toString()} */}
                Dec 31, 2022
              </span>

              <div className="px-2">·</div>

              <span>3 min read</span>
            </div>
          </div>
        </header>

        <main className="prose prose-pre:bg-[#282c34]">
          <h1>{post.title}</h1>
          <BlogMarkdown text={post.blogContents} />
        </main>
      </article>

      <aside className="h-screen sticky top-0 max-w-[368px] grow flex justify-center pl-8 pr-6 border-l-[1px] border-subtle-white max-lg:hidden">
        <div className="mt-10">
          <Link to={`/${author.username}`}>
            <ProfilePicture
              className="rounded-full w-[88px] h-[88px]"
              src={author.photoURL}
            />
          </Link>

          <Link to={`/${author.username}`}>
            <h2 className="text-lighterblack font-sohne-semibold mt-4">
              {author.displayName}
            </h2>
          </Link>

          <Link
            to={`/${author.username}/followers`}
            className="text-[#757575] hover:text-lightblack mt-1 inline-block"
          >
            <span>69420 followers</span>
          </Link>
          <p className="text-[#757575] text-sm mt-3">
            CTO & Co-founder @Kravve | Talks about #tech, #web3, #crypto |
            Writer for Level Up Coding & Geek Culture
          </p>

          <button className="mt-6 bg-blue-500 border-[1px] border-blue-500 text-sm text-white rounded-full px-5 py-2">
            Follow
          </button>
        </div>
      </aside>
    </div>
  );
}
