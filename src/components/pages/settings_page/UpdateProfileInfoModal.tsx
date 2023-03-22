import { FormEvent, useContext, useState } from "react";
import { getImageUrl, updateUser } from "../../../firebase/firebase-app";
import UserData from "../../../interfaces/UserDataInterface";
import LoadingButton from "../../helper-components/LoadingButton";
import ProfilePicture from "../../helper-components/ProfilePicture";
import useImagePreview from "../../hooks/useImagePreview";
import ModalContent from "../../modal/ModalContent";
import ModalContext from "../../modal/ModalContext";

export default function UpdateProfileInfoModal({ user }: { user: UserData }) {
  const { setModalOpen } = useContext(ModalContext);

  const [newPhoto, setNewPhoto] = useState<File | string | null>(user.photoURL);
  const previewImage = useImagePreview(newPhoto);

  const unsupportedFile =
    newPhoto instanceof File && !newPhoto.type.match("image.*");

  const [newName, setNewName] = useState(user.displayName);
  const [nameTooLong, nameEmpty] = [newName.length > 50, newName.length === 0];

  const [newBio, setNewBio] = useState(user.bio);
  const bioTooLong = newBio.length > 160;

  const invalidInputs: boolean =
    nameTooLong || nameEmpty || bioTooLong || unsupportedFile;

  const nothingChanged: boolean =
    user.bio === newBio &&
    user.displayName === newName &&
    newPhoto === user.photoURL;

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // check if valid inputs, if anything has changed, or if is loading
    if (invalidInputs || nothingChanged || loading) return;

    setLoading(true);

    const newUserInfo: {
      bio?: string;
      displayName?: string;
      photoURL?: string | null;
    } = {};

    if (user.bio !== newBio) newUserInfo.bio = newBio;
    if (user.displayName !== newName) newUserInfo.displayName = newName;
    if (user.photoURL !== newPhoto) {
      if (!newPhoto) {
        newUserInfo.photoURL = null;
      } else if (newPhoto instanceof File) {
        // upload image onto firebase cloud storage
        const imageUrl = await getImageUrl(
          newPhoto,
          `users/${user.uid}/photoURL`
        );

        newUserInfo.photoURL = imageUrl;
      }
    }

    await updateUser(user.uid, newUserInfo);

    setLoading(false);
    setModalOpen(false);
  }

  return (
    <ModalContent className="pt-8 px-10 pb-10 max-w-[552px] w-full">
      <form action="" onSubmit={handleSubmit}>
        <h1 className="mb-10 text-lighterblack font-sohne-bold text-[22px]">
          Profile information
        </h1>
        <div className="flex flex-col gap-8">
          {/* UPDATE PHOTO URL */}
          <div>
            <input
              type="file"
              accept="image/*"
              id="photo-file"
              className="hidden"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];

                setNewPhoto(selectedFile || null);
              }}
            />
            <p className="text-grey text-sm mb-[10px]">Photo</p>
            <div className="flex gap-6">
              <label htmlFor="photo-file" className="cursor-pointer">
                <ProfilePicture
                  className="min-w-[80px] max-w-[80px] h-[80px] max-h-[80px] object-cover"
                  src={previewImage}
                />
              </label>
              <div>
                <div className="mb-4 flex items-center gap-4">
                  <label
                    htmlFor="photo-file"
                    className="text-sm text-green cursor-pointer"
                  >
                    Update
                  </label>
                  <button
                    type="button"
                    className="text-sm text-red-700"
                    onClick={() => setNewPhoto(null)}
                  >
                    Remove
                  </button>
                </div>
                <p className="text-sm text-grey">
                  Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels
                  per side.
                </p>
              </div>
            </div>
            {unsupportedFile && (
              <p className="text-red-700 text-sm mt-2">
                We don't accept this type of file
              </p>
            )}
          </div>
          {/* UPDATE DISPLAY NAME */}
          <div>
            <div className="flex flex-col text-sm">
              <label htmlFor="change-display-name" className="text-grey mb-2">
                Name*
              </label>
              <input
                type="text"
                id="change-display-name"
                className={`py-1 outline-none border-b ${
                  nameTooLong || nameEmpty
                    ? "border-red-700"
                    : "border-neutral-300 focus:border-grey"
                }`}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
              <div className="flex justify-between text-[13px] mt-1">
                <span
                  className={
                    nameTooLong || nameEmpty ? "text-red-700" : "text-grey"
                  }
                >
                  {nameTooLong
                    ? "Name may only contain a maximum of 50 characters."
                    : nameEmpty
                    ? "Please enter your name."
                    : "Appears on your Profile page, as your byline, and in your responses."}
                </span>
                <span className="text-grey">
                  <span
                    className={
                      nameTooLong ? "text-red-700" : "text-lighterblack"
                    }
                  >
                    {newName.length}
                  </span>
                  /50
                </span>
              </div>
            </div>
          </div>
          {/* UPDATE BIO */}
          <div>
            <div className="flex flex-col text-sm">
              <label htmlFor="change-display-name" className="text-grey mb-2">
                Bio
              </label>
              <input
                type="text"
                id="change-display-name"
                className={`py-1 outline-none border-b ${
                  bioTooLong
                    ? "border-red-700"
                    : "border-neutral-300 focus:border-grey"
                }`}
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
              />
              <div className="flex justify-between text-[13px] mt-1">
                <span className={bioTooLong ? "text-red-700" : "text-grey"}>
                  {bioTooLong
                    ? "Bio may only contain a maximum of 160 characters."
                    : "Appears on your Profile and next to your stories."}
                </span>
                <span className="text-grey">
                  <span
                    className={
                      bioTooLong ? "text-red-700" : "text-lighterblack"
                    }
                  >
                    {newBio.length}
                  </span>
                  /160
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex gap-4 justify-end text-sm">
          <button
            className="text-[#0f730c] border-[#0f730c] border rounded-full pt-2 px-7 pb-[10px]"
            onClick={() => setModalOpen(false)}
            type="button"
          >
            Cancel
          </button>
          <LoadingButton
            type="submit"
            className="disabled:opacity-30 bg-green pt-2 px-7 pb-[10px] text-white rounded-full"
            disabled={invalidInputs || nothingChanged || loading}
            loading={loading}
          >
            Save
          </LoadingButton>
        </div>
      </form>
    </ModalContent>
  );
}
