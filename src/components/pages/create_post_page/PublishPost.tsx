import { MouseEventHandler, useContext, useState } from "react";

import { serverTimestamp } from "firebase/firestore";
import { addPost, getImageUrl } from "../../../firebase/firebase-app";

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
  const [file, setFile] = useState<File>();
  const navigate = useNavigate();
  const previewImage = useImagePreview(file);

  async function handlePublishPost() {
    if (!user?.uid) throw new Error("User does not exist.");

    const postId = getRandomId(12);
    const imageUrl = file
      ? await getImageUrl(file, `posts/${postId}/thumbnail`)
      : "";

    await addPost({
      title,
      description,
      blogContents,
      authorUid: user.uid,
      timestamp: serverTimestamp(),
      readingTimeInMinutes: calculateReadingTime(
        title,
        description,
        blogContents
      ),
      thumbnail: imageUrl || "",
      likes: {},
      id: postId,
    });

    // redirect to the new post that was created
    navigate(getLinkForPost(user.username, title, postId));
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
                onChange={(e) => {
                  if (
                    !e.target.files?.length ||
                    !e.target.files[0].type.match("image.*")
                  ) {
                    setFile(undefined);
                  } else {
                    setFile(e.target.files[0]);
                  }
                }}
              />
            </label>
          </div>
        </div>

        <div className="grow-[0.7] p-8">
          <p className="text-[19px] text-black/75 line-clamp-1 break-all mb-5">
            Publishing to:{" "}
            <b className="font-content-sans-bold">{user?.displayName}</b>
          </p>

          <div className="flex">
            <button
              type="button"
              className="bg-green hover:bg-dark-green rounded-full py-[5.5px] px-4 text-white transition-colors duration-100"
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
