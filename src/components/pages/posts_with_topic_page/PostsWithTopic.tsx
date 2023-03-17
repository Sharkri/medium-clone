import { sub } from "date-fns";
import { orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostsByTopic, getUserById } from "../../../firebase/firebase-app";
import compactNumber from "../../../helper-functions/compactNumber";
import Post from "../../../interfaces/PostInterface";
import UserData from "../../../interfaces/UserDataInterface";
import Dropdown from "../../helper-components/Dropdown";
import FollowButton from "../../helper-components/FollowButton";
import PostPreview from "../../helper-components/PostPreview";
import ProfilePicture from "../../helper-components/ProfilePicture";
import Sidebar from "../../main/Sidebar";

export default function PostsWithTopic({
  sortBy,
}: {
  sortBy: "latest" | "best";
}) {
  const { topicName } = useParams();
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [storyCount, setStoryCount] = useState(0);
  const [topWriter, setTopWriter] = useState<UserData | null>(null);
  // 0 = all-time. 365 = year, 30 = month, 7 = week
  const [timeRange, setTimeRange] = useState<0 | 365 | 30 | 7>(0);

  useEffect(() => {
    async function getTopWriter(arrayPosts: Post[]) {
      // return the top writer (the one with most liked post)
      const mostLikedPost = arrayPosts.reduce((prev, current) =>
        prev.likeCount >= current.likeCount ? prev : current
      );

      return getUserById(mostLikedPost.authorUid);
    }

    async function sortByLatest() {
      if (!topicName) return;
      // newest posts
      const latestPosts = (await getPostsByTopic(
        topicName,
        orderBy("timestamp", "desc")
      )) as Post[];

      setStoryCount(latestPosts.length);
      setTopWriter((await getTopWriter(latestPosts)) as UserData);
      setPosts(latestPosts);
    }

    async function sortByBest() {
      if (!topicName) return;
      // most liked posts
      const bestPosts = (await getPostsByTopic(
        topicName,
        orderBy("likeCount", "desc")
      )) as Post[];

      setStoryCount(bestPosts.length);
      setTopWriter((await getTopWriter(bestPosts)) as UserData);
      // if all time best posts
      if (timeRange === 0) setPosts(bestPosts);
      else {
        const minDate = sub(new Date(), { days: timeRange });
        // all posts that are newer than minDate
        setPosts(bestPosts.filter((post) => post.timestamp.toDate() > minDate));
      }
    }

    if (sortBy === "latest") sortByLatest();
    else if (sortBy === "best") sortByBest();
  }, [topicName, sortBy, timeRange]);

  if (posts == null) return null;

  return (
    <div className="max-w-[1336px] m-auto">
      <div className="flex justify-evenly">
        <main className="pt-[50px] w-full max-w-[680px] mx-6">
          <header className="flex flex-col mb-6">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-tag rotate-y-180 bg-neutral-200 rounded-full p-[7px]" />
              <h1 className="font-sohne-semibold text-[42px] line-clamp-1 break-all">
                {topicName}
              </h1>
            </div>

            <div className="mt-2 ml-1 border-b -mb-[1px] border-b-neutral-200 text-grey text-sm [&>a]:py-4 flex gap-4">
              <Link
                to={`/tag/${topicName}`}
                className={`${
                  sortBy === "latest" ? "highlight" : ""
                } hover:text-lighterblack`}
              >
                Latest
              </Link>
              <Link
                to={`/tag/${topicName}/best`}
                className={`${
                  sortBy === "best" ? "highlight" : ""
                } hover:text-lighterblack`}
              >
                Best
              </Link>

              {sortBy === "best" && (
                <Dropdown
                  buttonStyles="text-lighterblack flex gap-2 items-center py-4 px-[10px]"
                  dropdownStyles="absolute z-10 bg-white shadow-md border border-neutral-200 rounded-sm overflow-y-auto"
                >
                  <>
                    {timeRange === 7
                      ? "This week"
                      : timeRange === 30
                      ? "This month"
                      : timeRange === 365
                      ? "This year"
                      : "All time"}
                    <i className="fa-solid fa-chevron-down text-[10px]" />
                  </>

                  <div className="py-2 [&>button]:px-4 [&>button]:py-[10px] [&>button]:whitespace-nowrap">
                    <button
                      className="hover:text-lighterblack"
                      onClick={() => setTimeRange(7)}
                    >
                      This week
                    </button>
                    <button
                      className="hover:text-lighterblack"
                      onClick={() => setTimeRange(30)}
                    >
                      This month
                    </button>
                    <button
                      className="hover:text-lighterblack"
                      onClick={() => setTimeRange(365)}
                    >
                      This year
                    </button>
                    <button
                      className="hover:text-lighterblack"
                      onClick={() => setTimeRange(0)}
                    >
                      All time
                    </button>
                  </div>
                </Dropdown>
              )}
            </div>
          </header>

          {!posts.length ? (
            <p className="text-grey">
              No posts found with the current tag/filter...
            </p>
          ) : (
            posts.map((post) => <PostPreview post={post} key={post.id} />)
          )}
        </main>

        <Sidebar>
          <div className="grow flex flex-col gap-8 mt-10">
            <div className="grow pl-2">
              <h2 className="mb-1 text-[22px] font-sohne-bold">
                {compactNumber(storyCount)}
              </h2>
              <span className="text-black/80">Stories</span>
            </div>

            <div className="border-b border-b-neutral-200"></div>

            {topWriter && (
              <div className="text-lighterblack">
                <p className="font-sohne-semibold">Top Writers</p>
                <div className="pt-4">
                  {topWriter && (
                    <div className="flex gap-2 justify-between items-center">
                      <div className="flex gap-4">
                        <ProfilePicture
                          src={topWriter.photoURL}
                          className="w-8 h-8"
                        />
                        <div>
                          <p className="font-sohne-bold">
                            {topWriter.displayName}
                          </p>
                          {topWriter.bio && (
                            <p className="text-[13px] text-grey">
                              {topWriter.bio}
                            </p>
                          )}
                        </div>
                      </div>

                      <FollowButton
                        className="pt-1 px-3 pb-[6px] border border-grey text-sm rounded-full"
                        user={topWriter}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Sidebar>
      </div>
    </div>
  );
}
