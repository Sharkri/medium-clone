import { useEffect, useState } from "react";
import BlogMarkdown from "./BlogMarkdown";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    function onBeforeClose(e: BeforeUnloadEvent) {
      // if nothing was typed, close with no confirmation
      if (!title && !text) return;

      // confirm to close with unsaved changes
      e.preventDefault();
    }

    window.addEventListener("beforeunload", onBeforeClose);

    return () => window.removeEventListener("beforeunload", onBeforeClose);
  }, [text, title]);

  return (
    <div className="flex justify-center grow">
      <div className="flex flex-col max-w-[740px] gap-3 p-5">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="font-title text-[42px] leading-[52.5px] border-none outline-none"
        />
        <textarea
          className="font-content-serif text-[21px] leading-[33.18px] border-none outline-none h-full resize-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Tell your story..."
          autoFocus
        ></textarea>

        <div className="prose font-content-serif">
          <BlogMarkdown text={text} />
        </div>
      </div>
    </div>
  );
}
