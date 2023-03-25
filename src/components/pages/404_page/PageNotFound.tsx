import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  const notFound = require("../../../assets/images/404.png");

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Not Found - Medium";

    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <div className="mt-16 flex justify-center items-center max-md:flex-col">
      <div className="px-5 min-w-[450px] max-w-[450px] max-lg:min-w-[300px] max-lg:max-w-[300px]">
        <img src={notFound} alt="" />
      </div>
      <div className="px-5 max-w-[460px] max-md:text-center max-md:mt-4">
        <p className="uppercase font-content-sans text-lg">page not found</p>
        <h1 className="text-black/30 text-9xl max-lg:text-8xl font-sohne-semibold">
          404
        </h1>
        <h2 className="text-[66px] leading-[66px] max-lg:text-[34px] max-lg:leading-9 font-serif">
          Out of nothing, something.
        </h2>
        <p className="my-3 text-xl font-content-sans">
          i couldn't find what you were looking for. if you do need directions,
          maybe ask the{" "}
          <a
            href="https://github.com/Sharkri"
            target="_blank"
            className="underline"
            rel="noreferrer"
          >
            developer?
          </a>
        </p>

        <Link
          to="/"
          className="underline text-xl font-content-sans text-black/80"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
