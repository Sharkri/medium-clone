import { where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostCount } from "../../../firebase/firebase-app";
import compactNumber from "../../../helper-functions/compactNumber";
import Dropdown from "../../helper-components/Dropdown";
import LatestPosts from "../../helper-components/LatestPosts";
import MostLikedPosts from "../../helper-components/MostLikedPosts";
import ScrollerItems from "../../helper-components/ScrollerItems";
import Sidebar from "../../main/Sidebar";

export default function PostsWithTopic({
  sortBy,
}: {
  sortBy: "latest" | "best";
}) {
  const { topicName } = useParams();

  const topicOptions = [
    where("lowercaseTopics", "array-contains", topicName?.toLowerCase()),
  ];

  const [storyCount, setStoryCount] = useState(0);
  // 0 = all-time. 365 = year, 30 = month, 7 = week
  const [timeRange, setTimeRange] = useState<0 | 365 | 30 | 7>(0);

  const time = {
    7: "This week",
    30: "This month",
    365: "This year",
    0: "All time",
  };

  useEffect(() => {
    if (!topicName) return;

    // get the post count for topic
    getPostCount(...topicOptions).then(setStoryCount);
  }, [topicName]);

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

            <ScrollerItems className="mt-2 ml-1 -mb-[1px]">
              <Link
                to={`/tag/${topicName}`}
                className={sortBy === "latest" ? "highlight" : undefined}
              >
                Latest
              </Link>
              <Link
                to={`/tag/${topicName}/best`}
                className={sortBy === "best" ? "highlight" : undefined}
              >
                Best
              </Link>

              {sortBy === "best" && (
                <Dropdown
                  buttonStyles="text-lighterblack flex gap-2 items-center"
                  dropdownStyles="rounded-sm"
                >
                  <>
                    {time[timeRange]}
                    <i className="fa-solid fa-chevron-down text-[10px]" />
                  </>

                  <div className="py-2 child:px-4 child:py-[10px] child:whitespace-nowrap child-hover:text-lighterblack">
                    <button onClick={() => setTimeRange(7)}>This week</button>
                    <button onClick={() => setTimeRange(30)}>This month</button>
                    <button onClick={() => setTimeRange(365)}>This year</button>
                    <button onClick={() => setTimeRange(0)}>All time</button>
                  </div>
                </Dropdown>
              )}
            </ScrollerItems>
          </header>
          {sortBy === "latest" ? (
            <LatestPosts options={topicOptions} />
          ) : (
            <MostLikedPosts timeRange={timeRange} options={topicOptions} />
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
          </div>
        </Sidebar>
      </div>
    </div>
  );
}
