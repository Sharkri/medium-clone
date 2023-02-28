import { useEffect, useState } from "react";
import BlogMarkdown from "./BlogMarkdown";
import TextareaAutosize from "react-textarea-autosize";
import PublishPost from "./PublishPost";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    function onBeforeClose(e: BeforeUnloadEvent) {
      // if nothing was typed, close with no confirmation
      if (!title && !text) return;

      // confirm to close with unsaved changes
      e.preventDefault();
      e.returnValue =
        "Do you want to leave the site? Changes you made may not be saved.";
    }

    window.addEventListener("beforeunload", onBeforeClose);

    return () => window.removeEventListener("beforeunload", onBeforeClose);
  }, [text, title]);

  if (isPublishing)
    return (
      <PublishPost
        title={title}
        blogText={text}
        onGoBack={() => setIsPublishing(false)}
        onTitleChange={setTitle}
      />
    );

  return (
    <div className="flex flex-col items-center grow">
      <div className="flex gap-3">
        <button className="bg-red-500" onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button className="bg-red-500" onClick={() => setIsEditing(false)}>
          Preview
        </button>
        <button onClick={() => setIsPublishing(true)}>Publish</button>
      </div>

      {isEditing ? (
        <div className="grow flex flex-col w-full max-w-[740px] gap-3 p-5">
          <TextareaAutosize
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value.replace(/\n/g, ""))}
            className="font-title text-[42px] leading-[52.5px] outline-none resize-none"
          />
          <TextareaAutosize
            className="font-content-serif text-[21px] leading-[33.18px] outline-none resize-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Tell your story..."
            autoFocus
          />
        </div>
      ) : (
        <div className="prose prose-lg prose-img:w-full prose-img:m-auto prose-img:max-w-[600px] prose-pre:bg-[#282c34] prose-headings:font-sans font-source-serif-pro">
          <h1 className="font-bold text-3xl">{title}</h1>
          <BlogMarkdown text={text} />
        </div>
      )}
    </div>
  );
}