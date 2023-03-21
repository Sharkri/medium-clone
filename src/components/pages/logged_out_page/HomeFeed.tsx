import { Link } from "react-router-dom";
import Posts from "../../helper-components/Posts";
import Sidebar from "../../main/Sidebar";

function HomeFeed({ headerTop }: { headerTop: string }) {
  const DEFAULT_TOPICS = [
    "Programming",
    "Data Science",
    "Technology",
    "Writing",
  ];

  return (
    <div className="max-w-[1192px] mx-auto">
      <div className="flex gap-12 mx-12">
        <section className="grow pt-12">
          <Posts />
        </section>

        <Sidebar headerTop={headerTop}>
          <div className="pt-12">
            <div className="pb-6 border-b border-b-neutral-200">
              <h2 className="font-sohne-semibold mb-4">
                Discover more of what matters to you
              </h2>

              <div className="text-[15px] text-grey flex flex-wrap">
                {DEFAULT_TOPICS.map((topicName) => (
                  <Link
                    to={`/tag/${topicName}`}
                    key={topicName}
                    className="text-[13px] border border-neutral-200 mb-3 mr-3 rounded-sm py-[6px] px-4"
                  >
                    {topicName}
                  </Link>
                ))}
              </div>
            </div>

            <footer className="py-6 flex flex-wrap text-grey text-sm [&>button]:mr-6 [&>button]:mb-2">
              <button>Help</button>
              <button>Status</button>
              <button>Writers</button>
              <button>Blog</button>
              <button>Careers</button>
              <button>Privacy</button>
              <button>Terms</button>
              <button>About</button>
              <button>Text to speech</button>
            </footer>
          </div>
        </Sidebar>
      </div>
    </div>
  );
}

export default HomeFeed;
