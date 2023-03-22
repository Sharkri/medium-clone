import { ChangeEvent, MouseEventHandler, useContext, useState } from "react";

import { serverTimestamp } from "firebase/firestore";
import {
  addPost,
  getImageUrl,
  sendNotificationToFollowers,
} from "../../../firebase/firebase-app";

import UserContext from "../../../UserContext";

import calculateReadingTime from "../../../helper-functions/calculateReadingTime";
import getRandomId from "../../../helper-functions/getRandomId";
import useImagePreview from "../../hooks/useImagePreview";
import { useNavigate } from "react-router-dom";
import getLinkForPost from "../../../helper-functions/getLinkForPost";

export default function PublishPost({
  title,
  description,
  blogContents,
  onGoBack,
}: {
  title: string;
  description: string;
  blogContents: string;
  onGoBack: MouseEventHandler;
}) {
  const { user } = useContext(UserContext);
  const [file, setFile] = useState<File | null>(null);
  const [topicValue, setTopicValue] = useState("");
  const [topicsArray, setTopicsArray] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const tooManyTopics = topicsArray.length > 5;

  const navigate = useNavigate();
  const previewImage = useImagePreview(file);
  const allowedChars = /^$|^[A-Za-z0-9 _-]+$/;

  async function handlePublishPost() {
    if (!user?.uid) throw new Error("User does not exist.");
    if (loading) return;

    setLoading(true);

    const postId = getRandomId(12);
    const imageUrl = file
      ? await getImageUrl(file, `posts/${postId}/thumbnail`)
      : "";

    await addPost({
      title,
      description,
      blogContents,
      topics: topicsArray,
      lowercaseTopics: topicsArray.map((t) => t.toLowerCase()),
      authorUid: user.uid,
      timestamp: serverTimestamp(),
      readingTimeInMinutes: calculateReadingTime(
        title,
        description,
        blogContents
      ),
      thumbnail: imageUrl || "",
      likes: {},
      likeCount: 0,
      id: postId,
    });

    sendNotificationToFollowers(user.followers, {
      message: "published a new post",
      uid: user.uid,
      timestamp: new Date(),
      id: getRandomId(12),
    });

    setLoading(false);

    // redirect to the new post that was created
    navigate(getLinkForPost(user.username, title, postId));
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.target;

    // only use first file/image
    if (!files?.length || !files[0].type.match("image.*")) {
      setFile(null);
    } else {
      setFile(files[0]);
    }
  }

  const addTopic = (topic: string) => {
    topic = topic.trim();
    if (tooManyTopics || !topic) return;
    // no duplicates
    const isDuplicate = topicsArray.some(
      (t) => t.toLowerCase() === topic.toLowerCase()
    );
    if (isDuplicate) return;

    setTopicsArray([...topicsArray, topic]);
    setTopicValue("");
  };

  const removeTopic = (topic: string) => {
    setTopicsArray((prevState) =>
      prevState.filter((filteredTopic) => filteredTopic !== topic)
    );
  };

  function onTopicChange(value: string) {
    // if last key pressed is double space or comma
    if (value.slice(-2) === "  " || value.slice(-1) === ",") {
      // remove the trailing comma before adding topic
      addTopic(value.replace(",", ""));
    } else if (allowedChars.test(value) && value.length <= 25) {
      setTopicValue(value);
    }
  }

  return (
    <div className="h-[calc(100vh-57px)] grid place-items-center font-content-sans">
      <div className="w-full max-w-3xl flex flex-wrap">
        <div className="grow p-8 flex flex-col gap-2">
          <b className="text-[19px] text-center text-black/75 font-content-sans-bold">
            Story Preview
          </b>
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="w-[112px] h-[112px] bg-zinc-50 flex items-center justify-center">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-center text-black/50 text-[13.3px] px-2">
                  Thumbnail (112x112px)
                </span>
              )}
            </div>

            <label htmlFor="dropzone-file" className="w-full text-center">
              <div className="flex justify-center bg-gray-100 text-gray-400 py-2 rounded-md cursor-pointer">
                <i className="fa-solid fa-cloud-arrow-up text-lg"></i>
              </div>
              <input
                id="dropzone-file"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>

        <div className="p-8 flex-[50%]">
          <p className="text-[19px] text-black/75 line-clamp-1 break-all mb-4">
            Publishing to:{" "}
            <b className="font-content-sans-bold">{user?.displayName}</b>
          </p>
          <form
            className="flex gap-2 flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              addTopic(topicValue);
            }}
          >
            <label htmlFor="topic">
              Add topics (up to 5) so readers know what your story is about
            </label>

            <div className="flex gap-5 flex-wrap">
              {topicsArray.map((topic) => (
                <div
                  className="pl-2 py-1 bg-zinc-50 flex items-center gap-2 rounded-md"
                  key={topic}
                >
                  <span className="text-[15px]">{topic}</span>
                  <button
                    type="button"
                    className="text-lg text-black/50 pr-2 hover:text-black transition-colors duration-300"
                    onClick={() => removeTopic(topic)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <input
              id="topic"
              placeholder={tooManyTopics ? undefined : "topic 1, topic 2..."}
              className="border border-black/10 outline-none px-4 py-2 mb-4 bg-zinc-50"
              onChange={(e) => onTopicChange(e.target.value)}
              value={topicValue}
              disabled={tooManyTopics}
              title={
                tooManyTopics ? "You can only add up to 5 topics." : undefined
              }
            />
          </form>
          <div className="flex">
            <button
              type="button"
              disabled={loading}
              className="bg-green disabled:opacity-30 hover:bg-dark-green rounded-full py-[5.5px] px-4 text-white transition-colors duration-100"
              onClick={handlePublishPost}
            >
              Publish now
            </button>

            <button
              type="button"
              onClick={onGoBack}
              className="ml-5 flex items-center gap-2 text-black/[.54] transition-colors duration-100 hover:text-black/[0.68]"
            >
              <i className="fa-solid fa-arrow-left"></i> Go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
