import { serverTimestamp, updateDoc } from "firebase/firestore";
import { MouseEventHandler, useContext, useEffect, useState } from "react";
import { addPost, getImageUrl } from "../firebase/firebase-app";
import getRandomId from "../helper-functions/getRandomId";
import UserContext from "../UserContext";

export default function PublishPost({
  title,
  blogContents,
  onGoBack,
}: {
  title: string;
  blogContents: string;
  onGoBack: MouseEventHandler;
}) {
  const { user } = useContext(UserContext);
  const [file, setFile] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!file) return;
    // create the preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewImage(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  async function handlePublishPost() {
    if (!user?.uid) throw new Error("User does not exist.");

    const postRef = await addPost({
      title,
      description,
      blogContents,
      authorUid: user.uid,
      timestamp: serverTimestamp(),
      thumbnail: "",
      likes: 0,
      id: getRandomId(12),
    });

    if (file && postRef) {
      const imageUrl = await getImageUrl(file, `posts/${postRef.id}/thumbnail`);
      // update with new thumbnail
      updateDoc(postRef, { thumbnail: imageUrl });
    }
  }

  return (
    <div className="grow grid place-items-center font-content-sans">
      <div className="w-full max-w-[1040px] flex flex-wrap">
        <div className="grow p-10 flex flex-col gap-2">
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

          <input
            type="text"
            value={description}
            placeholder="Write a preview description"
            className="mt-5 text-black/80 tracking-[-.29px] font-content-sans-bold text-[21px] border-b-[1px] placeholder-[#b3b3b1] border-black/[.15] outline-none"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="grow p-10">
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
