import { useState } from "react";
import UserData from "../../../interfaces/UserDataInterface";
import ProfilePicture from "../../helper-components/ProfilePicture";
import useImagePreview from "../../hooks/useImagePreview";
import ModalContent from "../../modal/ModalContent";

export default function UpdateProfileInfoModal({ user }: { user: UserData }) {
  const [file, setFile] = useState<File | string | undefined>(user.photoURL);
  const previewImage = useImagePreview(file);

  return (
    <ModalContent className="pt-8 px-10 pb-10 max-w-[552px] w-full">
      <h1 className="mb-10 text-lighterblack font-sohne-bold text-[22px]">
        Profile information
      </h1>

      <div className="flex flex-col">
        <input
          type="file"
          accept="image/*"
          id="photo-file"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0])}
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
                className="text-sm text-red-700"
                onClick={() => setFile(undefined)}
              >
                Remove
              </button>
            </div>

            <p className="text-sm text-grey">
              Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per
              side.
            </p>
          </div>
        </div>
      </div>
    </ModalContent>
  );
}
