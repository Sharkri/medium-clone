import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostById, getUserById } from "../firebase/firebase-app";
import Post from "../interfaces/PostInterface";
import UserData from "../interfaces/UserDataInterface";
import BlogMarkdown from "./BlogMarkdown";
import ProfilePicture from "./helper/ProfilePicture";
import { format, isThisYear } from "date-fns";

export default function BlogPost() {
  const [post, setPost] = useState<Post | null>(null);
  const [author, setAuthor] = useState<UserData | null>(null);
  const { title } = useParams();

  const postId = title?.split("-")[1];

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

  const date = post.timestamp.toDate();
  const formattedDate = format(
    date,
    `${isThisYear(date) ? "MMM d" : "MMM d, yyyy"}`
  );

  return (
    <div className="flex">
      <article className="grow m-6">
        <main className="max-w-[728px] m-auto">
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

              <div className="flex text-sm text-gray">
                <span>{formattedDate}</span>
                <div className="px-2">·</div>
                <span>3 min read</span>
              </div>
            </div>
          </header>

          <div className="prose max-sm:prose-p:text-[18px] max-sm:prose-h1:text-[20px] max-sm:prose-h2:text-[18px] max-w-full prose-img:mx-auto prose-img:max-h-[696px] prose-pre:bg-[#282c34] font-content-sans prose-headings:font-sohne-bold">
            <div className="not-prose">
              <h1 className="text-[32px] tracking-[-0.256px] font-sohne-bold">
                {post.title}
              </h1>
              <h2 className="text-gray text-[22px] font-sans">
                {post.description}
              </h2>
            </div>

            {post.thumbnail && <img src={post.thumbnail} alt="" />}

            <BlogMarkdown text={post.blogContents} />
          </div>
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
            className="text-gray hover:text-lightblack mt-1 inline-block"
          >
            <span>69420 followers</span>
          </Link>
          <p className="text-gray text-sm mt-3">
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
