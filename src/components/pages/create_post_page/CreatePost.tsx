import { useEffect, useState } from "react";

import TextareaAutosize from "react-textarea-autosize";

import BlogMarkdownWithTitleAndDesc from "../../helper-components/BlogMarkdownWithTitleAndDesc";
import PublishPost from "./PublishPost";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [blogContents, setBlogContents] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    function onBeforeClose(e: BeforeUnloadEvent) {
      // if nothing was typed, close with no confirmation
      if (!title && !blogContents) return;

      // confirm to close with unsaved changes
      e.preventDefault();
      e.returnValue =
        "Do you want to leave the site? Changes you made may not be saved.";
    }

    window.addEventListener("beforeunload", onBeforeClose);

    return () => window.removeEventListener("beforeunload", onBeforeClose);
  }, [blogContents, title]);

  if (isPublishing)
    return (
      <PublishPost
        title={title}
        description={description}
        blogContents={blogContents}
        onGoBack={() => setIsPublishing(false)}
      />
    );

  return (
    <div className="flex flex-col items-center mb-12">
      <div className="flex gap-3">
        <button className="bg-red-500" onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button className="bg-red-500" onClick={() => setIsEditing(false)}>
          Preview
        </button>
        <button onClick={() => setIsPublishing(true)}>Publish</button>
      </div>

      <div
        className={`grow flex flex-col w-full max-w-[740px] gap-3 ${
          !isEditing && "hidden"
        }`}
      >
        <TextareaAutosize
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value.replace(/\n/g, ""))}
          className="font-title text-[42px] leading-[52.5px] outline-none resize-none"
        />
        <TextareaAutosize
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value.replace(/\n/g, ""))}
          className="font-content-serif text-[28px] leading-[42.4px] text-grey outline-none resize-none"
        />
        <TextareaAutosize
          className="font-content-serif text-[21px] leading-[33.18px] outline-none resize-none"
          value={blogContents}
          onChange={(e) => setBlogContents(e.target.value)}
          placeholder="Tell your story..."
          autoFocus
        />
      </div>

      {!isEditing && (
        <div className="max-w-[680px]">
          <BlogMarkdownWithTitleAndDesc
            title={title}
            description={description}
            blogContents={blogContents}
          />
        </div>
      )}
    </div>
  );
}
