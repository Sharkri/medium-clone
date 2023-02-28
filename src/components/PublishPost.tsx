import { MouseEventHandler, useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";

export default function PublishPost({
  title,
  blogText,
  onGoBack,
  onTitleChange,
}: {
  title: string;
  blogText: string;
  onGoBack: MouseEventHandler;
  onTitleChange: Function;
}) {
  const { user } = useContext(UserContext);
  const [file, setFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState("");

  if (blogText) console.log("eyo");

  useEffect(() => {
    if (!file) return;
    // create the preview
    const objectUrl = URL.createObjectURL(file);
    setImageUrl(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <div className="grow grid place-items-center font-content-sans">
      <div className="w-full max-w-[1040px] flex flex-wrap">
        <div className="grow p-10 flex flex-col gap-2">
          <b className="text-[19px] text-center text-black/75 font-content-sans-bold">
            Story Preview
          </b>
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="w-[112px] h-[112px] bg-zinc-50 flex items-center justify-center">
              {imageUrl ? (
                <img src={imageUrl} alt={title} className="w-full h-full" />
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
            value={title}
            placeholder="Write a preview title"
            className="mt-5 text-black/80 tracking-[-.29px] font-content-sans-bold text-[21px] border-b-[1px] placeholder-[#b3b3b1] border-black/[.15] outline-none"
            onChange={(e) => onTitleChange(e.target.value)}
          />
        </div>

        <div className="grow p-10">
          <p className="text-[19px] text-black/75 line-clamp-1 break-all mb-5">
            Publishing to:{" "}
            <b className="font-content-sans-bold">{user!.displayName}</b>
          </p>

          <div className="flex">
            <button
              type="button"
              className="bg-[#1a8917] border-[1px] border-[#1a8917] rounded-full py-[5.5px] px-4 text-white transition-colors duration-100 hover:bg-[#0f730c] hover:border-[#0f730c]"
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
